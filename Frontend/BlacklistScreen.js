import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import CheckBox from 'expo-checkbox'; // Updated import

const BlacklistScreen = () => {
  const [numberPlate, setNumberPlate] = useState('');
  const [isOnBlacklist, setIsOnBlacklist] = useState(false);

  const verifyNumberPlate = () => {
    const isBlacklisted = numberPlate === '12345678';
    setIsOnBlacklist(isBlacklisted);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgoldenrodyellow' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'chocolate' }}>Blacklist</Text>

      <Text style={{ fontSize: 18, marginBottom: 10, color: 'chocolate' }}>Search:</Text>
      <TextInput
        style={{ borderColor: 'gray', borderWidth: 1, padding: 8, width: 200, marginBottom: 10 }}
        placeholder="Enter number plate"
        value={numberPlate}
        onChangeText={setNumberPlate}
      />

      <Button title="Verify" color='chocolate' onPress={verifyNumberPlate} />

      {numberPlate && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <CheckBox
            value={isOnBlacklist}
            disabled // You can remove the disabled prop if needed
          />
          <Text style={{ marginLeft: 10 }}>
            {isOnBlacklist
              ? 'This number plate is on the blacklist (✗)'
              : 'This number plate is verified not on the blacklist (✓)'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default BlacklistScreen;
