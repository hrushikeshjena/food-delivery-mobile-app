import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { fonts } from '../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import WarningMessage from '../components/WarningMsg';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleAdmin = () => {
    navigation.navigate('ADMIN');
  };

  const handleUser = () => {
    navigation.navigate('USER');
  };

  const backgroundImage = require('../assets/bgImage.png');

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
        <Image
          source={require('../assets/imgdfghj.png')}
          style={styles.bannerImage}
        />
        <Image
          source={require('../assets/Apna.png')}
          style={styles.logoImage}
        />
        <Text style={styles.subTitle1}>Enjoy Delicious Indian Street Food</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButtonWrapper}
            onPress={handleUser}>
            <Text style={styles.loginButtonText}>User Login</Text>
          </TouchableOpacity>
        </View>
        {/* <WarningMessage isAdmin={false} /> */}
        <TouchableOpacity
          style={styles.adminLoginButtonWrapper}
          onPress={handleAdmin}>
          <Text style={styles.loginButtonText}>Admin</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20, // Added padding for better layout
  },
  logo: {
    height: 140,
    width: 100,
    marginVertical: 10,
  },
  bannerImage: {
    height: 300,
    // width: '100%',
    resizeMode: 'contain',
  },
  logoImage: {
    marginTop: 10,
    height: 70,
  resizeMode: 'contain',
  },
  subTitle1: {
    fontSize: 18,
    fontFamily: fonts.Regular,
    textAlign: 'center',
    color: '#fff',
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#d97b29',
    width: '55%',
    height: 40,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#d97b29',
    borderRadius: 98,
  },
  adminLoginButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    padding: 1,
    backgroundColor: '#d97b29',
    borderRadius: 98,
    marginTop: 50,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
});
