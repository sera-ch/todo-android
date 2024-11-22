import {
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Pressable,
    SafeAreaView
} from 'react-native';
import {useEffect, useState} from "react";
import {useNavigation} from "expo-router";
import {styles} from "../styles/styles";
import axios from "axios";
import CheckBox from './CheckBox';
import Collapsible from "react-native-collapsible";
import FavoriteButton from "./FavoriteButton";

const ListChecklists = () => {

    let [data, setData] = useState([]);
    let [dataReceived, setDataReceived] = useState(false);
    let [inputDisabled, setInputDisabled] = useState(false);
    let [loading, setLoading] = useState(true);
    let navigation = useNavigation();

    useEffect(() => {
        const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL + "checklists";
        setLoading(true);
        axios.get(apiUrl)
            .then((response) => {
                setData(response.data.checklists);
                setDataReceived(true);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if(loading) {
        return "Loading...";
    }

    if (!dataReceived) {
        return "No data";
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={data} renderItem={
                (checklist) => (
                    <Checklist checklist={checklist.item} favorite={checklist.item.is_favorite} inputDisabled={inputDisabled} sendInputDisabled={(value) => setInputDisabled(value)} completedPercent={checklist.item.completed_percent} />
                )}
                keyExtractor={(checklist) => "checklist-" + checklist.id} />
        </SafeAreaView>
    )
}

export default ListChecklists;

const Checklist = (props) => {
    let [checklist, setChecklist] = useState(props.checklist);
    let [inputDisabled, setInputDisabled] = useState(props.inputDisabled);
    let [collapsed, setCollapsed] = useState(true);
    let [favorite, setFavorite] = useState(props.favorite);

    const updateChecklist = (task) => {
        let index = checklist.tasks.findIndex(t => t.id === task.id);
        let newChecklist = checklist;
        newChecklist.tasks[index] = task;
        setChecklist(newChecklist);
    }

    const updateFavorite = async(value) => {
        setInputDisabled(true);
        const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL + "checklists/" + checklist.id + "/favorite";
        axios.put(apiUrl, {
            is_favorite: value
        },
            {
                headers: { 'Content-Type' : 'application/json' }
            })
            .then((response) => {
                setFavorite(response.data.is_favorite);
            })
            .catch((error) => {
                console.error(error);
                setInputDisabled(false);
            });
    }

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <FavoriteButton styles={[styles.favoriteButton]} disabled={inputDisabled} favorite={checklist.is_favorite} updateFavorite={(favorite) => updateFavorite(favorite)} />
                    <Pressable onPress={() => setCollapsed(!collapsed)}>
                        <Text style={styles.title}>{checklist.name}</Text>
                    </Pressable>
                    <Text style={styles.subtitle}>{checklist.tasks.length}</Text>
                </View>
                <TaskList collapsed={collapsed} checklist={checklist} inputDisabled={inputDisabled} sendInputDisabled={(value) => props.sendInputDisabled(value)} sendTask={(task) => updateChecklist(task)} />
            </View>
        </SafeAreaView>
    )
}

const TaskList = (props) => {
    const [inputDisabled, setInputDisabled] = useState(props.inputDisabled);
    const [checklist, setChecklist] = useState(props.checklist);

    return (
        <SafeAreaView>
            <Collapsible collapsed={props.collapsed} duration={500} >
                <FlatList
                    data={checklist.tasks}
                    renderItem={(task) => (
                        <Task task={task.item} inputDisabled={inputDisabled} sendInputDisabled={(value) => props.sendInputDisabled(value)} sendTask={(task) => props.sendTask(task)} />
                    )}
                    keyExtractor={(task) => "task-" + task.id} />
            </Collapsible>
        </SafeAreaView>
    )
}

const Task = (props) => {
    let [task, setTask] = useState(props.task);
    let [inputDisabled, setInputDisabled] = useState(props.inputDisabled);

    const updateTaskChecked = async(newValue) => {
        let t = task;
        t.checked = newValue;
        props.sendInputDisabled(true);
        setInputDisabled(true);
        const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL + "tasks/" + task.id + "/update-status";
        const request = {
            completed: newValue,
        };
        await axios.put(apiUrl, JSON.stringify(request),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'token': window.sessionStorage.getItem("token")
                }
            })
            .then((response) => {
                setTask(t);
                props.sendInputDisabled(false);
                props.sendTask(task);
                setInputDisabled(false);
            })
            .catch((error) => {
                console.error(error);
                props.sendInputDisabled(false);
                setInputDisabled(false);
            });
    }
    return(
        <View style={styles.taskContainer}>
            <CheckBox isChecked={task.checked} disabled={inputDisabled} title={task.name} updateChecked={updateTaskChecked} />
        </View>
    )
}