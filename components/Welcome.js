import { StyleSheet, TextInput, View, TouchableOpacity, Text, KeyboardAvoidingView, Platform, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./config";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [signedIn, setSignedIn] = useState(false);
    const [passWrong, setPassWrong] = useState(false)
    console.log(passWrong);

    useEffect(() => setSignedIn(false), [])
    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => console.log("registered"), setEmail(), setPassword())
            .catch((error) => console.log(error.message))
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log('Logged in')
                setSignedIn(true)
                navigation.replace('Welcome')
            })
            .catch((error) => {
                console.log(error.message)
                error.message.includes('invalid-credential') ? setPassWrong(true) : setPassWrong(false)
                setSignedIn(false)
            })
    }
    console.log("Signed in? " + signedIn)
    return (

        <SafeAreaView style={styles.container}>
            <Image source={{ uri: "https://i.pinimg.com/originals/fb/72/64/fb726493efc4b24dd170064c7fb6c756.jpg" }}
                style={{ width: 300, height: 300 }} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.replace("Home")}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize: 18,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 5,
    },
    inputContainer: {
        width: '80%'
    },
    button: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#0782F9',
        borderRadius: 10,
        padding: 15

    },
    buttonContainer: {

        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40

    },
    buttonOutLine: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonText: {
        fontWeight: '700',
        color: 'white',
        fontSize: 16
    },
    buttonOutLineText: {
        fontWeight: '700',
        color: '#0782F9',
        fontSize: 16
    }

})