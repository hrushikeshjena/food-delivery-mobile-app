

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const CombinedYourOrder = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the orders when the component mounts
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://example.com/api/orders'); // Replace with your API URL
      setOrderItems(response.data); // Assuming the API returns an array of orders
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleReorder = async (item) => {
    try {
      const response = await axios.post('https://example.com/api/reorder', { itemId: item.id });
      Alert.alert('Reorder', `You have reordered ${item.name}`, [{ text: 'OK' }]);
      // Optionally, refresh the order list or update state
    } catch (error) {
      console.error('Error reordering:', error);
      Alert.alert('Error', 'Unable to reorder. Please try again.');
    }
  };

  const handleContinueShopping = () => {
    // Navigate to the shopping screen or reset the order list
    Alert.alert('Continue Shopping', 'Taking you back to the shopping screen!', [{ text: 'OK' }]);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading orders...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Confirmed</Text>
      <FlatList
        data={orderItems}
        keyExtractor={(item) => item.id.toString()} // Assuming each item has a unique 'id'
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.reorderButton}
              onPress={() => handleReorder(item)}
            >
              <Text style={styles.reorderButtonText}>Reorder</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No items ordered.</Text>}
      />
      <TouchableOpacity style={styles.button} onPress={handleContinueShopping}>
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CombinedYourOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fbfdfd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 16,
    color: '#d97b29',
  },
  reorderButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#d97b29',
    borderRadius: 5,
    alignItems: 'center',
  },
  reorderButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#d97b29',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
