import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { collection, getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from "./Firebase/Firebase.config";
import { Picker } from '@react-native-picker/picker';

const HomeScreen = ({ navigation }) => {
  const [fuelType, setFuelType] = useState('petrol');
  const [litres, setLitres] = useState('1');
  const [stationName, setStationName] = useState('');
  const [city, setCity] = useState('');
  const [fuelPrices, setFuelPrices] = useState({
    petrol: 0,
    diesel: 0,
    highOctane: 0,
    CNG: 0,
  });

  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const currentTime = now.toLocaleTimeString();

  useEffect(() => {
    const fetchFuelPrices = async () => {
      if (stationName && city) {
        const docRef = doc(db, 'fuel_prices', `${stationName}_${city}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFuelPrices(docSnap.data());
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchFuelPrices();
  }, [stationName, city]);

  const calculatePrice = () => {
    let price;
    switch (fuelType) {
      case 'petrol':
        price = fuelPrices.petrol * parseFloat(litres);
        break;
      case 'diesel':
        price = fuelPrices.diesel * parseFloat(litres);
        break;
      case 'highOctane':
        price = fuelPrices.highOctane * parseFloat(litres);
        break;
      case 'CNG':
        price = fuelPrices.CNG * parseFloat(litres);
        break;
      default:
        price = 0;
    }
    return price.toFixed(2);
  };

  const handlePayment = async () => {
    try {
      const data = {
        fuelType,
        litres: parseFloat(litres),
        stationName,
        city,
        currentDate,
        currentTime,
        price: parseFloat(calculatePrice()), // Calculate and parse the price
      };

      // Set the data to the 'history' collection in Firestore with an auto-generated document ID
      await setDoc(doc(collection(db, 'history')), data);

    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Home Screen</Text>
      <View style={{ marginVertical: 10 }} />

      <Text style={styles.label}>Fuel Type:</Text>
      <Picker
        selectedValue={fuelType}
        onValueChange={(itemValue) => setFuelType(itemValue)}
        style={styles.input}
        mode="dropdown"
        dropdownIconColor="chocolate"
        borderColor='black'
      >
        <Picker.Item label="Petrol" value="petrol" />
        <Picker.Item label="Diesel" value="diesel" />
        <Picker.Item label="High Octane" value="highOctane" />
        <Picker.Item label="CNG" value="CNG" />
      </Picker>

      <Text style={styles.label}>Litres:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={litres}
        onChangeText={(text) => setLitres(text)}
      />

      <Text style={styles.label}>Price:</Text>
      <Text style={styles.result}>{calculatePrice()}</Text>
      <View style={{ marginVertical: 8 }} />

      <Text style={styles.label}>Station Name:</Text>
      <TextInput
        style={styles.input}
        value={stationName}
        onChangeText={(text) => setStationName(text)}
      />

      <Text style={styles.label}>City:</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      <Text style={styles.label}>Date:</Text>
      <Text style={styles.result}>{currentDate}</Text>

      <Text style={styles.label}>Time:</Text>
      <Text style={styles.result}>{currentTime}</Text>
      <View style={{ marginVertical: 8 }} />

      <Button title="Pay" color="chocolate" onPress={handlePayment} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgoldenrodyellow',
    paddingVertical: 20,
  },
  heading: {
    fontSize: 24,
    fontFamily: 'serif',
    color: 'chocolate',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: 'chocolate',
    marginTop: 10,
    fontFamily: 'serif',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    fontFamily: 'serif',
  },
  result: {
    fontSize: 20,
    color: 'chocolate',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
});

export default HomeScreen;
