import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './Firebase/Firebase.config';

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'history'));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setHistoryData(data);
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    };

    fetchHistoryData();
  }, []);

  const deleteHistory = async (id) => {
    try {
      await deleteDoc(doc(db, 'history', id));
      const updatedHistory = historyData.filter((item) => item.id !== id);
      setHistoryData(updatedHistory);
    } catch (error) {
      console.error('Error deleting history:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.cost}>Date: {item.currentDate}</Text>
      <Text style={styles.cost}>Petrol Pump: {item.petrolStationName}</Text>
      <Text style={styles.cost}>Fuel Type: {item.fuelType}</Text>
      <Text style={styles.cost}>Amount: {item.litres}</Text>
      <Text style={styles.cost}>Cost: {item.price}</Text>
      <Text style={styles.cost}>Time: {item.currentTime}</Text>
      <TouchableOpacity onPress={() => deleteHistory(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {historyData.length > 0 ? (
        <FlatList
          data={historyData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noDataText}>No history available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgoldenrodyellow',
    padding: 10,
  },
  historyItem: {
    backgroundColor: 'chocolate',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cost: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    fontFamily: 'serif'
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'serif',
  },
  noDataText: {
    fontSize: 18,
    color: 'chocolate',
    textAlign: 'center',
    fontFamily: 'serif',
  },
});

export default HistoryScreen;
