
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


// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Alert, // For feedback
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import {color} from '../utils/color';
// import {fonts} from '../utils/fonts';
// import {useNavigation} from '@react-navigation/native';
// import Languages from '../utils/languages';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {translations} from '../utils/languageWrite';

// const SignupScreen = () => {
//   const [selectedLang, setSelectedLang] = useState(0);
//   const [langModalVisible, setLangModalVisible] = useState(false);
//   const [secureEntry, setSecureEntry] = useState(true);
//   const [email, setEmail] = useState(''); // Added state for email
//   const [password, setPassword] = useState(''); // Added state for password
//   const navigation = useNavigation();

//   const handleGoBack = () => {
//     navigation.goBack();
//   };

//   const handleSignUp = () => {
//     navigation.navigate('SIGNUP');
//   };

//   const handleOpen = () => {
//     // Perform validation before navigating
//     if (validateInputs()) {
//       navigation.navigate('HOME');
//     } else {
//       Alert.alert('Invalid Input', 'Please enter valid email and password.');
//     }
//   };

//   const validateInputs = () => {
//     // Basic email validation
//     const emailRegex = /\S+@\S+\.\S+/;
//     if (!emailRegex.test(email)) {
//       return false;
//     }
//     // Check password length
//     if (password.length < 6) {
//       return false;
//     }
//     return true;
//   };

//   const saveSelectedLang = async index => {
//     try {
//       await AsyncStorage.setItem('LANG', index.toString());
//       setSelectedLang(index); // Update the selected language in state
//     } catch (error) {
//       console.error('Error saving language:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back button */}
//       <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
//         <Ionicons name={'arrow-back-outline'} color={color.primary} size={28} />
//       </TouchableOpacity>

//       {/* Welcome text */}
//       <View style={styles.textContainer}>
//         <Text style={styles.headingText}>
//           {selectedLang == 0
//             ? translations[0].English
//             : selectedLang == 1
//             ? translations[0].Hindi
//             : null}
//         </Text>
//         <Text style={styles.headingText}>Welcome</Text>
//         <Text style={styles.headingText}>Back</Text>
//       </View>

//       {/* Form */}
//       <View style={styles.formContainer}>
//         {/* Email input */}
//         <View style={styles.inputContainer}>
//           <Ionicons name={'mail-outline'} color={color.secondary} size={24} />
//           <TextInput
//             style={styles.textInput}
//             placeholder="Enter your email address"
//             placeholderTextColor={color.secondary}
//             keyboardType="email-address"
//             value={email} // Bind state
//             onChangeText={setEmail} // Update state
//           />
//         </View>

//         {/* Password input */}
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name={'lock'} color={color.secondary} size={24} />
//           <TextInput
//             style={styles.textInput}
//             placeholder="Enter your password"
//             placeholderTextColor={color.secondary}
//             secureTextEntry={secureEntry}
//             value={password} // Bind state
//             onChangeText={setPassword} // Update state
//           />
//           <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
//             <Ionicons
//               name={secureEntry ? 'eye' : 'eye-off'}
//               color={color.secondary}
//               size={20}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Forget password */}
//         <TouchableOpacity>
//           <Text style={styles.forgetPwdText}>Forget Password?</Text>
//         </TouchableOpacity>

//         {/* Login button */}
//         <TouchableOpacity
//           style={styles.loginButtonWrapper}
//           onPress={handleOpen}>
//           <Text style={styles.loginButtonText}>Login</Text>
//         </TouchableOpacity>

//         {/* Sign Up */}
//         <View style={styles.signUpContainer}>
//           <Text style={styles.accountText}>Don't have an account?</Text>
//           <Text style={styles.signUpText} onPress={handleSignUp}>
//             Sign Up
//           </Text>
//         </View>

//         {/* Language Selection */}
//         <TouchableOpacity
//           style={styles.selectLanguageBtn}
//           onPress={() => setLangModalVisible(!langModalVisible)}>
//           <Text style={styles.selectLanguageText}>Select Languages</Text>
//         </TouchableOpacity>

//         <Languages
//           langModalVisible={langModalVisible}
//           setLangModalVisible={setLangModalVisible}
//           setLangIndex={setSelectedLang} // Ensure this function is passed correctly
//         />
//       </View>
//     </View>
//   );
// };

// export default SignupScreen;

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
//     color: color.primary,
//     fontFamily: fonts.SemiBold,
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
//     color: color.textPrimary,
//     fontFamily: fonts.Light,
//   },
//   forgetPwdText: {
//     color: color.primary,
//     textAlign: 'right',
//     marginVertical: 10,
//     fontFamily: fonts.SemiBold,
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
//   signUpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   accountText: {
//     color: color.textSecondary,
//     fontFamily: fonts.Regular,
//   },
//   signUpText: {
//     color: color.primary,
//     fontFamily: fonts.Bold,
//     marginLeft: 5,
//   },
//   selectLanguageBtn: {
//     width: '60%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: color.primary,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginTop: 20,
//   },
//   selectLanguageText: {
//     color: color.primary,
//     fontFamily: fonts.Medium,
//   },
// });
