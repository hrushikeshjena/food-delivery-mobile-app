/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Languages from '../utils/languages';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState('Your Name');
  const [email, setEmail] = useState('your-email@example.com');
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState(0);
  const userId = 1; // Replace with actual user ID as necessary
  const IMAGE_API_URL = id =>
    `http://10.0.2.2:8083/user/registrations_photo/${id}`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:8083/user/get/user_id/${userId}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setName(data.name || 'Your Name');
        setEmail(data.email || 'your-email@example.com');
        setImageUri(data.image); // Assuming 'image' holds the URL
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditProfile = () => navigation.navigate('EditProfile');
  const handleYourOrder = () => navigation.navigate('YourOrder');

  const logout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'OK',
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            navigation.reset({index: 0, routes: [{name: 'WELCOME'}]});
          } catch (error) {
            console.error('Error logging out:', error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.profileName}>Hey, {name} !</Text>
            <Image
              style={styles.profileImage}
              source={{uri: IMAGE_API_URL(userId)}}
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.optionsContainer}>
            {[
  
              {label: 'Personal Information', icon: 'person', action: handleEditProfile},
              {label: 'Delivery Address', icon: 'person', action: handleEditProfile},
              {
                label: 'Languages',
                icon: 'language',
                action: () => setLangModalVisible(!langModalVisible),
              },
              
              {label: 'Legal, data and privacy', icon: 'info', action: () => {}},
              {
                label: 'Delete Your Account',
                icon: 'delete',
                action: handleYourOrder,
              },
            ].map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionCard}
                onPress={option.action}>
                <View style={styles.option}>
                  <Icon name={option.icon} size={20} color="#D97B29" />
                  <Text style={styles.optionText}>{option.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Languages
            langModalVisible={langModalVisible}
            setLangModalVisible={setLangModalVisible}
            setLangIndex={setSelectedLang}
          />

          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F9FAFB'},
  profileHeader: {
    padding: 25,
    backgroundColor: 'green',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  profileImage: {
    width: 100, // Set desired width
    height: 100, // Set desired height
    borderRadius: 50, // Make it circular
    marginBottom: 10, // Add spacing below the image
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5, // Add spacing below the name
    color: '#fff',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666', // Lighter color for the email
  },
  backButton: {position: 'absolute', left: 15, top: 15},
  imageContainer: {marginTop: 10, borderRadius: 55, overflow: 'hidden'},

  optionsContainer: {paddingHorizontal: 15},
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 1,
    marginVertical: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  option: {flexDirection: 'row', alignItems: 'center'},
  optionText: {fontSize: 18, marginLeft: 15, color: '#4A5568'},
  logoutButton: {
    backgroundColor: '#D97B29',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 40,
    alignItems: 'center',
    borderRadius: 10,
  },
  logoutButtonText: {color: '#FFF', fontSize: 18, fontWeight: '600'},
});
