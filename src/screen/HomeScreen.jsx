import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from '../components/Carousel';
import Category from '../components/Category';
import BigCard from '../components/BigCard';
import ScrollingItem from '../components/ScrollingItems';
import {useNavigation} from '@react-navigation/native';

const GOOGLE_MAPS_API_KEY = 'AIzaSyD0lwp2aClBzdv3kE_xqIHUGxjcwjQXxSk';

export default function HomeScreen() {
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Fetching your location...',
  );

  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }
    getCurrentLocation();
  }, []);

  // Request Location Permission for Android devices
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Location Permission Denied',
            'Please enable location permissions to continue.',
            [{text: 'OK'}],
            {cancelable: false},
          );
        }
      } catch (err) {
        console.warn('Permission Error: ', err);
      }
    }
  };

  // Fetch the Address from Latitude and Longitude
  const getAddressFromCoordinates = async (latitude, longitude) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`,
      );
      const formattedAddress =
        response.data.results[0]?.formatted_address || 'No address found';
      setAddress(formattedAddress);
    } catch (error) {
      setAddress('Error fetching address');
      console.error('Error fetching address: ', error);
    } finally {
      setLoading(false);
    }
  };

  // Get Current Location using Geolocation
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setMarker({latitude, longitude});
        getAddressFromCoordinates(latitude, longitude);
      },
      error => Alert.alert('Error', error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  // Navigate to Profile Screen
  const openProfile = () => {
    navigation.navigate('PROFILE');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Location Display */}
      <View style={styles.header}>
        <Ionicons name="location-outline" size={24} color="#D97B29" />
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Deliver To</Text>
          <Text style={styles.addressText}>{displayCurrentAddress}</Text>
        </View>
        <Pressable style={styles.button} onPress={openProfile}>
          <Text style={styles.buttonText}>H</Text>
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <Ionicons name="search" size={24} color="#D97B29" />
      </View>

      {/* Main Content: Carousel, Categories, Big Cards, and Scrolling Items */}
      <Carousel />
      <Category />
      <BigCard />
      <ScrollingItem />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
  },
  addressContainer: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  addressText: {
    color: 'gray',
    fontSize: 15,
    marginTop: 3,
  },
  button: {
    backgroundColor: '#d97b29',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#c0c0c0',
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 11,
    marginTop: 10,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
  },
});
