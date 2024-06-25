import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { db } from "./Firebase/Firebase.config";
import { collection, addDoc} from "firebase/firestore"; 

const PaymentDetails = () => {
  const [plateNumber, setPlateNumber] = useState('');
  const [fuelCharges, setFuelCharges] = useState('');
  const [serviceCharges, setServiceCharges] = useState('');

  const addPurchaseRecord = async () => {
    const docRef = await addDoc(collection(db, "UserExpenses"), {
      PlateNo: plateNumber,
      FuelChrg: fuelCharges,
      ServiceChrg: serviceCharges
    });
    

    // You can clear the input fields after submitting
    setPlateNumber('');
    setFuelCharges('');
    setServiceCharges('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Records</Text>
      <View style={{ marginVertical: 10 }} />
      <TextInput
        style={styles.input}
        placeholder="Plate Number"
        value={plateNumber}
        onChangeText={text => setPlateNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fuel Charges"
        keyboardType="numeric"
        value={fuelCharges}
        onChangeText={text => setFuelCharges(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Service Charges"
        keyboardType="numeric"
        value={serviceCharges}
        onChangeText={text => setServiceCharges(text)}
      />
      <View style={{ marginVertical: 10 }} />
      <Button title="Add Record" color='chocolate' onPress={addPurchaseRecord} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgoldenrodyellow',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 16,
    color: 'red',
    
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default PaymentDetails;
