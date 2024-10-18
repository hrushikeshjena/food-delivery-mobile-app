import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {color} from '../utils/color';
import {fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import WarningMessage from '../components/WarningMsg';
import {translations} from '../utils/languageWrite';
import auth from '@react-native-firebase/auth';

const LoginAdmin = () => {
  const [selectedLang, setSelectedLang] = useState(0);
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  // const handleSignUp = () => {
  //   navigation.navigate('SIGNUP');
  // };

  const handleLogin = async () => {
    if (validateInputs()) {
      setLoading(true);
      try {
        await auth().signInWithEmailAndPassword(email, password);
        navigation.navigate('ADMINDASHBOARD');
      } catch (error) {
        Alert.alert('Login Failed', error.message);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Invalid Input', 'Please enter valid email and password.');
    }
  };

  const validateInputs = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email) && password.length >= 6;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name="arrow-back-outline" color={color.primary} size={28} />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.headingText}>
          {translations[selectedLang]?.English || translations[0].English}
        </Text>
        <Text style={styles.headingText}>Welcome Back</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" color={color.secondary} size={24} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email address"
            placeholderTextColor='#AEB5BB'
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <SimpleLineIcons name="lock" color={color.secondary} size={24} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor='#AEB5BB'
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
            <Ionicons
              name={secureEntry ? 'eye' : 'eye-off'}
              color={color.secondary}
              size={20}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleLogin}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <ActivityIndicator color={color.white} /> // Show loading spinner
          ) : (
            <Text style={styles.loginButtonText}>Login as Administrator</Text>
          )}
        </TouchableOpacity>
      </View>

      <WarningMessage isAdmin={true} />
    </View>
  );
};

export default LoginAdmin;

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
