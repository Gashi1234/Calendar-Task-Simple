import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { auth } from '../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';

import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // ✅ Step 1: Try biometric login on mount if user was logged in before
    useEffect(() => {
        const checkBiometricAuth = async () => {
            const wasLoggedIn = await AsyncStorage.getItem('wasLoggedIn');
            if (wasLoggedIn === 'true') {
                handleBiometricLogin();
            }
        };
        checkBiometricAuth();
    }, []);

    // Biometric Login Function
    const handleBiometricLogin = async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();

        if (!compatible || !enrolled) {
            Alert.alert(
                'Biometric Auth Unavailable',
                'Biometric authentication is not set up on this device.'
            );
            return;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate with Face ID / Fingerprint',
            fallbackLabel: 'Use Passcode',
            disableDeviceFallback: false,
        });

        if (result.success) {
            const currentUser = auth.currentUser;

            if (currentUser) {
                navigation.replace('LoggedIn');
            } else {
                Alert.alert('Session Expired', 'Please log in again.');
                await AsyncStorage.removeItem('wasLoggedIn'); // Clear invalid session
            }
        } else {
            Alert.alert('Authentication Failed', 'Biometric authentication failed.');
        }
    };


    // Email + Password on Sign Up - Basic Validation
    // const handleSignUp = async () => {
    //     if (!email.includes('@') || !email.includes('.')) {
    //         Alert.alert("Invalid Email", "Please enter a valid email address.\n\n An example of a valid email address: test@test.com");
    //         return;
    //     }

    //     if (password.length < 6) {
    //         Alert.alert("Weak Password", "Password must be at least 6 characters long.");
    //         return;
    //     }

    //     try {
    //         await createUserWithEmailAndPassword(auth, email, password);
    //         await AsyncStorage.setItem('wasLoggedIn', 'true'); // To Remember the user
    //         navigation.replace('LoggedIn');
    //     } catch (error) {
    //         Alert.alert("Sign Up Error! Please enter a valid email address.\n\n An example of a valid email address: test@test.com", error.message);
    //     }
    // };


    // Email + Password Validation on Sign Up - Regex Validation
    const handleSignUp = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!emailRegex.test(email)) {
            Alert.alert(
                "Invalid Email",
                "\nPlease enter a valid email address.\n\nAn example of a valid email address: test@test.com"
            );
            return;
        }
    
        if (password.length < 6) {
            Alert.alert("Weak Password", "Password must be at least 6 characters long.");
            return;
        }
    
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await AsyncStorage.setItem('wasLoggedIn', 'true'); // To Remember the user
            navigation.replace('LoggedIn');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert(
                    "Email Already Registered",
                    "\nThis email address is already in use.\n\n Please try logging in or use a different email."
                );
            } else {
                Alert.alert("Sign Up Error", error.message);
            }
        }
    };    
    

    // Email + Password Login Validation Basic Validation

    // const handleLogin = async () => {
    //     if (!email.includes('@') || !email.includes('.')) {
    //         Alert.alert("Invalid Email!", "\nPlease enter a valid email address.\n\n An example of a valid email address: test@test.com");
    //         return;
    //     }

    //     if (password.length < 6) {
    //         Alert.alert("Weak Password!", "\nPassword must be at least 6 characters long.");
    //         return;
    //     }

    //     try {
    //         await signInWithEmailAndPassword(auth, email, password);
    //         await AsyncStorage.setItem('wasLoggedIn', 'true'); // Remember user
    //         navigation.replace('LoggedIn');
    //     } catch (error) {
    //         if (
    //             error.code === 'auth/user-not-found' ||
    //             error.code === 'auth/wrong-password' ||
    //             error.code === 'auth/invalid-credential'
    //         ) {
    //             Alert.alert(
    //                 'Login Failed',
    //                 '\nWrong email or password, or you are not registered at all.\n\nIf not registered, please sign up!'
    //             );
    //         } else {
    //             Alert.alert('Login Error', error.message);
    //         }
    //     }
    // };

    // Email + Password Login Validation Regex Validation
    const handleLogin = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            Alert.alert(
                "Invalid Email",
                "\nPlease enter a valid email address.\n\nAn example of a valid email address: test@test.com"
            );
            return;
        }

        if (password.length < 6) {
            Alert.alert("Weak Password!", "\nPassword must be at least 6 characters long.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            await AsyncStorage.setItem('wasLoggedIn', 'true'); // Remember user
            navigation.replace('LoggedIn');
        } catch (error) {
            if (
                error.code === 'auth/user-not-found' ||
                error.code === 'auth/wrong-password' ||
                error.code === 'auth/invalid-credential'
            ) {
                Alert.alert(
                    'Login Failed',
                    '\nWrong email or password, or you are not registered at all.\n\nIf not registered, please sign up!'
                );
            } else {
                Alert.alert('Login Error', error.message);
            }
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 5 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <FontAwesome5 name="calendar-alt" size={100} color="#0f2f7c" style={styles.appIcon} />
                    <Text style={styles.title}>Login or Register</Text>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                    />
                    <Button title="Log In" onPress={handleLogin} />
                    <View style={{ height: 10 }} />
                    <Button title="Sign Up" onPress={handleSignUp} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20
    },
    title: {
        fontSize: 20, marginBottom: 5, marginTop: 5,
    },
    appIcon: {
        marginBottom: 15,
    },    
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
});
