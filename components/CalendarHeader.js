import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format } from 'date-fns';

export default function CalendarHeader({ currentDate, onPrev, onNext }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.arrowButton} onPress={onPrev}>
        <Text style={styles.arrowText}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={styles.monthText}>{format(currentDate, 'MMMM yyyy')}</Text>

      <TouchableOpacity style={styles.arrowButton} onPress={onNext}>
        <Text style={styles.arrowText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16,
  },
  monthText: {
    fontSize: 18, fontWeight: 'bold',
  },
  arrowButton: {
    paddingHorizontal: 20,
  },
  arrowText: {
    fontSize: 24,
  },
});
