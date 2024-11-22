import { Pressable, Text, View } from "react-native";
import React, {useState} from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {styles} from "../styles/styles";

const CheckBox = (props) => {
    const [checked, setChecked] = useState(props.isChecked);
    const [inputDisabled, setInputDisabled] = useState(props.disabled);

    const onPress = async() => {
        if(inputDisabled) {
            return;
        }
        let newValue = !checked;
        setChecked(newValue);
        setInputDisabled(true);
        await props.updateChecked(newValue);
        setInputDisabled(false);
    }

    return (
        <View style={styles.checkboxContainer}>
            <Pressable onPress={onPress} style={inputDisabled ? styles.checkboxDisabled : styles.checkbox}>
                <MaterialIcons
                    name={checked ? "check-box" : "check-box-outline-blank"} size={24} style={checked ? styles.check : styles.uncheck} />
            </Pressable>
            <Text style={inputDisabled ? styles.textDisabled : styles.text}>{props.title}</Text>
        </View>
    );
};

export default CheckBox;