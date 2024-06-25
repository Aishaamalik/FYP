import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/Firebase.config";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === 'abc@gmail.com') {
          navigation.replace('Admin');
        } else {
          navigation.replace('Home');
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.message);
      });
  };

  return (
    <ImageBackground source={require('./assets/4.jpg')} style={styles.backgroundImage} blurRadius={5}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#ebd61e" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#cccbbe" 
            onChangeText={text => setEmail(text)}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#ebd61e" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#cccbbe" 
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <TouchableOpacity
          style={loading ? [styles.button, styles.buttonDisabled] : styles.button}
          onPress={handleLogin}
          disabled={loading || !email || !password}
        >
          <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.touchableOpacity}
          >
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={[styles.touchableOpacity, styles.signUpLink]}
          >
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 36,
    marginBottom: 45,
    color: '#ebd61e',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:'serif'
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ebd61e',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#483d8b', 
  },
  errorText: {
    color: '#ff0000', // Red
    marginBottom: 12,
    textAlign: 'center',
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
    fontWeight: 'bold'
  },
  buttonDisabled: {
    backgroundColor: '#d3d3d3', // Light gray
  },
  bottomContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableOpacity: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  linkText: {
    backgroundColor: '#d4c11e', // Semi-transparent orange background
    borderRadius: 20,
    paddingVertical: 12,
    width: '100%',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
    padding : 20,
    fontFamily: 'serif',
    fontWeight: 'bold'
  },
  signUpText: {
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#c7b82e', 
    fontFamily : 'serif',
    fontWeight: 'bold'
  },
  signUpLink: {
    fontWeight: 'bold',
    marginTop: 10
  },
});

export default LoginScreen;
