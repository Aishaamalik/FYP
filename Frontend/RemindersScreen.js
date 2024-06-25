import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, Alert, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

const ReminderScreen = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    // Request notification permissions on component mount
    const requestNotificationPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Please enable notifications to set reminders.'
        );
      }
    };

    requestNotificationPermissions();
  }, []);

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const setReminder = async () => {
    if (title === '') {
      Alert.alert('Error', 'Please fill in the title');
      return;
    }

    if (!date) {
      Alert.alert('Error', 'Please select a date and time');
      return;
    }

    try {
      // Scheduling the notification
      const schedulingOptions = {
        content: {
          title: 'Reminder',
          body: title,
        },
        trigger: {
          date,
        },
      };

      const schedulingResponse =
        await Notifications.scheduleNotificationAsync(schedulingOptions);

      if (schedulingResponse) {
        console.log('Notification scheduled:', schedulingResponse);
      } else {
        console.error('Failed to schedule notification');
        Alert.alert(
          'Error',
          'Failed to schedule notification. Please try again.'
        );
      }

      setTitle('');
      setDate(new Date());
      setShowDatePicker(false);
      setShowTimePicker(false);
    } catch (error) {
      console.error('Error scheduling notification:', error);
      Alert.alert('Error', 'Failed to schedule notification. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Reminder</Text>
      <Text style={styles.label}>Title:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Enter title"
          placeholderTextColor="#cccbbe"
        />
      </View>
      <Text style={styles.label}>Date:</Text>
      <TouchableOpacity style={styles.button} onPress={showDatepicker}>
        <Text style={styles.buttonText}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setDate(currentDate);
            setShowDatePicker(Platform.OS === 'ios');
          }}
        />
      )}
      <Text style={styles.label}>Time:</Text>
      <TouchableOpacity style={styles.button} onPress={showTimepicker}>
        <Text style={styles.buttonText}>{date.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            const currentTime = selectedTime || date;
            setDate(currentTime);
            setShowTimePicker(Platform.OS === 'ios');
          }}
        />
      )}
      <TouchableOpacity style={styles.submitButton} onPress={setReminder}>
        <Text style={styles.buttonText}>Set Reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'lightgoldenrodyellow',
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    color: 'chocolate',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'chocolate',
    fontFamily: 'serif',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'chocolate',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: 'chocolate',
    fontFamily: 'serif',
  },
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'chocolate',
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 10,
  },
  submitButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'chocolate',
    width: '100%',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
});

export default ReminderScreen;
