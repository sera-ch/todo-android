import React, {useEffect, useState} from 'react';
import {styles} from "../styles/styles";
import {TextInput, Text, View, SafeAreaView, Pressable, Button, Image} from "react-native";
import {COLORS} from "../constants/theme";
import images from "../assets/index";
import axios from "axios";
import {useNavigation} from "expo-router";

const Login = (props) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const navigate = props.navigate;

    const login = async() => {
        if (username == null || username === '' || password == null || password === '') {
            return;
        }
        setInputDisabled(true);
        const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL + "users/login";
        const request = {
            username: username,
            password: password,
        };
        await axios.post(apiUrl, JSON.stringify(request),
            {
                headers: { 'Content-Type' : 'application/json' }
            })
            .then((response) => {
                window.sessionStorage.setItem("token", response.data.token);
                navigate();
                setInputDisabled(false);
            })
            .catch((error) => {
                console.error(error);
                setInputDisabled(false);
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <View style={styles.container}>
                    <Text style={styles.loginTitle}>
                        Welcome back!
                    </Text>
                </View>
                <View>
                    <Image style={styles.loginImage} source={images.login}></Image>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholderTextColor={COLORS.text_disabled} placeholder={"Username"} value={username || ''} onChangeText={(text) => setUsername(text)} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholderTextColor={COLORS.text_disabled} placeholder={"Password"} secureTextEntry={hidePassword} value={password || ''} onChangeText={(text) => setPassword(text)} />
                </View>
                <View style={styles.container}>
                    <Pressable style={styles.loginButton} onPress={() => login()}>
                        <Text style={styles.loginText}>LOGIN</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default Login;