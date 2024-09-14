import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {color} from '../utils/color';
import {fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate('LOGIN');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={'arrow-back-outline'} color={color.primary} size={30} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Let's Get</Text>
        <Text style={styles.headingText}>Started</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={'mail-outline'} color={color.secondary} size={30} />

          <TextInput
            style={styles.textInput}
            placeholder="Enter your email address"
            placeholderTextColor={color.secondary}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons
            name={'screen-smartphone'}
            color={color.secondary}
            size={30}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Enter your phone number"
            placeholderTextColor={color.secondary}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={'lock'} color={color.secondary} size={30} />

          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={color.secondary}
            secureTextEntry={secureEntry}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry(!secureEntry);
            }}>
            <SimpleLineIcons name={'eye'} color={color.secondary} size={20} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButtonWrapper}
          // onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>
        {/* <Text style={styles.continueText}>or Continue With</Text> */}

        {/* <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require('../assets/google.png')}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity> */}
        <View style={styles.signUpContainer}>
          <Text style={styles.accountText}>Already have an account!</Text>
          <Text style={styles.signUpText} onPress={handleLogin}>
            Login
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: color.gray,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: color.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: color.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  forgetPwdText: {
    color: color.primary,
    textAlign: 'right',
    fontFamily: fonts.SemiBold,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: color.primary,
    borderRadius: 100,
    marginTop: 20,
  },
  loginButtonText: {
    color: color.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    padding: 10,
  },
  continueText: {
    color: color.primary,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: fonts.Regular,
    fontSize: 14,
  },
  googleButtonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: color.primary,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    color: color.primary,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: color.primary,
    fontFamily: fonts.Regular,
  },
  signUpText: {
    color: color.primary,
    fontFamily: fonts.Bold,
  },
});

// import React, { useState } from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Alert,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import { color } from '../utils/color';
// import { fonts } from '../utils/fonts';
// import { useNavigation } from '@react-navigation/native';
// import { auth } from '../firebase'; // import Firebase auth

// const SignUpScreen = () => {
//   const navigation = useNavigation();
//   const [secureEntry, setSecureEntry] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [verificationId, setVerificationId] = useState(null);
//   const [verificationCode, setVerificationCode] = useState('');

//   const handleGoBack = () => {
//     navigation.goBack();
//   };

//   const handleLogin = () => {
//     navigation.navigate('LOGIN');
//   };

//   const handleSignUpEmail = () => {
//     auth
//       .createUserWithEmailAndPassword(email, password)
//       .then((userCredential) => {
//         Alert.alert('User created successfully!');
//         console.log('User: ', userCredential.user);
//       })
//       .catch((error) => {
//         Alert.alert('Error: ', error.message);
//       });
//   };

//   const sendVerificationCode = () => {
//     const phoneProvider = new firebase.auth.PhoneAuthProvider();
//     phoneProvider
//       .verifyPhoneNumber(phoneNumber, null)
//       .then(setVerificationId)
//       .catch((error) => Alert.alert('Error: ', error.message));
//   };

//   const verifyPhoneNumber = () => {
//     const credential = firebase.auth.PhoneAuthProvider.credential(
//       verificationId,
//       verificationCode
//     );
//     auth
//       .signInWithCredential(credential)
//       .then(() => {
//         Alert.alert('Phone number verified successfully!');
//       })
//       .catch((error) => {
//         Alert.alert('Error: ', error.message);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
//         <Ionicons name={'arrow-back-outline'} color={color.primary} size={30} />
//       </TouchableOpacity>
//       <View style={styles.textContainer}>
//         <Text style={styles.headingText}>Let's Get</Text>
//         <Text style={styles.headingText}>Started</Text>
//       </View>

//       <View style={styles.formContainer}>
//         {/* Email input */}
//         <View style={styles.inputContainer}>
//           <Ionicons name={'mail-outline'} color={color.secondary} size={30} />
//           <TextInput
//             style={styles.textInput}
//             placeholder="Enter your email address"
//             placeholderTextColor={color.secondary}
//             keyboardType="email-address"
//             value={email}
//             onChangeText={setEmail}
//           />
//         </View>

//         {/* Phone number input */}
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons
//             name={'screen-smartphone'}
//             color={color.secondary}
//             size={30}
//           />
//           <TextInput
//             style={styles.textInput}
//             placeholder="Enter your phone number"
//             placeholderTextColor={color.secondary}
//             keyboardType="phone-pad"
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//           />
//         </View>

//         {/* Verification code input (shown after sending code) */}
//         {verificationId && (
//           <View style={styles.inputContainer}>
//             <SimpleLineIcons name={'lock'} color={color.secondary} size={30} />
//             <TextInput
//               style={styles.textInput}
//               placeholder="Enter verification code"
//               placeholderTextColor={color.secondary}
//               keyboardType="number-pad"
//               value={verificationCode}
//               onChangeText={setVerificationCode}
//             />
//           </View>
//         )}

//         {/* Password input */}
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name={'lock'} color={color.secondary} size={30} />
//           <TextInput
//             style={styles.textInput}
//             placeholder="Enter your password"
//             placeholderTextColor={color.secondary}
//             secureTextEntry={secureEntry}
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TouchableOpacity
//             onPress={() => {
//               setSecureEntry(!secureEntry);
//             }}
//           >
//             <SimpleLineIcons name={'eye'} color={color.secondary} size={20} />
//           </TouchableOpacity>
//         </View>

//         {/* Sign Up Buttons */}
//         <TouchableOpacity
//           style={styles.loginButtonWrapper}
//           onPress={handleSignUpEmail}
//         >
//           <Text style={styles.loginButtonText}>Sign Up with Email</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.loginButtonWrapper}
//           onPress={sendVerificationCode}
//         >
//           <Text style={styles.loginButtonText}>Send Code to Phone</Text>
//         </TouchableOpacity>

//         {verificationId && (
//           <TouchableOpacity
//             style={styles.loginButtonWrapper}
//             onPress={verifyPhoneNumber}
//           >
//             <Text style={styles.loginButtonText}>Verify Phone Number</Text>
//           </TouchableOpacity>
//         )}

//         <View style={styles.signUpContainer}>
//           <Text style={styles.accountText}>Already have an account!</Text>
//           <Text style={styles.signUpText} onPress={handleLogin}>
//             Login
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default SignUpScreen;
