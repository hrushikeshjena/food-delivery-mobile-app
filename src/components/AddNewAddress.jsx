import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const AddNewAddress = ({ navigation }) => {
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSaveAddress = async () => {
    if (!addressLine1 || !city || !state || !zipCode || !mobileNumber) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }
    if (zipCode.length !== 5) {
      Alert.alert('Invalid ZIP Code', 'Please enter a valid 5-digit ZIP Code.');
      return;
    }
    if (mobileNumber.length !== 10) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('USERID');
      if (!userId) {
        Alert.alert('Error', 'User ID not found.');
        return;
      }

      const user = await firestore().collection('users').doc(userId).get();
      const addressId = uuid.v4(); // Generate a new unique address ID
      let tempDart = user.data()?.address || []; // Initialize with existing addresses or empty array

      // Push the new address to the tempDart array
      tempDart.push({
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
        mobileNumber,
        addressId,
      });

      // Update the user's address list in Firestore
      await firestore().collection('users').doc(userId).update({
        address: tempDart,
      });

      Alert.alert('Success', 'Address has been saved successfully!');
      navigation.goBack();
    } catch (error) {
      console.log('Error saving address:', error);
      Alert.alert('Error', 'Failed to save the address. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Address</Text>

      <TextInput
        style={styles.input}
        placeholder="Address Line 1"
        value={addressLine1}
        onChangeText={setAddressLine1}
      />
      <TextInput
        style={styles.input}
        placeholder="Address Line 2"
        value={addressLine2}
        onChangeText={setAddressLine2}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="ZIP Code"
        value={zipCode}
        keyboardType="numeric"
        maxLength={5}
        onChangeText={setZipCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        value={mobileNumber}
        maxLength={10}
        keyboardType="number-pad"
        onChangeText={setMobileNumber}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
        <Text style={styles.saveButtonText}>Save Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#d97b29',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddNewAddress;
