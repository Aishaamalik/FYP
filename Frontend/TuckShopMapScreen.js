import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const API_KEY = 'AIzaSyBKJEYaKJf49pcMpk53yEcIdz5CG4B0tRM';

const TuckShopMapScreen = () => {
  const [petrolStations, setPetrolStations] = useState([]);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const fetchNearbyPetrolStations = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=gas_station&keyword=tuck%20shop&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('API response:', data);
      setPetrolStations(data.results);
    } catch (error) {
      console.error('Error fetching nearby petrol stations:', error);
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
        fetchNearbyPetrolStations(latitude, longitude);
      } catch (error) {
        console.error('Error getting location:', error);
        setError('Failed to get location');
      }
    };

    requestLocationPermission();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!userLocation) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {petrolStations.map((station, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: station.geometry.location.lat,
            longitude: station.geometry.location.lng,
          }}
          title={station.name}
          description={station.vicinity}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
});
export default TuckShopMapScreen;
