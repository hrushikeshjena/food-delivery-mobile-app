// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Image,
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {useNavigation} from '@react-navigation/native';
// import {launchImageLibrary} from 'react-native-image-picker';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import axios from 'axios';
// import {Picker} from '@react-native-picker/picker';

// const EditProfile = () => {
//   const navigation = useNavigation();
//   const [image, setImage] = useState(null);
//   const [name, setName] = useState('');
//   const [phno, setPhno] = useState('');
//   const [email, setEmail] = useState('');
//   const [address, setAddress] = useState('');
//   const [dob, setDob] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [gender, setGender] = useState('');
//   const [uid] = useState();
//   const [profileId, setProfileId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const pickImage = () => {
//     const options = {mediaType: 'photo', quality: 1};
//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         Alert.alert('Cancelled', 'Image selection was cancelled');
//       } else if (response.errorMessage) {
//         Alert.alert('Error', response.errorMessage);
//       } else {
//         setImage(response.assets[0].uri);
//       }
//     });
//   };

//   const validateFields = () => {
//     if (!name || !phno || !email || !address || !gender) {
//       Alert.alert('Validation Error', 'All fields must be filled out.');
//       return false;
//     }
//     if (!/^[0-9]{10}$/.test(phno)) {
//       Alert.alert(
//         'Validation Error',
//         'Please enter a valid 10-digit phone number.',
//       );
//       return false;
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       Alert.alert('Validation Error', 'Please enter a valid email address.');
//       return false;
//     }
//     return true;
//   };

//   const submitProfile = async () => {
//     if (!validateFields()) return;

//     const formData = new FormData();
//     formData.append('id', uid);
//     formData.append('name', name);
//     formData.append('phno', phno);
//     formData.append('email', email);
//     formData.append('address', address);
//     formData.append('gender', gender);
//     formData.append('dob', dob.toISOString().split('T')[0]);

//     if (image) {
//       formData.append('image', {
//         uri: image,
//         name: 'profile_image.jpg',
//         type: 'image/jpeg',
//       });
//     }

//     try {
//       const response = await axios.post(
//         'http://10.0.2.2:8083/user/create/registrations',
//         formData,
//         {headers: {'Content-Type': 'multipart/form-data'}},
//       );

//       if (response.status === 200) {
//         console.log('Response data:', response.data);

//         // Directly access the string message from response.data
//         const message = response.data; // Assuming this is a string
//         console.log('Full response message:', message);

//         // Use a regular expression to extract the ID
//         const match = message.match(/ID: (\d+)/);
//         const extractedId = match ? match[1] : null; // Extract the ID from the match

//         console.log('Extracted ID:', extractedId); // Log the extracted ID

//         if (extractedId) {
//           setProfileId(extractedId); // Setting profile ID here
//           Alert.alert(
//             'Success',
//             `Profile created successfully! ID: ${extractedId}`,
//           );
//         } else {
//           Alert.alert('Error', 'Failed to extract profile ID.');
//         }
//       } else {
//         Alert.alert('Error', 'Profile create failed.');
//       }
//     } catch (error) {
//       Alert.alert(
//         'Error',
//         error.response?.data?.message || 'Failed to create profile!',
//       );
//       console.error('Error create profile:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       if (profileId) {
//         try {
//           const response = await axios.get(
//             `http://10.0.2.2:8083/user/get/user_id/${profileId}`,
//           );
//           console.log('Fetched profile data:', response.data);
//         } catch (error) {
//           console.error('Error fetching profile data:', error);
//         }
//       }
//     };
//     fetchProfileData();
//   }, [profileId]);

//   const onDateChange = (_event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) setDob(selectedDate);
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Your Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Your Phone"
//         value={phno}
//         onChangeText={setPhno}
//         keyboardType="phone-pad"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Your Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />
//       <TouchableOpacity
//         onPress={() => setShowDatePicker(true)}
//         style={styles.input}>
//         <Text style={{color: dob ? 'black' : 'grey'}}>
//           {dob ? dob.toLocaleDateString() : 'Select Your Date of Birth'}
//         </Text>
//       </TouchableOpacity>
//       {showDatePicker && (
//         <DateTimePicker
//           value={dob}
//           mode="date"
//           display="default"
//           onChange={onDateChange}
//         />
//       )}
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Your Address"
//         value={address}
//         onChangeText={setAddress}
//       />
//       <Picker
//         selectedValue={gender}
//         style={styles.picker}
//         onValueChange={setGender}>
//         <Picker.Item label="Select Gender" value="" />
//         <Picker.Item label="Male" value="male" />
//         <Picker.Item label="Female" value="female" />
//         <Picker.Item label="Other" value="other" />
//       </Picker>
//       <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
//         <Icon name="photo-camera" size={24} color="grey" />
//         <Text style={styles.imagePickerText}>
//           {image ? 'Change Image' : 'Select Image'}
//         </Text>
//       </TouchableOpacity>
//       {image && <Image source={{uri: image}} style={styles.selectedImage} />}
//       <TouchableOpacity
//         onPress={submitProfile}
//         style={styles.submitButton}
//         disabled={!name || !phno || !email || !address || !gender || loading}>
//         <Text style={styles.submitButtonText}>
//           {loading ? 'Submitting...' : 'Submit'}
//         </Text>
//       </TouchableOpacity>
    
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fbfdfd',
//   },
//   input: {
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     marginBottom: 15,
//     width: '100%',
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//   },
//   imagePicker: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//     marginBottom: 15,
//   },
//   imagePickerText: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: 'grey',
//   },
//   selectedImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   submitButton: {
//     backgroundColor: '#d97b29',
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   submitButtonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

// export default EditProfile;




import React, { useState, useEffect } from 'react';
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
import { Picker } from '@react-native-picker/picker';

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
  const [uid] = useState();
  const [profileId, setProfileId] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = () => {
    const options = { mediaType: 'photo', quality: 1 };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'Image selection was cancelled');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const validateFields = () => {
    if (!name || !phno || !email || !address || !gender) {
      Alert.alert('Validation Error', 'All fields must be filled out.');
      return false;
    }
    if (!/^[0-9]{10}$/.test(phno)) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit phone number.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const submitProfile = async () => {
    if (!validateFields()) return;

    const formData = new FormData();
    formData.append('id', uid);
    formData.append('name', name);
    formData.append('phno', phno);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('gender', gender);
    formData.append('dob', dob.toISOString().split('T')[0]);

    if (image) {
      formData.append('image', {
        uri: image,
        name: 'profile_image.jpg',
        type: 'image/jpeg',
      });
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        'http://10.0.2.2:8083/user/create/registrations',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );

      if (response.status === 200) {
        console.log('Response data:', response.data);
        const message = response.data; // Assuming this is a string
        const match = message.match(/ID: (\d+)/);
        const extractedId = match ? match[1] : null;

        if (extractedId) {
          setProfileId(extractedId);
          Alert.alert('Success', `Profile created successfully! ID: ${extractedId}`);
        } else {
          Alert.alert('Error', 'Failed to extract profile ID.');
        }
      } else {
        Alert.alert('Error', 'Profile creation failed.');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to create profile!');
      console.error('Error creating profile:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (profileId) {
        try {
          const response = await axios.get(`http://10.0.2.2:8083/user/get/user_id/${profileId}`);
          console.log('Fetched profile data:', response.data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };
    fetchProfileData();
  }, [profileId]);

  const onDateChange = (_event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDob(selectedDate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Phone"
        value={phno}
        onChangeText={setPhno}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
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
        value={address}
        onChangeText={setAddress}
      />
      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={setGender}>
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Icon name="photo-camera" size={24} color="grey" />
        <Text style={styles.imagePickerText}>
          {image ? 'Change Image' : 'Select Image'}
        </Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
      <TouchableOpacity
        onPress={submitProfile}
        style={styles.submitButton}
        disabled={!name || !phno || !email || !address || !gender || loading}>
        <Text style={styles.submitButtonText}>
          {loading ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()} // Correctly navigate back
        style={styles.submitButton}>
        <Text style={styles.submitButtonText}>
          Close
        </Text>
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
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    width: '100%',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
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
    borderRadius: 8,
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
});

export default EditProfile;
