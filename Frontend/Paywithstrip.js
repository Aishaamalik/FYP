import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";

const totalPrice = 100;

const PaymentScreen = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const stripe = useStripe();

 
  useEffect(() => {
    fetch("http://192.168.100.5:3001/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const makePayment = async () => {
    if (!clientSecret) {
      setPaymentError("Payment secret not found.");
      return;
    }

   
    const { error, paymentIntent } = await stripe.confirmPayment(clientSecret, {
      type: 'Card',
      paymentMethodType: 'Card',
      billingDetails: { email },
    });

    if (error) {
     
      console.error("Payment failed:", error.message);
      setPaymentError(error.message);
      setPaymentSuccess(false);
    } else {
      console.log("Payment successful:", paymentIntent);
      setPaymentSuccess(true);
      setPaymentError(null);
      resetForm();
    }
  };
  
  const resetForm = () => {
   
    setClientSecret("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: "4242 4242 4242 4242",
        }}
        style={styles.cardField} 
        onCardChange={(details) => {
          setPaymentError(null); 
        }}
      />
      <Button title="Pay Now" onPress={makePayment} color="#841584" />
      {paymentError && <Text style={styles.errorText}>{paymentError}</Text>}
      {paymentSuccess && <Text style={styles.successText}>Payment successful!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  cardField: {
    backgroundColor: '#fff',
    height: 50,
    marginVertical: 30,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PaymentScreen;
