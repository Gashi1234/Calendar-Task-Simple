// components/AddEventButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AddEventButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonText}>+ Add Event</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    marginTop: 16,
    backgroundColor: '#19438b',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
