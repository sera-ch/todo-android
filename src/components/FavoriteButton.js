import { Pressable, Text, View } from "react-native";
import React, {useState} from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import {styles} from "../styles/styles";
import {COLORS} from "../constants/theme";

const FavoriteButton = (props) => {
    const [favorite, setFavorite] = useState(props.favorite);
    const [inputDisabled, setInputDisabled] = useState(props.disabled);

    const onPress = async() => {
        if(inputDisabled) {
            return;
        }
        let newValue = !favorite;
        setInputDisabled(true);
        await props.updateFavorite(newValue);
        setFavorite(newValue);
        setInputDisabled(false);
    }

    return (
        <View style={styles.favoriteButton}>
            <Pressable onPress={onPress} style={inputDisabled ? styles.checkboxDisabled : styles.checkbox}>
                <AntDesign name={favorite? "star" : "staro"} size={24} color={COLORS.favorite} />
            </Pressable>
        </View>
    );
};

export default FavoriteButton;