import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  isSameDay,
} from 'date-fns';

export default function CalendarView({ currentDate, selectedDate, onDayPress }) {
  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);
  const startDate = startOfWeek(startMonth, { weekStartsOn: 1 });

  const weeks = [];
  let day = startDate;

  while (day <= endMonth || weeks.length < 6) {
    const week = [];

    for (let i = 0; i < 7; i++) {
      const copy = day;
      week.push(
        <TouchableOpacity
          key={copy.toISOString()}
          onPress={() => onDayPress(copy)}
          style={[styles.day, isSameDay(copy, selectedDate) && styles.selectedDay]}
        >
          <Text style={isSameDay(copy, selectedDate) && { color: '#fff' }}>
            {copy.getDate()}
          </Text>
        </TouchableOpacity>
      );
      day = addDays(day, 1);
    }

    weeks.push(
      <View key={day.toISOString()} style={styles.week}>
        {week}
      </View>
    );
  }

  return <View>{weeks}</View>;
}

const styles = StyleSheet.create({
  week: {
    flexDirection: 'row', justifyContent: 'space-around', marginBottom: 4,
  },
  day: {
    width: 30, height: 30, justifyContent: 'center', alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: '#19438b', borderRadius: 20,
  },
});
