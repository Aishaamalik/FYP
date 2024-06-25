import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from "./Firebase/Firebase.config";


const SettingsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <View style={{ marginVertical: 10 }} />

      
      
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={() => { navigation.replace('Change Password');
         
        }}
      >
        <Text style={styles.settingsLabel}>Change Password</Text>
      </TouchableOpacity>
      <View style={{ marginVertical: 10 }} />
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {{ signOut(auth).then(() => {
          // Sign-out successful.
          navigation.replace("Login");
        }).catch((error) => {
          // An error happened.
        });

        }
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'lightgoldenrodyellow',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 20,
    color: 'chocolate',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'serif',
    marginBottom: 10,
  },
  settingsLabel: {
    fontSize: 16,
    fontFamily: 'serif',
    color: 'chocolate',
  },
  logoutButton: {
    backgroundColor: 'chocolate',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'serif',
  },
});

export default SettingsScreen;
