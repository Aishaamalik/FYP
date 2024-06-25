import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './Firebase/Firebase.config';

const SearchCarDetailsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    if (searchText.trim() === '') {
      alert('Error Please enter a search query.');
    } else {
      try {
        const q = query(collection(db, 'cars'), where('plate', '==', searchText));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          alert('Not Found. No car found with the entered plate number.');
        } else {
          // Retrieve the data
          querySnapshot.forEach((doc) => {
            setSearchResult(doc.data());
          });
        }
      } catch (error) {
        console.error('Error searching for car:', error);
        alert('Error An error occurred while searching for the car details.');
      }
    }
  };

  return (
    
      <View style={styles.container}>
        <Text style={styles.heading}>Search Car Details</Text>
        <View style={{ marginVertical: 15 }} />

        <TextInput
          style={styles.input}
          placeholder="Enter car number plate"
          placeholderTextColor="#cccbbe"
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={{ marginVertical: 10 }} />

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        {searchResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultHeading}>Car Details</Text>
            <Text>Car Name: {searchResult.carName}</Text>
            <Text>Description: {searchResult.description}</Text>
            <Text>Fuel Unit: {searchResult.selectedFuelUnit}</Text>
            <Text>Distance Unit: {searchResult.selectedDistanceUnit}</Text>
            <Text>Consumption Unit: {searchResult.selectedConsumptionUnit}</Text>
            <Text>Fuel Type: {searchResult.selectedGasType}</Text>
            <Text>Make: {searchResult.make}</Text>
            <Text>Model: {searchResult.model}</Text>
            <Text>Year: {searchResult.year}</Text>
            <Text>Plate: {searchResult.plate}</Text>
          </View>
        )}
      </View>
  
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor:'lightgoldenrodyellow'
  },
  heading: {
    fontSize: 36,
    marginBottom: 45,
    color: 'chocolate',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  input: {
    borderColor: 'chocolate',
    borderBottomWidth: 1,
    padding: 8,
    width: 200,
    marginBottom: 10,
    fontFamily: 'serif',
    color: 'chocolate',
    
  },
  button: {
    backgroundColor: 'chocolate',
    borderRadius: 20,
    paddingVertical: 12,
    width: 200,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5
  },
  resultHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'chocolate',
  }
});

export default SearchCarDetailsScreen;
