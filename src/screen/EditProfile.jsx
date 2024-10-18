import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const EditProfile = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [phno, setPhno] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('');
  const [uid, setUid] = useState('12345'); // Example user ID

  const options = {
    mediaType: 'photo',
    quality: 1,
  };

  const validateFields = () => {
    if (!name || !phno || !email || !address || !gender) {
      Alert.alert('Validation Error', 'All fields must be filled out.');
      return false;
    }
    return true;
  };

  const submitProfile = async () => {
    if (!validateFields()) return;

    try {
      const formData = new FormData();
      formData.append('id', uid);
      formData.append('name', name);
      formData.append('phno', phno);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('gender', gender);
      formData.append('dob', dob.toISOString().split('T')[0]); // Format date to YYYY-MM-DD

      if (image) {
        formData.append('image', {
          uri: image,
          name: 'profile_image.jpg',
          type: 'image/jpeg',
        });
      }

      const response = await axios.post(
        'http://10.0.2.2:8083/user/create/registrations',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Profile updated successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Something went wrong!');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to update profile!');
    }
  };

  const pickImage = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'Image selection was cancelled');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else {
        const selectedImageUri = response.assets[0].uri;
        setImage(selectedImageUri);
      }
    });
  };

  const onDateChange = (_event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.modalTitle}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        placeholderTextColor="grey"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Phone"
        placeholderTextColor="grey"
        value={phno}
        onChangeText={setPhno}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
        placeholderTextColor="grey"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.input}>
        <Text style={{ color: dob ? 'black' : 'grey' }}>
          {dob ? dob.toLocaleDateString() : 'Select Your Date of Birth'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Enter Your Address"
        placeholderTextColor="grey"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Gender"
        placeholderTextColor="grey"
        value={gender}
        onChangeText={setGender}
      />
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Icon name="photo-camera" size={24} color="grey" />
        <Text style={styles.imagePickerText}>
          {image ? 'Change Image' : 'Select Image'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={submitProfile}
        style={styles.submitButton}
        disabled={!name || !phno || !email || !address || !gender}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fbfdfd',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    width: '100%',
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
  },
  imagePickerText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'grey',
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#d97b29',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#d97b29',
    textAlign: 'center',
  },
});

export default EditProfile;
