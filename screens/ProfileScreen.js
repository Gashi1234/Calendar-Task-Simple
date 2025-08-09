import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    await AsyncStorage.removeItem('wasLoggedIn');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <FontAwesome5 name="user-circle" size={70} color="#0f2f7c" />
      <Text style={styles.title}>Your Profile</Text>
      <Text style={styles.label}>Email Address</Text>
      <Text style={styles.text}>{user?.email ?? 'Unknown user'}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0f2f7c', marginTop: 10 },
  label: { fontSize: 14, color: '#888' },
  text: { fontSize: 16, color: '#333', marginBottom: 25 },
  button: { backgroundColor: '#0f2f7c', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 25 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
