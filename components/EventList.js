import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function EventList({ events, selectedDate, onEdit, onDelete }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Events for {selectedDate}</Text>
      {events.length === 0 ? (
        <Text style={styles.noEvents}>No events for this day.</Text>
      ) : (
        <ScrollView style={styles.scroll}>
          {events.map((e, i) => (
            <View key={i} style={styles.eventRow}>
              <TouchableOpacity style={styles.eventInfo} onPress={() => onEdit(i)}>
                <Text style={styles.title}>{e.title}</Text>
                {!!e.description && <Text style={styles.description}>{e.description}</Text>}
              </TouchableOpacity>
              <TouchableOpacity testID={`delete-button-${i}`} onPress={() => onDelete(i)} style={styles.deleteButton}>
                <FontAwesome name="trash" size={20} color="#d11a2a" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16, flex: 1 },
  scroll: { flexGrow: 0 },
  headerText: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  noEvents: { fontStyle: 'italic', color: '#777' },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
  },
  eventInfo: { flex: 1 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4, color: '#19438b' },
  description: { fontSize: 14, color: '#333' },
  deleteButton: { marginLeft: 12, padding: 4 },
});
