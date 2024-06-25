import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from './Firebase/Firebase.config';
import { setDoc, doc } from 'firebase/firestore';

const CarSignupProfileScreen = ({ navigation }) => {
  const [carName, setCarName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFuelUnit, setSelectedFuelUnit] = useState('Liters');
  const [selectedDistanceUnit, setSelectedDistanceUnit] = useState('Kilometers');
  const [selectedConsumptionUnit, setSelectedConsumptionUnit] = useState('L/100km');
  const [selectedGasType, setSelectedGasType] = useState('Not Set');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');

  const handleMakeChange = (text) => {
    setMake(text);
  };

  const handleModelChange = (text) => {
    setModel(text);
  };
  const handleYearChange = (text) => {
    setYear(text);
  };
  const handlePlateChange = (text) => {
    setPlate(text);
  };

  const handleFuelUnitChange = (unit) => {
    setSelectedFuelUnit(unit);
  };

  const handleDistanceUnitChange = (unit) => {
    setSelectedDistanceUnit(unit);
  };

  const handleConsumptionUnitChange = (unit) => {
    setSelectedConsumptionUnit(unit);
  };

  const handleGasTypeChange = (gasType) => {
    setSelectedGasType(gasType);
  };

  const handleDone = async () => {
    try {
      const carData = {
        carName,
        description,
        selectedFuelUnit,
        selectedDistanceUnit,
        selectedConsumptionUnit,
        selectedGasType,
        make,
        model,
        year,
        plate
      };

      // Add the car data to Firestore using license plate number as document ID
      await setDoc(doc(db, 'cars', plate), carData);

      // Navigate to the next screen
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.unitHeading}>Car Information</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder=" Car Name"
          value={carName}
          onChangeText={(text) => setCarName(text)}
          style={styles.input}
          placeholderTextColor="chocolate"
        />
      </View>

      <TextInput
        placeholder="Description (Optional)"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
        numberOfLines={6}
        style={styles.descriptionInput}
        placeholderTextColor="chocolate"
      />

      <View style={styles.container1}>
        <Text style={styles.heading}>Units</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Fuel Unit: </Text>
          <Picker
            selectedValue={selectedFuelUnit}
            onValueChange={(itemValue) => handleFuelUnitChange(itemValue)}
            style={styles.dropdown}
          >
            <Picker.Item label="Liters" value="Liters" />
            <Picker.Item label="Gallons" value="Gallons" />
            <Picker.Item label="kWh" value="kWh" />
            <Picker.Item label="kg" value="kg" />
            <Picker.Item label="m^3" value="m^3" />
          </Picker>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Distance Unit: </Text>
          <Picker
            selectedValue={selectedDistanceUnit}
            onValueChange={(itemValue) => handleDistanceUnitChange(itemValue)}
            style={styles.dropdown}
          >
            <Picker.Item label="Kilometers" value="Kilometers" />
            <Picker.Item label="Miles" value="Miles" />
          </Picker>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Consumption Unit:</Text>
          <Picker
            selectedValue={selectedConsumptionUnit}
            onValueChange={(itemValue) => handleConsumptionUnitChange(itemValue)}
            style={styles.dropdown}
          >
            <Picker.Item label="L/100km" value="L/100km" />
            <Picker.Item label="km/L" value="km/L" />
            <Picker.Item label="mpg (UK)" value="mpg (UK)" />
            <Picker.Item label="mpg (US)" value="mpg (US)" />
          </Picker>
        </View>
      </View>

      <View style={styles.container3}>
        <Text style={styles.heading}>Gas Type</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Select Gas Type:</Text>
          <Picker
            selectedValue={selectedGasType}
            onValueChange={(itemValue) => handleGasTypeChange(itemValue)}
            style={styles.dropdown}
          >
            <Picker.Item label="Not Set" value="Not Set" />
            <Picker.Item label="Gasoline" value="Gasoline" />
            <Picker.Item label="Diesel" value="Diesel" />
            <Picker.Item label="Ethanol" value="Ethanol" />
            <Picker.Item label="LPG" value="LPG" />
            <Picker.Item label="CNG" value="CNG" />
            <Picker.Item label="Electric" value="Electric" />
            <Picker.Item label="Flex" value="Flex" />
          </Picker>
        </View>
      </View>

      <Text style={styles.heading}>Details</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input3}
          onChangeText={handleMakeChange}
          value={make}
          placeholder="Make"
          placeholderTextColor= 'chocolate'
        />
        <TextInput
          style={[styles.input3, styles.modelInput]}
          onChangeText={handleModelChange}
          value={model}
          placeholder="Model"
          placeholderTextColor= 'chocolate'
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input3}
          onChangeText={handleYearChange}
          value={year}
          placeholder="Year"
          placeholderTextColor='chocolate'
        />
        <TextInput
          style={[styles.input3, styles.modelInput]}
          onChangeText={handlePlateChange}
          value={plate}
          placeholder="License Plate"
          placeholderTextColor='chocolate'
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleDone}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: 'lightgoldenrodyellow',
  },
  unitHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'chocolate',
    fontFamily: 'serif',
    textAlign: 'center',
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
    paddingLeft: 10,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: 'chocolate',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
    color: 'chocolate',
    fontFamily: 'serif',
    fontSize: 16,
    marginBottom: 20,
    marginTop: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'chocolate',
    fontFamily: 'serif',
  },
  label: {
    fontSize: 18,
    marginRight: 16,
    color: 'chocolate',
    fontFamily: 'serif',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dropdown: {
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: 'chocolate',
    color: 'chocolate',
  },
  container1: {
    marginTop: 20,
    color: 'chocolate',
  },
  container3: {
    flex: 1,
    padding: 16,
    color: 'chocolate',
  },
  input3: {
    flex: 1,
    height: 40,
    borderColor: 'chocolate',
    borderWidth: 1,
    color: 'chocolate',
    fontFamily: 'serif',
    fontSize: 16,
    marginBottom: 20,
    marginRight: 10,
    paddingLeft: 10,
  },
  modelInput: {
    marginRight: 0,
  },
  button: {
    backgroundColor: 'chocolate',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 6,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'serif',
  },
});

export default CarSignupProfileScreen;
