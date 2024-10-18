import React, {useState} from 'react';
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

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'Image selection was cancelled');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else {
        const selectedImageUri = response.assets[0].uri;
        setImageUri(selectedImageUri);
      }
    });
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleYourOrder = () => {
    navigation.navigate('YourOrder');
  };

  const logout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'OK',
        onPress: async () => {
          try {
            // Clear user data from AsyncStorage
            await AsyncStorage.clear();
            // Navigate to LoginScreen after logout
            navigation.reset({
              index: 0,
              routes: [{name: 'WELCOME'}], // Adjust to your login screen name
            });
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
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{
                uri:
                  imageUri ||
                  'https://pixabay.com/photos/india-men-portrait-indian-classic-5342927/',
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionCard}
              onPress={handleEditProfile}>
              <View style={styles.option}>
                <Icon name="edit" size={20} color="#d97b29" />
                <Text style={styles.optionText}>Edit Profile</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionCard}
              onPress={handleYourOrder}>
              <View style={styles.option}>
                <Icon name="shopping-cart" size={20} color="#d97b29" />
                <Text style={styles.optionText}>Your Order</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => setLangModalVisible(!langModalVisible)}>
              <View style={styles.option}>
                <Icon name="language" size={20} color="#d97b29" />
                <Text style={styles.optionText}>Choose Languages</Text>
              </View>
            </TouchableOpacity>

            <Languages
              langModalVisible={langModalVisible}
              setLangModalVisible={setLangModalVisible}
              setLangIndex={setSelectedLang}
            />

            <TouchableOpacity style={styles.optionCard}>
              <View style={styles.option}>
                <Icon name="info" size={20} color="#d97b29" />
                <Text style={styles.optionText}>About</Text>
              </View>
            </TouchableOpacity>
          </View>

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
  container: {
    flex: 1,
    backgroundColor: '#fbfdfd',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#d97b29',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 22,
    color: '#fff',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: '#fff',
  },
  card: {
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: 15,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginVertical: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
    color:'#AEB5BB',
  },
  logoutButton: {
    backgroundColor: '#d97b29',
    padding: 15,
    alignItems: 'center',
    marginTop: 50, // Adjust margin for better placement
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
