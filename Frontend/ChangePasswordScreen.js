import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./Firebase/Firebase.config";


const ChangePassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const handleDone = () => {
    if(email != ''){
      sendPasswordResetEmail(auth, email)
  .then(() => {
    alert("Password change email has been sent successfully");
  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    
  });
    }
    else{
      alert("Please enter valid Email");
    }
  };
  const handleSkip = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Change Your Password</Text>
      <View style={{ marginVertical: 10 }} />
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
      <View style={{ marginVertical: 10 }} />
      
      <Button title="Done" onPress={handleDone} color="chocolate" />
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      {message && <Text style={styles.errorMessage}>{message}</Text>}
      <View style={{ marginVertical: 8 }} />

      <Button title= 'Skip' color="chocolate"  onPress={handleSkip}/>
       
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgoldenrodyellow',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'chocolate',
    fontFamily: 'serif',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: 'chocolate',
    fontFamily: 'serif',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mailIcon: {
    color: 'chocolate',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    width:240,
    borderWidth: 1,
    borderColor: 'chocolate',
    borderRadius: 20,
    padding:10,
    marginVertical: 10,
    fontFamily: 'serif',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'serif',
  },
  
 
});

export default ChangePassword;
