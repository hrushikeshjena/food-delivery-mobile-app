import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchScreen = () => {
  const [vegItems, setVegItems] = useState([]);
  const [nonVegItems, setNonVegItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVegItems, setFilteredVegItems] = useState([]);
  const [filteredNonVegItems, setFilteredNonVegItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [items, setItems] = useState([]);

  const navigation = useNavigation();
  const [addItems, setAddItems] = useState(0);
  const [selected, setSelected] = useState(false);

  const handleCart = () => navigation.navigate('CART', {items});
  const goToDetailPage = () => navigation.navigate('DetailsScreen', {items});

  // Fetch items from the API
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        'http://10.0.2.2:8083/items/get/allitem',
      );
      const items = response.data; // Assuming the API response is an array of items

      const veg = items.filter(item => item.category === 'veg');
      const nonVeg = items.filter(item => item.category === 'non veg');

      setVegItems(veg);
      setNonVegItems(nonVeg);
      setFilteredVegItems(veg);
      setFilteredNonVegItems(nonVeg);
      setItems(items); // Set all items for display
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItemToCart = () => {
    setSelected(true);
    setAddItems(prevCount => prevCount + 1);
  };

  const removeItemFromCart = () => {
    if (addItems === 1) {
      setSelected(false);
    }
    setAddItems(prevCount => Math.max(prevCount - 1, 0));
  };

  // Handle searching for items
  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredVeg = vegItems.filter(item =>
      item.name.toLowerCase().includes(lowerCaseQuery),
    );
    const filteredNonVeg = nonVegItems.filter(item =>
      item.name.toLowerCase().includes(lowerCaseQuery),
    );

    setFilteredVegItems(filteredVeg);
    setFilteredNonVegItems(filteredNonVeg);
  };


  return (
    <ScrollView style={styles.container1}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.itemList}>
        {items.length > 0 ? (
          items.map(item => (
            <View key={item.id} style={styles.item}>
              <View style={styles.container}>
                <Pressable style={styles.pressable} onPress={goToDetailPage}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.itemName}>{item?.name}</Text>
                    <Text style={styles.itemPrice}>₹{item?.price}</Text>
                    <Text style={styles.itemDescription}>
                      {item?.description.length > 40
                        ? `${item?.description.slice(0, 40)}...`
                        : item?.description}
                    </Text>
                    <TouchableOpacity
                      onPress={goToDetailPage}
                      style={styles.iconContainer}>
                      <Ionicons
                        name="arrow-redo-circle-outline"
                        size={25}
                        color="#D97B29"
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Image
                      style={styles.itemImage}
                      source={{uri: item?.image}}
                    />
                    {selected ? (
                      <View style={styles.quantityControl}>
                        <Pressable onPress={removeItemFromCart}>
                          <Text style={styles.controlText}>-</Text>
                        </Pressable>
                        <Text style={styles.quantityText}>{addItems}</Text>
                        <Pressable onPress={addItemToCart}>
                          <Text style={styles.controlText}>+</Text>
                        </Pressable>
                      </View>
                    ) : (
                      <Pressable
                        onPress={addItemToCart}
                        style={styles.addToCartButton}>
                        <Text style={styles.controlText}>Add</Text>
                      </Pressable>
                    )}
                  </View>
                </Pressable>
                {addItems > 0 && (
                  <Pressable onPress={handleCart} style={styles.cartMessage}>
                    <Text style={styles.cartText}>
                      {addItems} item{addItems > 1 ? 's' : ''} added
                    </Text>
                    <Text style={styles.cartInfo}>
                      Add item(s) worth ₹240 to reduce surge fee by ₹35.
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noItemsText}>No items found.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginRight: 10,
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#5246f2',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  categoryHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingLeft: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#D97B29',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  wishlistButton: {
    padding: 5,
  },
  detailsButton: {
    backgroundColor: '#D97B29',
    borderRadius: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsButtonText: {
    color: 'white',
  },
  itemList: {
    padding: 10,
  },

  itemText: {
    fontSize: 16,
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },

  container: {
    padding: 5,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 15,
    marginTop: 4,
    fontWeight: '500',
    color: '#D97B29',
  },
  starContainer: {
    marginTop: 5,
  },
  star: {
    paddingHorizontal: 3,
  },
  itemDescription: {
    marginTop: 8,
    color: 'gray',
    fontSize: 16,
  },
  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  quantityControl: {
    position: 'absolute',
    top: 95,
    left: 20,
    borderColor: '#D97B29',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  addToCartButton: {
    position: 'absolute',
    top: 95,
    left: 20,
    borderColor: '#D97B29',
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  controlText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D97B29',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  cartMessage: {
    backgroundColor: '#D97B29',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  cartText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  cartInfo: {
    textAlign: 'center',
    color: 'white',
    marginTop: 5,
    fontWeight: '600',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
    padding: 5,
  },
});

export default SearchScreen;
