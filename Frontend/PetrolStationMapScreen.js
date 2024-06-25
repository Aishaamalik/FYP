import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; 

const API_KEY = 'AIzaSyBKJEYaKJf49pcMpk53yEcIdz5CG4B0tRM'; 
const NearbyPetrolStations = () => {
  const [nearestPetrolStation, setNearestPetrolStation] = useState(null);
  const [error, setError] = useState(null);
  const [petrolStations, setPetrolStations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const fetchNearbyPetrolStations = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=gas_station&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('API response:', data);
      setPetrolStations(data.results);

      
      let minDistance = Infinity;
      let nearestStation = null;
      data.results.forEach(station => {
        const distance = calculateDistance(
          latitude,
          longitude,
          station.geometry.location.lat,
          station.geometry.location.lng
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestStation = station;
        }
      });

      setNearestPetrolStation(nearestStation);
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

  if (!userLocation || !nearestPetrolStation) {
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
        {petrolStations.map(station => (
        <Marker
          key={station.place_id}
          coordinate={{
            latitude: station.geometry.location.lat,
            longitude: station.geometry.location.lng,
          }}
          title={station.name}
          description={station.vicinity}
          pinColor={station.place_id === nearestPetrolStation?.place_id ? 'purple' : 'yellow'}
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

export default NearbyPetrolStations;
