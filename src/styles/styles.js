import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../constants/theme';

export const styles = StyleSheet.create({
    body: {
        backgroundColor: COLORS.background,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        height: '100%',
        overflow: 'scroll',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.primary,
    },
    tasksContainer: {
        flex: 2
    },
    taskListContainer: {
        backgroundColor: COLORS.primary,
    },
    taskContainer: {
        padding: 10,
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
    },
    text: {
        color: COLORS.text,
    },
    textDisabled: {
        color: COLORS.text_disabled,
    },
    title: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    loginTitle: {
        color: COLORS.text,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        color: COLORS.text_secondary,
        fontSize: 18,
        marginBottom: 10,
        marginTop: 3,
        marginLeft: 5
    },
    checkboxContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        height: '100%',
        flexDirection: "row",
        width: '100%',
        marginTop: 5,
        marginHorizontal: 5,
    },
    checkbox: {
        marginLeft: 5,
        marginRight: 10,
    },
    checkboxDisabled: {
        marginLeft: 5,
        marginRight: 10,
        opacity: '60%'
    },
    check: {
        color: COLORS.text_checked
    },
    uncheck: {
        color: COLORS.secondary,
    },
    row: {
        flexDirection: 'row',
    },
    animatedView: {
        width: '100%',
        overflow: 'hidden',
    },
    input: {
        backgroundColor: 'white',
        marginLeft: 10,
        width: '100%',
        padding: 10,
        borderRadius: 10,
    },
    inputContainer: {
        padding: 10,
        alignItems: 'center'
    },
    loginButton: {
        backgroundColor: COLORS.button_border,
        padding: 20,
        textAlign: 'center',
        borderRadius: 10,
    },
    loginText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    loginImage: {
        width: '80%',
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    favoriteButton: {

    }
});