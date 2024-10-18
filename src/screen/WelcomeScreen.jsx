import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import WarningMessage from '../components/WarningMsg';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleAdmin = () => {
    navigation.navigate('ADMIN');
  };
  const handleUser = () => {
    navigation.navigate('USER');
  };
  return (
    <View style={styles.container}>
      <View></View>
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      <Image
        source={require('../assets/imgdfghj.png')}
        style={styles.bannerImage}
      />
      <Text style={styles.title}>Apna Desi Kitchen</Text>
      <Text style={styles.subTitle1}>Enjoy Delicious Indian Street Food</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleUser}>
          <Text style={styles.loginButtonText}>User Login</Text>
        </TouchableOpacity>
      </View>
      <WarningMessage isAdmin={false} />
      <TouchableOpacity
        style={styles.adminLoginButtonWrapper}
        onPress={handleAdmin}>
        <Text style={styles.loginButtonText}>Admin</Text>
      </TouchableOpacity>
      {/* <WarningMessage isAdmin={true} /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  logo: {
    height: 140,
    width: 100,
    marginVertical: 10,
  },
  bannerImage: {
    height: 250,
    width: 435,
  },
  title: {
    fontSize: 40,
    fontFamily: fonts.SemiBold,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: '#d97b29',
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: '#fff',
  },
  subTitle1: {
    fontSize: 18,
    fontFamily: fonts.Medium,
    paddingHorizontal: 0,
    textAlign: 'center',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#d97b29',
    width: '85%',
    height: 60,
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
    padding:1,
    backgroundColor: '#d97b29',
    borderRadius: 98,
    marginTop: 50,
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
