import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./Firebase/Firebase.config";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFindAccount = () => {
    if(email !== '') {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setMessage("Password reset email has been sent successfully");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
        });
    } else {
      setError("Please enter a valid email");
    }
  };

  return (
    <ImageBackground source={require('./assets/4.jpg')} style={styles.backgroundImage} blurRadius={5}>
      <View style={styles.container}>
        <Text style={styles.heading}>Reset Your Password</Text>
        <Text style={styles.title}>Enter your email</Text>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} style={styles.mailIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <Text style={styles.infoText}>
          You may receive SMS notifications from us for security and login purposes.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleFindAccount}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorMessage}>{error}</Text>}
        {message && <Text style={styles.successMessage}>{message}</Text>}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ebd61e',
    marginBottom: 20,
    fontFamily: 'serif',
  },
  title: {
    fontSize: 18,
    color: '#ebd61e',
    marginBottom: 10,
    fontFamily: 'serif',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ebd61e',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  mailIcon: {
    color: '#ebd61e',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#483d8b',
    fontFamily: 'serif',
  },
  infoText: {
    fontSize: 15,
    color: '#ebd61e',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'serif',
  },
  button: {
    backgroundColor: '#d4c11e',
    borderRadius: 20,
    paddingVertical: 12,
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'serif',
  },
  successMessage: {
    fontSize: 16,
    color: '#008000',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'serif',
  },
});

export default ForgotPasswordScreen;
