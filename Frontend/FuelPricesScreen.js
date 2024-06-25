import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { db } from './Firebase/Firebase.config';
import { setDoc, doc } from 'firebase/firestore';

const FuelPriceScreen = () => {
  const [petrolPrice, setPetrolPrice] = useState('');
  const [dieselPrice, setDieselPrice] = useState('');
  const [highOctanePrice, setHighOctanePrice] = useState('');
  const [CNGPrice, setCNGPrice] = useState('');
  const [stationName, setStationName] = useState('');
  const [city, setCity] = useState('');

  const storeFuelPrices = async () => {
    try {
      await setDoc(doc(db, 'fuel_prices', '${stationName}_${city}'), {
        petrol: parseFloat(petrolPrice),
        diesel: parseFloat(dieselPrice),
        highOctane: parseFloat(highOctanePrice),
        CNG: parseFloat(CNGPrice),
        stationName: stationName,
        city: city,
      });
      alert('Fuel prices and station details stored successfully');
    } catch (error) {
      console.error('Error storing fuel prices: ' + error);
    }
  };

  const isStationAndCityProvided = stationName !== '' && city !== '';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entry of Fuel Prices</Text>
      <View style={{ marginVertical: 15 }} />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Station Name:</Text>
        <TextInput
          style={styles.input}
          value={stationName}
          onChangeText={setStationName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>City:</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />
      </View>

      {isStationAndCityProvided && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Petrol:</Text>
            <TextInput
              style={styles.input}
              value={petrolPrice}
              onChangeText={setPetrolPrice}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Diesel:</Text>
            <TextInput
              style={styles.input}
              value={dieselPrice}
              onChangeText={setDieselPrice}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>High Octane:</Text>
            <TextInput
              style={styles.input}
              value={highOctanePrice}
              onChangeText={setHighOctanePrice}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>CNG:</Text>
            <TextInput
              style={styles.input}
              value={CNGPrice}
              onChangeText={setCNGPrice}
              keyboardType="numeric"
            />
          </View>
        </>
      )}

      <View style={{ marginVertical: 10 }} />

      <Button
        title="Save Prices"
        color="chocolate"
        onPress={storeFuelPrices}
        disabled={!isStationAndCityProvided}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'lightgoldenrodyellow',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 20,
    color: 'chocolate',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    width: 100,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    fontFamily: 'serif',
  },
});

export default FuelPriceScreen;
