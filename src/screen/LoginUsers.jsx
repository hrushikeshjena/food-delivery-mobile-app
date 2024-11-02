import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {color} from '../utils/color';
import {fonts} from '../utils/fonts';
import WarningMessage from '../components/WarningMsg';

const LoginUser = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleHome = () => {
    navigation.navigate('MAINHOME');
  };
  // Function to send OTP
  const signInWithPhoneNumber = async phone => {
    setLoading(true);
    setErrorMessage('');

    try {
      // Ensure phone number has the correct format
      if (!phone.startsWith('+')) {
        phone = '+91' + phone; // Example for Indian numbers; adjust as per your need
      }

      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
      Alert.alert(
        'OTP Sent',
        'Please check your phone for the verification code.',
      );
    } catch (error) {
      console.log('Error during signInWithPhoneNumber: ', error);
      setErrorMessage(
        'Failed to send verification code. Please check the phone number.',
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to confirm the OTP
  const confirmCode = async () => {
    setLoading(true);
    try {
      await confirm.confirm(code);
      Alert.alert('Success', 'User login successful');
      navigation.replace('UserDashboard');
    } catch (error) {
      console.log('Error during OTP confirmation: ', error);
      setErrorMessage('Invalid OTP code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name="arrow-back-outline" color={color.primary} size={28} />
      </TouchableOpacity>

      {/* Card with Image */}
      <View style={styles.cardContainer}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
          }} // Replace with your image URL
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Welcome text */}
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey</Text>
        <Text style={styles.headingText}>Welcome!</Text>
      </View>

      {/* Phone login form */}
      {!confirm ? (
        <View style={styles.formContainer}>
          {/* Phone number input */}
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" color={color.secondary} size={24} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your phone number"
              placeholderTextColor='#AEB5BB'
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <TouchableOpacity
            style={styles.loginButtonWrapper}
            // onPress={() => signInWithPhoneNumber(phoneNumber)}
            onPress={handleHome}

            // disabled={loading}
            >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="small" color={color.primary} />}
          {errorMessage ? (
            <Text style={{color: 'red', paddingVertical: 20}}>
              {errorMessage}
            </Text>
          ) : null}
        </View>
      ) : (
        <View style={styles.formContainer}>
          {/* OTP input */}
          <View style={styles.inputContainer}>
            <Ionicons name="key-outline" color={color.secondary} size={24} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter OTP"
              placeholderTextColor={color.secondary}
              keyboardType="numeric"
              value={code}
              onChangeText={setCode}
            />
          </View>

          <TouchableOpacity
            style={styles.loginButtonWrapper}
            onPress={confirmCode}
            disabled={loading}>
            <Text style={styles.loginButtonText}>Confirm OTP</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="small" color={color.primary} />}
          {errorMessage ? (
            <Text style={{color: 'red'}}>{errorMessage}</Text>
          ) : null}
        </View>
      )}
      {/* <WarningMessage isAdmin={false} /> */}
    </View>
  );
};

export default LoginUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: color.lightGray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: '#45484A',
    fontFamily: fonts.SemiBold,
  },
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: 200, // Adjust as necessary
  },
  formContainer: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.secondary,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#000',
    fontFamily: fonts.Light,
  },
  loginButtonWrapper: {
    backgroundColor: color.primary,
    borderRadius: 30,
    marginTop: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  loginButtonText: {
    color: color.white,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
  },
});

// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Alert,
//   ActivityIndicator,
//   Image,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useNavigation} from '@react-navigation/native';
// import auth from '@react-native-firebase/auth';
// import {color} from '../utils/color';
// import {fonts} from '../utils/fonts';

// const LoginUser = () => {
//   const [phoneNumber, setPhoneNumber] = useState('+91 7789999500');
//   const [confirm, setConfirm] = useState(null);
//   const [code, setCode] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigation = useNavigation();

//   const handleGoBack = () => {
//     navigation.goBack();
//   };

//   const handleHome = () => {
//     navigation.navigate('MAINHOME');
//   };

//   // Function to send OTP
//   const signInWithPhoneNumber = async phone => {
//     setLoading(true);
//     setErrorMessage('');

//     try {
//       if (!phone.startsWith('+')) {
//         phone = '+91' + phone; // Example for Indian numbers
//       }

//       const confirmation = await auth().signInWithPhoneNumber(phone);
//       setConfirm(confirmation);
//       Alert.alert(
//         'OTP Sent',
//         'Please check your phone for the verification code.',
//       );
//     } catch (error) {
//       console.log('Error during signInWithPhoneNumber: ', error);
//       setErrorMessage(
//         'Failed to send verification code. Please check the phone number.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to confirm the OTP
//   const confirmCode = async () => {
//     setLoading(true);
//     try {
//       const userCredential = await confirm.confirm(code); // Confirm the OTP
//       const user = userCredential.user; // Get the user object

//       // Get the UID of the signed-in user
//       const uid = user.uid;
//       Alert.alert('Success', `User login successful. Your UID is: ${uid}`);
//       console.log('User UID:', uid); // Log the UID to the console

//       // Navigate to the User Dashboard
//       navigation.replace('UserDashboard');
//     } catch (error) {
//       console.log('Error during OTP confirmation: ', error);
//       setErrorMessage('Invalid OTP code. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back button */}
//       <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
//         <Ionicons name="arrow-back-outline" color={color.primary} size={28} />
//       </TouchableOpacity>

//       {/* Card with Image */}
//       <View style={styles.cardContainer}>
//         <Image
//           source={{
//             uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
//           }} // Replace with your image URL
//           style={styles.image}
//           resizeMode="cover"
//         />
//       </View>

//       {/* Welcome text */}
//       <View style={styles.textContainer}>
//         <Text style={styles.headingText}>Hey</Text>
//         <Text style={styles.headingText}>Welcome!</Text>
//       </View>

//       {/* Phone login form */}
//       {!confirm ? (
//         <View style={styles.formContainer}>
//           {/* Phone number input */}
//           <View style={styles.inputContainer}>
//             <Ionicons name="call-outline" color={color.secondary} size={24} />
//             <TextInput
//               style={styles.textInput}
//               placeholder="Enter your phone number"
//               placeholderTextColor="#AEB5BB"
//               keyboardType="phone-pad"
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//             />
//           </View>

//           <TouchableOpacity
//             style={styles.loginButtonWrapper}
//             onPress={() => signInWithPhoneNumber(phoneNumber)}
//             disabled={loading}>
//             <Text style={styles.loginButtonText}>Login</Text>
//           </TouchableOpacity>

//           {loading && <ActivityIndicator size="small" color={color.primary} />}
//           {errorMessage ? (
//             <Text style={{color: 'red', paddingVertical: 20}}>
//               {errorMessage}
//             </Text>
//           ) : null}
//         </View>
//       ) : (
//         <View style={styles.formContainer}>
//           {/* OTP input */}
//           <View style={styles.inputContainer}>
//             <Ionicons name="key-outline" color={color.secondary} size={24} />
//             <TextInput
//               style={styles.textInput}
//               placeholder="Enter OTP"
//               placeholderTextColor={color.secondary}
//               keyboardType="numeric"
//               value={code}
//               onChangeText={setCode}
//             />
//           </View>

//           <TouchableOpacity
//             style={styles.loginButtonWrapper}
//             onPress={confirmCode}
//             disabled={loading}>
//             <Text style={styles.loginButtonText}>Confirm OTP</Text>
//           </TouchableOpacity>

//           {loading && <ActivityIndicator size="small" color={color.primary} />}
//           {errorMessage ? (
//             <Text style={{color: 'red'}}>{errorMessage}</Text>
//           ) : null}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: color.white,
//     padding: 20,
//   },
//   backButtonWrapper: {
//     height: 40,
//     width: 40,
//     backgroundColor: color.lightGray,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textContainer: {
//     marginVertical: 20,
//   },
//   headingText: {
//     fontSize: 32,
//     color: '#45484A',
//     fontFamily: fonts.SemiBold,
//   },
//   cardContainer: {
//     borderRadius: 10,
//     overflow: 'hidden',
//     elevation: 3, // Android shadow
//     shadowColor: '#000', // iOS shadow
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     marginVertical: 20,
//   },
//   image: {
//     width: '100%',
//     height: 200, // Adjust as necessary
//   },
//   formContainer: {
//     marginTop: 10,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: color.secondary,
//     borderRadius: 30,
//     paddingHorizontal: 15,
//     paddingVertical: 5,
//     marginVertical: 10,
//   },
//   textInput: {
//     flex: 1,
//     paddingLeft: 10,
//     color: '#000',
//     fontFamily: fonts.Light,
//   },
//   loginButtonWrapper: {
//     backgroundColor: color.primary,
//     borderRadius: 30,
//     marginTop: 20,
//     paddingVertical: 12,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 4,
//   },
//   loginButtonText: {
//     color: color.white,
//     fontSize: 18,
//     fontFamily: fonts.SemiBold,
//     textAlign: 'center',
//   },
// });
// export default LoginUser;
