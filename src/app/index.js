import React, {useState} from "react";
import {Stack} from "expo-router";
import ListChecklists from "../components/ListChecklists";
import {SafeAreaView, Text} from "react-native";
import {styles} from '../styles/styles';
import Login from "../components/Login";
import Error from "../components/Error";

const Home = () => {

    let [displayPage, setDisplayPage] = useState(window.sessionStorage.getItem("token") == null ? "login" : "checklists");

    const getDisplayPage = () => {
        if (displayPage === "login") {
            return (<Login navigate={() => setDisplayPage("checklists")} />);
        }
        if (displayPage === "checklists") {
            return (<ListChecklists />);
        }
        return (<Error />);
    }

    return (
        <SafeAreaView style={styles.body}>
            <Stack.Screen options={{ headerShown: false }} />
            {
                getDisplayPage()
            }
        </SafeAreaView>
    )
}

export default Home;