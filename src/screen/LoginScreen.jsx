import React, {useState} from 'react';
import {
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
const SignupScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleSignUp = () => {
    navigation.navigate('SIGNUP');
  };
  const handleOpen = () => {
    navigation.navigate('HOME');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={'arrow-back-outline'} color={color.primary} size={30} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey, </Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
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
        <TouchableOpacity>
          <Text style={styles.forgetPwdText}>Forget Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButtonWrapper}
          // onPress={handleLogin}
        >
          <Text style={styles.loginButtonText} onPress={handleOpen}>Login</Text>
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
          <Text style={styles.accountText}>Don't have an account?</Text>
          <Text style={styles.signUpText} onPress={handleSignUp}>
            Sign Up
          </Text>
        </View>
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
