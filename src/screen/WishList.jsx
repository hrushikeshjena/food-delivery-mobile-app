
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const WishlistScreen = () => {
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist items from the API
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('https://example.com/api/wishlist'); // Replace with actual API
      setWishlist(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      Alert.alert('Error', 'Unable to fetch wishlist. Please try again later.');
    }
  };

  const handleRemoveFromWishlist = async (id) => {
    try {
      await axios.delete(`https://example.com/api/wishlist/${id}`); // Replace with actual API
      setWishlist(wishlist.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      Alert.alert('Error', 'Unable to remove item. Please try again later.');
    }
  };

  const handleAddToCart = async (item) => {
    try {
      await axios.post('https://example.com/api/cart', { itemId: item.id }); // Replace with actual API
      Alert.alert('Success', `${item.name} has been added to your cart.`);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      Alert.alert('Error', 'Unable to add item to cart. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      {wishlist.length === 0 ? (
        <Text style={styles.emptyText}>Your wishlist is empty</Text>
      ) : (
        wishlist.map(item => (
          <View key={item.id} style={styles.itemContainer}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.infoContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <Pressable onPress={() => handleAddToCart(item)} style={styles.icon}>
                <Icon name="add-shopping-cart" size={24} color="#4CAF50" />
              </Pressable>
              <Pressable onPress={() => handleRemoveFromWishlist(item.id)} style={styles.icon}>
                <Icon name="remove-circle" size={24} color="#D97B29" />
              </Pressable>
            </View>
          </View>
        ))
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#D97B29',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    marginLeft: 10,
  },
});

export default WishlistScreen;
