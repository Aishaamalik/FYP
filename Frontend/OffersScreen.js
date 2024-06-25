import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { db } from './Firebase/Firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const OffersScreen = () => {
  const navigation = useNavigation();
  const [offers, setOffers] = useState([]);
  const [stationName, setStationName] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    if (stationName && city) {
      const fetchOffers = async () => {
        try {
          const q = query(collection(db, 'offers'), where('stationName', '==', stationName), where('city', '==', city));
          const querySnapshot = await getDocs(q);
          const fetchedOffers = querySnapshot.docs.map(doc => doc.data());
          setOffers(fetchedOffers);
        } catch (error) {
          console.error('Error fetching offers:', error);
        }
      };

      fetchOffers();
    }
  }, [stationName, city]);

  const renderOfferItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.offerDescription}>{item.offerDescription}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Offers</Text>

      <TextInput
        placeholder="Enter station name"
        value={stationName}
        onChangeText={setStationName}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      {stationName && city && (
        <FlatList
          data={offers}
          renderItem={renderOfferItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text style={styles.noOffersText}>No offers available for this station and city.</Text>
          }
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgoldenrodyellow',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 36,
    marginBottom: 20,
    color: 'chocolate',
    fontWeight: 'bold',
    textAlign: 'center',
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
  card: {
    backgroundColor: 'chocolate',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerDescription: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  noOffersText: {
    fontSize: 18,
    color: 'chocolate',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  button: {
    backgroundColor: 'chocolate',
    borderRadius: 20,
    paddingVertical: 12,
    marginBottom: 20,
    padding: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
});

export default OffersScreen;
