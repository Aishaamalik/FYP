import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TripCalculatorScreen = () => {
  const [tripCostResult, setTripCostResult] = useState(null);
  const [distanceResult, setDistanceResult] = useState(null);
  const [consumptionResult, setConsumptionResult] = useState(null);
  const [gasResult, setGasResult] = useState(null);

  const [tripCostDistance, setTripCostDistance] = useState('');
  const [tripCostPricePerLiter, setTripCostPricePerLiter] = useState('');
  const [tripCostConsumption, setTripCostConsumption] = useState('');

  const [distanceGas, setDistanceGas] = useState('');
  const [distancePricePerLiter, setDistancePricePerLiter] = useState('');
  const [distanceConsumption, setDistanceConsumption] = useState('');

  const [consumptionDistance, setConsumptionDistance] = useState('');
  const [consumptionGas, setConsumptionGas] = useState('');
  const [consumptionPricePerLiter, setConsumptionPricePerLiter] = useState('');

  const [gasDistance, setGasDistance] = useState('');
  const [gasPricePerLiter, setGasPricePerLiter] = useState('');
  const [gasConsumption, setGasConsumption] = useState('');

  const calculateTripCost = () => {
    const cost =
      (parseFloat(tripCostDistance) * parseFloat(tripCostConsumption) * parseFloat(tripCostPricePerLiter)).toFixed(2);

    setTripCostResult(`Cost: ${cost} PKR`);
  };

  const calculateDistance = () => {
    const distance = parseFloat(distanceGas) / parseFloat(distanceConsumption);
    setDistanceResult(`Distance: ${distance.toFixed(2)} km`);
  };

  const calculateConsumption = () => {
    const consumption = parseFloat(consumptionGas) / (parseFloat(consumptionDistance) * parseFloat(consumptionPricePerLiter));
    setConsumptionResult(`Consumption: ${consumption.toFixed(2)} litres/km`);
  };

  const calculateGas = () => {
    const gas = parseFloat(gasDistance) * parseFloat(gasConsumption) * parseFloat(gasPricePerLiter);
    setGasResult(`Gas Required: ${gas.toFixed(2)} litres`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Calculator</Text>

        {/* Calculate Trip Cost */}
        <View style={styles.calculationContainer}>
          <Text style={styles.subtitle}>Calculate Trip Cost</Text>
          {renderTextInput('Distance (km):', tripCostDistance, setTripCostDistance)}
          {renderTextInput('Price per Liter (PKR):', tripCostPricePerLiter, setTripCostPricePerLiter)}
          {renderTextInput('Consumption (litres/km):', tripCostConsumption, setTripCostConsumption)}
          <TouchableOpacity style={styles.button} onPress={calculateTripCost}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
          {tripCostResult && <Text style={styles.result}>{tripCostResult}</Text>}
        </View>

        {/* Calculate Distance */}
        <View style={styles.calculationContainer}>
          <Text style={styles.subtitle}>Calculate Distance</Text>
          {renderTextInput('Petrol (litres):', distanceGas, setDistanceGas)}
          {renderTextInput('Price per Liter (PKR):', distancePricePerLiter, setDistancePricePerLiter)}
          {renderTextInput('Consumption (litres/km):', distanceConsumption, setDistanceConsumption)}
          <TouchableOpacity style={styles.button} onPress={calculateDistance}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
          {distanceResult && <Text style={styles.result}>{distanceResult}</Text>}
        </View>

        

        {/* Calculate Gas Required */}
        <View style={styles.calculationContainer}>
          <Text style={styles.subtitle}>Calculate Petrol Required</Text>
          {renderTextInput('Distance (km):', gasDistance, setGasDistance)}
          {renderTextInput('Price per Liter (PKR):', gasPricePerLiter, setGasPricePerLiter)}
          {renderTextInput('Consumption (litres/km):', gasConsumption, setGasConsumption)}
          <TouchableOpacity style={styles.button} onPress={calculateGas}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
          {gasResult && <Text style={styles.result}>{gasResult}</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

const renderTextInput = (label, value, onChangeText) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={`Enter ${label.toLowerCase()}`}
      keyboardType="numeric"
      value={value}
      onChangeText={onChangeText}
    />
  </>
);

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'lightgoldenrodyellow',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    color: 'chocolate',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 10,
    color: 'chocolate',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  calculationContainer: {
    width: '90%',
    
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'chocolate',
    fontFamily: 'serif',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'chocolate',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontFamily: 'serif',
  },
  button: {
    backgroundColor: 'chocolate',
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'serif',
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'chocolate',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'serif',
  },
});

export default TripCalculatorScreen;
