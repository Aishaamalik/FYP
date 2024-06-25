import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase/Firebase.config";
import { db } from "./Firebase/Firebase.config";
import { collection, setDoc, doc } from "firebase/firestore"; 

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [cnic, setCNIC] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const saveData = async () => {
    await setDoc(doc(db, "users",auth.currentUser.uid), {
      Username: username,
      CNIC:cnic,
    })
    .then(() => {
      alert("ADDED");
    });
  }

  const handleSignup = () => {
    if (!validateCNIC(cnic)) {
      alert('Invalid CNIC', 'Please enter a valid CNIC.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords Do Not Match', 'Please make sure your passwords match.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("User Created Successfully");
        navigation.replace('Cardetails');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      }); 

    //saveData();
  };

  const validateCNIC = (cnic) => {
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    return cnicRegex.test(cnic);
  };

  return (
    <ImageBackground source={require('./assets/4.jpg')} style={styles.backgroundImage} blurRadius={5}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.inputWrapper}>
            <Icon name="user" size={20} color="#ebd61e" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#cccbbe"
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icon name="id-card" size={20} color="#ebd61e" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="CNIC"
              placeholderTextColor="#cccbbe"
              value={cnic}
              onChangeText={setCNIC}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icon name="envelope" size={20} color="#ebd61e" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#cccbbe"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icon name="lock" size={20} color="#ebd61e" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#cccbbe"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icon name="lock" size={20} color="#ebd61e" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#cccbbe"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    color: '#ebd61e',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ebd61e',
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#483d8b',
    fontFamily: 'serif',
  },
  button: {
    backgroundColor: '#d4c11e',
    borderRadius: 20,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
