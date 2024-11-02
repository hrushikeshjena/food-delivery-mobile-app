import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

// Make sure order_id is defined somewhere before this
const order_id = 1; // Replace with actual order_id

const API_URL_GET = `http://10.0.2.2:8083/order/get/${order_id}`;
const API_URL_UPDATE = `http://10.0.2.2:8083/order/update/${order_id}`;
const API_URL_CANCEL = `http://10.0.2.2:8083/order/cancel/${order_id}`;

const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await fetch(API_URL_GET);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrderList(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Better loading indicator
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>; // Show error message
  }

  return (
    <View style={styles.container}>
      <Header title={'My Orders'} />
      <FlatList
        data={orderList}
        keyExtractor={(item) => item.id.toString()} // Ensure id is a string
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <FlatList
              data={item.items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemView}>
                  <Image
                    source={{ uri: item.data.imageUrl }}
                    style={styles.itemImage}
                    onError={() => console.log('Image failed to load')} // Handle image load failure
                  />
                  <View>
                    <Text style={styles.nameText}>{item.data.name}</Text>
                    <Text style={styles.nameText}>
                      {'Price: ' + item.data.discountPrice + ', Qty: ' + item.data.qty}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderItem: {
    width: '90%',
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  itemView: {
    margin: 10,
    width: '100%',
    flexDirection: 'row',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 20,
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
