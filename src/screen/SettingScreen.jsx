// import {View, Text} from 'react-native';
// import React from 'react';

// const SettingScreen = () => {
//   return (
//     <View>
//       <Text>SettingScreen</Text>
//     </View>
//   );
// };

// export default SettingScreen;


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
import FoodItem from '../components/FoodItem';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchScreen = () => {
  const [vegItems, setVegItems] = useState([]);
  const [nonVegItems, setNonVegItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVegItems, setFilteredVegItems] = useState([]);
  const [filteredNonVegItems, setFilteredNonVegItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [items, setItems] = useState([]);
  const [addItems, setAddItems] = useState(0);
    const [selected, setSelected] = useState(false);
  
  const navigation = useNavigation();
  const handleCart = () => navigation.navigate('CART', {items});
  const goToDetailPage = () => navigation.navigate('DetailsScreen', {item});

  const handleAddToWishlist = item => {
    setWishlist(prevWishlist => [...prevWishlist, item]);
  };



 
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

      const veg = items.filter(item => item.category === 'Veg');
      const nonVeg = items.filter(item => item.category === 'Non-Veg');

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

  const handleSearch = () => {
    const filteredVeg = vegItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    const filteredNonVeg = nonVegItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    setFilteredVegItems(filteredVeg);
    setFilteredNonVegItems(filteredNonVeg);
  };

  //   // Add item to wishlist
  // const handleAddToWishlist = item => {
  //   setWishlist(prevWishlist => [...prevWishlist, item]);
  // };

  // Render each item card
  const renderItem = ({item}) => (
    <View style={styles.card}>
      {item.image && <Image source={{uri: item.image}} style={styles.image} />}
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => handleAddToWishlist(item)}
          style={styles.wishlistButton}>
          <Icon name="favorite-border" size={24} color="#D97B29" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailsScreen', {item})}
          style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
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

      {filteredVegItems.length > 0 && (
        <View>
          <Text style={styles.categoryHeader}>Veg Items</Text>
          <FlatList
            data={filteredVegItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.list}
          />
        </View>
      )}

      {filteredNonVegItems.length > 0 && (
        <View>
          <Text style={styles.categoryHeader}>Non-Veg Items</Text>
          <FlatList
            data={filteredNonVegItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.list}
          />
        </View>
      )}

      
      <View style={styles.itemList}>
       {items.length > 0 ? (
          items.map(item => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemText}>
                {item.name} ({item.category}) ₹{item.price}
              </Text>
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
                      <Icon
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
  container: {
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
});

export default SearchScreen;