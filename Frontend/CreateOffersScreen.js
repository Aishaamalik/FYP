import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from './Firebase/Firebase.config';
import { setDoc, doc } from 'firebase/firestore';

const CreateOffersScreen = ({ navigation }) => {
  const [offerDescription, setOfferDescription] = useState('');
  const [stationName, setStationName] = useState('');
  const [city, setCity] = useState('');

  const saveData = async () => {
    try {
      // Generate a unique document ID for the offer
      const offerId = `${stationName}_${city}_${Date.now()}`;

      // Create the offer object
      const offer = {
        offerDescription,
        stationName,
        city,
      };

      // Save the offer to Firestore
      await setDoc(doc(db, 'offers', offerId), offer);

      alert('Offer saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Offers</Text>

      <Text style={styles.label}>Station Name</Text>
      <TextInput
        placeholder="Enter station name"
        value={stationName}
        onChangeText={setStationName}
        style={styles.input}
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      <Text style={styles.label}>Offer Description</Text>
      <TextInput
        placeholder="Enter offer description"
        value={offerDescription}
        onChangeText={setOfferDescription}
        style={styles.input}
        multiline
        numberOfLines={6}
      />

      <TouchableOpacity style={styles.button} onPress={saveData}>
        <Text style={styles.buttonText}>Save Offer</Text>
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
    marginBottom: 45,
    color: 'chocolate',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    color: 'chocolate',
    fontFamily: 'serif',
  },
  input: {
    borderWidth: 1,
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'chocolate',
    borderRadius: 20,
    color: 'black',
    fontFamily: 'serif',
    fontSize: 16,
    textAlignVertical: 'top', 
  },
  button: {
    marginTop: 10,
    backgroundColor: 'chocolate',
    borderRadius: 20,
    paddingVertical: 12,
    width: '80%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
});

export default CreateOffersScreen;
