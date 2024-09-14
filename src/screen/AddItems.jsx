import {
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Picker, 
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const AddItems = () => {
  const [imageData, setImageData] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openGallery();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo', quality: 0});
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else {
      setImageData(result.assets[0]);
    }
  };

  const handleCreateOrUpdate = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('discountPrice', discountPrice.toString());
    formData.append('description', description);
    formData.append('category', category);
    formData.append('imageUrl', imageUrl);

    if (imageData) {
      formData.append('image', {
        uri: imageData.uri,
        type: imageData.type,
        name: imageData.fileName,
      });
    }

    try {
      if (editingItem) {
        await axios.put(`http://yourapi.com/items/${editingItem.id}`, formData);
        Alert.alert('Item updated successfully');
      } else {
        await axios.post('http://yourapi.com/items', formData);
        Alert.alert('Item added successfully');
      }
      fetchItems();
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred');
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://yourapi.com/items');
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://yourapi.com/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = item => {
    setName(item.name);
    setPrice(item.price);
    setDiscountPrice(item.discountPrice);
    setDescription(item.description);
    setCategory(item.category);
    setImageUrl(item.imageUrl);
    setEditingItem(item);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text>Add Items</Text>
      </View>
      {imageData && (
        <Image source={{uri: imageData.uri}} style={styles.image} />
      )}
      <TextInput
        placeholder="Enter item name"
        value={name}
        onChangeText={setName}
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="Enter item price"
        value={price.toString()}
        onChangeText={text => setPrice(parseFloat(text))}
        keyboardType="numeric"
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="Enter item discount price"
        value={discountPrice.toString()}
        onChangeText={text => setDiscountPrice(parseFloat(text))}
        keyboardType="numeric"
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="Enter item description"
        value={description}
        onChangeText={setDescription}
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="Enter image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.inputStyle}
      />

      {/* New Picker for selecting category */}
      <Picker
        selectedValue={category}
        onValueChange={itemValue => setCategory(itemValue)}
        style={styles.inputStyle}>
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Veg" value="veg" />
        <Picker.Item label="Non Veg" value="nonVeg" />
      </Picker>

      <Text style={styles.orText}>OR</Text>
      <TouchableOpacity
        style={styles.pickBtn}
        onPress={requestCameraPermission}>
        <Text>Pick Image From Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadBtn} onPress={handleCreateOrUpdate}>
        <Text style={styles.uploadBtnText}>
          {editingItem ? 'Update Item' : 'Add Item'}
        </Text>
      </TouchableOpacity>

      <View style={styles.itemList}>
        {items.map(item => (
          <View key={item.id} style={styles.item}>
            <Text>
              {item.name} ({item.category})
            </Text>
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <Text style={styles.editBtn}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteBtn}>Delete</Text>
            </TouchableOpacity>
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
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  inputStyle: {
    width: '90%',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  pickBtn: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  uploadBtn: {
    backgroundColor: '#5246f2',
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtnText: {
    color: '#fff',
  },
  orText: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  itemList: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  editBtn: {
    color: '#5246f2',
  },
  deleteBtn: {
    color: 'red',
  },
});
