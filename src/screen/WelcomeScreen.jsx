import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('LOGIN');
  };
  const handleSignUp = () => {
    navigation.navigate('SIGNUP');
  };
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Image source={require('../assets/man.png')} style={styles.bannerImage} />
      <Text style={styles.title}>Lorem Ipsem</Text>
      <Text style={styles.subTitle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, a.
        Officiis eos dicta provident. Officiis eos dicta provident Officiis eos
        dicta provident
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButtonWrapper} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  logo: {
    height: 40,
    width: 140,
    marginVertical: 20,
  },
  bannerImage: {
    height: 250,
    width: 231,
  },
  title: {
    fontSize: 40,
    fontFamily: fonts.SemiBold,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: Colors.primary,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 18,
    fontFamily: fonts.Medium,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: Colors.secondary,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
    width: '85%',
    height: 60,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    backgroundColor: Colors.primary,
    borderRadius: 98,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  signupButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRadius: 98,
  },
  signupButtonText: {
    color: Colors.secondary,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
});
