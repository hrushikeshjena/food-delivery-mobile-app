// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Alert,
//   PermissionsAndroid,
//   Platform,
//   ScrollView,
//   Pressable,
//   TextInput,
// } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
// import axios from 'axios';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Carousel from '../components/Carousel';
// import Category from '../components/Category';
// import BigCard from '../components/BigCard';
// import ScrollingItem from '../components/ScrollingItems';
// import {useNavigation} from '@react-navigation/native';

// const GOOGLE_MAPS_API_KEY = 'AIzaSyD0lwp2aClBzdv3kE_xqIHUGxjcwjQXxSk';

// export default function HomeScreen() {
//   const [marker, setMarker] = useState(null);
//   const [address, setAddress] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
//     'Fetching your location...',
//   );

//   const navigation = useNavigation();

//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       requestLocationPermission();
//     }
//     getCurrentLocation();
//   }, []);

//   // Request Location Permission for Android devices
//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'App needs access to your location.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Alert.alert(
//             'Location Permission Denied',
//             'Please enable location permissions to continue.',
//             [{text: 'OK'}],
//             {cancelable: false},
//           );
//         }
//       } catch (err) {
//         console.warn('Permission Error: ', err);
//       }
//     }
//   };

//   // Fetch the Address from Latitude and Longitude
//   const getAddressFromCoordinates = async (latitude, longitude) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`,
//       );
//       const formattedAddress =
//         response.data.results[0]?.formatted_address || 'No address found';
//       setAddress(formattedAddress);
//     } catch (error) {
//       setAddress('Error fetching address');
//       console.error('Error fetching address: ', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get Current Location using Geolocation
//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setMarker({latitude, longitude});
//         getAddressFromCoordinates(latitude, longitude);
//       },
//       error => Alert.alert('Error', error.message),
//       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
//     );
//   };

//   // Navigate to Profile Screen
//   const openProfile = () => {
//     navigation.navigate('PROFILE');
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header with Location Display */}
//       <View style={styles.header}>
//         <Ionicons name="location-outline" size={24} color="#D97B29" />
//         <View style={styles.addressContainer}>
//           <Text style={styles.addressTitle}>Deliver To</Text>
//           <Text style={styles.addressText}>{displayCurrentAddress}</Text>
//         </View>
//         <Pressable style={styles.button} onPress={openProfile}>
//           <Text style={styles.buttonText}>H</Text>
//         </Pressable>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <TextInput placeholder="Search" placeholderTextColor="#c0c0c0" style={styles.searchInput} />
//         <Ionicons name="search" size={24} color="#D97B29" />
//       </View>

//       <Carousel />
//       <Category />
//       <BigCard />
//       <ScrollingItem />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     padding: 10,
//   },
//   addressContainer: {
//     flex: 1,
//   },
//   addressTitle: {
//     fontSize: 15,
//     fontWeight: '500',
//     color:'#000',
//   },
//   addressText: {
//     color: 'gray',
//     fontSize: 15,
//     marginTop: 3,
//   },
//   button: {
//     backgroundColor: '#d97b29',
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: '#c0c0c0',
//     paddingHorizontal: 8,
//     paddingVertical: 1,
//     borderRadius: 11,
//     marginTop: 10,
//     marginHorizontal: 10,
//   },
//   searchInput: {
//     flex: 1,
//     color:'#AEB5BB',
//   },
// });

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
  TouchableOpacity,
  Modal,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from '../components/Carousel';
import Category from '../components/Category';
import BigCard from '../components/BigCard';
import ScrollingItem from '../components/ScrollingItems';
import {useNavigation} from '@react-navigation/native';
import FindFlavour from '../components/FindFlavour';
import PopularItems from '../components/PopularItems';

const GOOGLE_MAPS_API_KEY = 'AIzaSyD0lwp2aClBzdv3kE_xqIHUGxjcwjQXxSk';

const categories = [
  'all',
  'Chaat',
  'Pani Puri',
  'Sudindisch',
  'Nachtisch',
  'Wein',
  'Saft/Schorle',
  'Indo-Chinesisch',
  'Mittagsmenu',
  'Kaltes Getrank',
  'Dinner Menu',
];

export default function HomeScreen() {
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Fetching your location...',
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState('all');

  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }
    getCurrentLocation();
  }, []);

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

  const getAddressFromCoordinates = async (latitude, longitude) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`,
      );
      const formattedAddress =
        response.data.results[0]?.formatted_address || 'No address found';
      setAddress(formattedAddress);
      setDisplayCurrentAddress(formattedAddress);
    } catch (error) {
      setAddress('Error fetching address');
      console.error('Error fetching address: ', error);
    } finally {
      setLoading(false);
    }
  };

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

  const openProfile = () => {
    navigation.navigate('PROFILE');
  };

  const openFilter = () => {
    setModalVisible(true); // Open filter modal
  };

  // Example data for demonstration (this should be your actual data)
  const items = [
    {id: 1, name: 'Chaat', category: 'Chaat'},
    {id: 2, name: 'Pani Puri', category: 'Pani Puri'},
    {id: 3, name: 'Nachtisch', category: 'Nachtisch'},
    {id: 4, name: 'Wein', category: 'Wein'},
    // ... add more items
  ];

  const filteredItems =
    filter === 'all' ? items : items.filter(item => item.category === filter);

  return (
    <ScrollView style={styles.container}>
      {/* Header with Location Display */}
      <View style={styles.header}>
        <Ionicons name="location-outline" size={24} color="#D97B29" />
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Deliver To</Text>
          <Text style={styles.addressText}>{displayCurrentAddress}</Text>
        </View>
        <Pressable style={styles.profileButton} onPress={openProfile}>
          <Text style={styles.profileButtonText}>H</Text>
        </Pressable>
      </View>
      {/* Search Bar with Filter Icon Outside */}
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#D97B29" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#c0c0c0"
            style={styles.searchInput}
          />
        </View>
        <Pressable onPress={openFilter} style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#D97B29" />
        </Pressable>
      </View>
      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Category</Text>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={styles.modalOption}
                onPress={() => {
                  setFilter(category);
                  setModalVisible(false);
                }}>
                <Text style={styles.modalOptionText}>{category}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Category />
      <Text style={styles.sectionTitle}>Find Your Flavour</Text>
      <FindFlavour items={filteredItems} />
      {/* Pass filtered items to FindFlavour */}
      <Text style={styles.sectionTitle}>Local Heroes</Text>
      <BigCard />
      <Text style={styles.sectionTitle}>Populars</Text>
      <PopularItems items={filteredItems} />
      {/* Pass filtered items to PopularItems */}
      <ScrollingItem items={filteredItems} />
      {/* Pass filtered items to ScrollingItem */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  addressContainer: {
    flex: 1,
    marginLeft: 10,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addressText: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  profileButton: {
    backgroundColor: '#D97B29',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginHorizontal: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    color: '#555',
  },
  filterButton: {
    marginLeft: 12,
    padding: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  modalOptionText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#D97B29',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
