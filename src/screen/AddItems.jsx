import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:8083';

const AddItems = () => {
  const navigation = useNavigation();
  const [imageData, setImageData] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [items, setItems] = useState([]);

  // Fetch items when the component is mounted
  useEffect(() => {
    fetchItems();
  }, []);

  // Axios GET request to fetch all items
  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/items/get/allitem`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 1 });
    if (!result.didCancel && result.assets) {
      console.log(result);
      setImageData(result.assets[0]);
    }
  };

  // Axios POST request to create a new item
  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('discountPrice', discountPrice.toString());
    formData.append('description', description);
    formData.append('category', category);

    // Append image as binary data
    if (imageData) {
      formData.append('image', {
        uri: imageData.uri,
        type: imageData.type,
        name: imageData.fileName || 'image.jpg',
      });
    }

    try {
      // Axios POST request to add a new item
      const response = await axios.post(
        `${API_URL}/items/create/add-item`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setItems([...items, response.data]);
      Alert.alert('Item added successfully');
    } catch (error) {
      console.error('Error adding item:', error);
      Alert.alert('Failed to add item');
    }

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPrice(0);
    setDiscountPrice(0);
    setDescription('');
    setCategory('');
    setImageData(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ADMINDASHBOARD')}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#D97B29" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText}>Add Items</Text>
      {imageData && (
        <Image
          source={{ uri: imageData.uri }}
          style={styles.imageStyle}
        />
      )}
      <TextInput
        placeholder="Enter item name"
        value={name}
        onChangeText={setName}
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="Enter item price"
        onChangeText={text => setPrice}
        keyboardType="numeric"
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="Enter item discount price"
        onChangeText={text => setDiscountPrice}
        keyboardType="numeric"
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="Enter item description"
        value={description}
        onChangeText={setDescription}
        style={styles.inputStyle}
      />
      <Picker
        selectedValue={category}
        onValueChange={itemValue => setCategory(itemValue)}
        style={styles.inputStyle}>
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Veg" value="veg" />
        <Picker.Item label="Non Veg" value="nonVeg" />
      </Picker>
      <TouchableOpacity style={styles.pickBtn} onPress={openGallery}>
        <Text style={styles.pickBtnText}>Pick Image From Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadBtn} onPress={handleCreate}>
        <Text style={styles.uploadBtnText}>Add Item</Text>
      </TouchableOpacity>

      <View style={styles.itemList}>
        {items.map(item => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.itemText}>
              {item.name} ({item.category}) ${item.price}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AddItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    height: 60,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
  },
  backButton: {
    flexDirection: 'row',
    marginRight: 20,
  },
  backText: {
    color: '#D97B29',
    fontSize: 16,
    marginLeft: 5,
  },
  headerText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  inputStyle: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  pickBtn: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  pickBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  uploadBtn: {
    backgroundColor: '#D97B29',
    width: '100%',
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtnText: {
    color: '#fff',
    fontSize: 18,
  },
  itemList: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  itemText: {
    fontSize: 16,
  },
  imageStyle: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
});
