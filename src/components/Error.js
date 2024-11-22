import {styles} from "../styles/styles";
import {Pressable, SafeAreaView, Text, View} from "react-native";
import {useState} from "react";

const Error = (props) => {

    let [errorMessage, setErrorMessage] = useState(props.error || "Unknown error!");

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {errorMessage}
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default Error;