// import React, {useState} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import {color} from '../utils/color';
// import {fonts} from '../utils/fonts';
// import {useNavigation} from '@react-navigation/native';
// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const [secureEntry, setSecureEntry] = useState(true);
//   const handleGoBack = () => {
//     navigation.goBack();
//   };

//   const handleLogin = () => {
//     navigation.navigate('LOGIN');
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
//         <View style={styles.inputContainer}>
//           <Ionicons name={'mail-outline'} color={color.secondary} size={30} />

//           <TextInput
//             style={styles.textInput}
//             placeholder="Enter your email address"
//             placeholderTextColor={color.secondary}
//             keyboardType="email-address"
//           />
//         </View>
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
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name={'lock'} color={color.secondary} size={30} />

//           <TextInput
//             style={styles.textInput}
//             placeholder="Enter your password"
//             placeholderTextColor={color.secondary}
//             secureTextEntry={secureEntry}
//           />
//           <TouchableOpacity
//             onPress={() => {
//               setSecureEntry(!secureEntry);
//             }}>
//             <SimpleLineIcons name={'eye'} color={color.secondary} size={20} />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//           style={styles.loginButtonWrapper}
//           // onPress={handleLogin}
//         >
//           <Text style={styles.loginButtonText}>Sign Up</Text>
//         </TouchableOpacity>
//         {/* <Text style={styles.continueText}>or Continue With</Text> */}

//         {/* <TouchableOpacity style={styles.googleButtonContainer}>
//           <Image
//             source={require('../assets/google.png')}
//             style={styles.googleImage}
//           />
//           <Text style={styles.googleText}>Google</Text>
//         </TouchableOpacity> */}
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

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: color.white,
//     padding: 20,
//   },
//   backButtonWrapper: {
//     height: 40,
//     width: 40,
//     backgroundColor: color.gray,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textContainer: {
//     marginVertical: 20,
//   },
//   headingText: {
//     fontSize: 32,
//     color: color.primary,
//     fontFamily: fonts.SemiBold,
//   },
//   formContainer: {
//     marginTop: 10,
//   },
//   inputContainer: {
//     borderWidth: 1,
//     borderColor: color.secondary,
//     borderRadius: 100,
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 2,
//     marginVertical: 10,
//   },
//   textInput: {
//     flex: 1,
//     paddingHorizontal: 10,
//     fontFamily: fonts.Light,
//   },
//   forgetPwdText: {
//     color: color.primary,
//     textAlign: 'right',
//     fontFamily: fonts.SemiBold,
//     marginVertical: 10,
//   },
//   loginButtonWrapper: {
//     backgroundColor: color.primary,
//     borderRadius: 100,
//     marginTop: 20,
//   },
//   loginButtonText: {
//     color: color.white,
//     fontSize: 20,
//     fontFamily: fonts.SemiBold,
//     textAlign: 'center',
//     padding: 10,
//   },
//   continueText: {
//     color: color.primary,
//     textAlign: 'center',
//     marginVertical: 10,
//     fontFamily: fonts.Regular,
//     fontSize: 14,
//   },
//   googleButtonContainer: {
//     flexDirection: 'row',
//     borderWidth: 2,
//     borderColor: color.primary,
//     borderRadius: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 10,
//     gap: 10,
//   },
//   googleImage: {
//     height: 20,
//     width: 20,
//   },
//   googleText: {
//     color: color.primary,
//     fontSize: 20,
//     fontFamily: fonts.SemiBold,
//     textAlign: 'center',
//   },
//   signUpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 20,
//     gap: 5,
//   },
//   accountText: {
//     color: color.primary,
//     fontFamily: fonts.Regular,
//   },
//   signUpText: {
//     color: color.primary,
//     fontFamily: fonts.Bold,
//   },
// });



import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert, // For feedback
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {color} from '../utils/color';
import {fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import Languages from '../utils/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {translations} from '../utils/languageWrite';

const SignupScreen = () => {
  const [selectedLang, setSelectedLang] = useState(0);
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState(''); // Added state for email
  const [password, setPassword] = useState(''); // Added state for password
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignUp = () => {
    navigation.navigate('SIGNUP');
  };

  const handleOpen = () => {
    // Perform validation before navigating
    if (validateInputs()) {
      navigation.navigate('HOME');
    } else {
      Alert.alert('Invalid Input', 'Please enter valid email and password.');
    }
  };

  const validateInputs = () => {
    // Basic email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return false;
    }
    // Check password length
    if (password.length < 6) {
      return false;
    }
    return true;
  };

  const saveSelectedLang = async index => {
    try {
      await AsyncStorage.setItem('LANG', index.toString());
      setSelectedLang(index); // Update the selected language in state
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={'arrow-back-outline'} color={color.primary} size={28} />
      </TouchableOpacity>

      {/* Welcome text */}
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>
          {selectedLang == 0
            ? translations[0].English
            : selectedLang == 1
            ? translations[0].Hindi
            : null}
        </Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        {/* Email input */}
        <View style={styles.inputContainer}>
          <Ionicons name={'mail-outline'} color={color.secondary} size={24} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email address"
            placeholderTextColor={color.secondary}
            keyboardType="email-address"
            value={email} // Bind state
            onChangeText={setEmail} // Update state
          />
        </View>

        {/* Password input */}
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={'lock'} color={color.secondary} size={24} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={color.secondary}
            secureTextEntry={secureEntry}
            value={password} // Bind state
            onChangeText={setPassword} // Update state
          />
          <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
            <Ionicons
              name={secureEntry ? 'eye' : 'eye-off'}
              color={color.secondary}
              size={20}
            />
          </TouchableOpacity>
        </View>

        {/* Forget password */}
        <TouchableOpacity>
          <Text style={styles.forgetPwdText}>Forget Password?</Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleOpen}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Sign Up */}
        <View style={styles.signUpContainer}>
          <Text style={styles.accountText}>Don't have an account?</Text>
          <Text style={styles.signUpText} onPress={handleSignUp}>
            Sign Up
          </Text>
        </View>

        {/* Language Selection */}
        <TouchableOpacity
          style={styles.selectLanguageBtn}
          onPress={() => setLangModalVisible(!langModalVisible)}>
          <Text style={styles.selectLanguageText}>Select Languages</Text>
        </TouchableOpacity>

        <Languages
          langModalVisible={langModalVisible}
          setLangModalVisible={setLangModalVisible}
          setLangIndex={setSelectedLang} // Ensure this function is passed correctly
        />
      </View>
    </View>
  );
};

export default SignupScreen;

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
    color: color.primary,
    fontFamily: fonts.SemiBold,
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
    color: color.textPrimary,
    fontFamily: fonts.Light,
  },
  forgetPwdText: {
    color: color.primary,
    textAlign: 'right',
    marginVertical: 10,
    fontFamily: fonts.SemiBold,
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
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  accountText: {
    color: color.textSecondary,
    fontFamily: fonts.Regular,
  },
  signUpText: {
    color: color.primary,
    fontFamily: fonts.Bold,
    marginLeft: 5,
  },
  selectLanguageBtn: {
    width: '60%',
    height: 50,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  selectLanguageText: {
    color: color.primary,
    fontFamily: fonts.Medium,
  },
});
