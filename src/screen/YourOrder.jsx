import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:8083/items/';

const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    console.log(userId);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrderList(data); // Assuming the API returns the order list in the expected format
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  if (loading) {
    return <Text>Loading...</Text>; // Simple loading indicator
  }

  return (
    <View style={styles.container}>
      <Header title={'My Orders'} />
      <FlatList
        data={orderList}
        keyExtractor={(item) => item.id.toString()} // Use item id as key
        renderItem={({ item }) => {
          return (
            <View style={styles.orderItem}>
              <FlatList
                data={item.items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.itemView}>
                      <Image
                        source={{ uri: item.data.imageUrl }}
                        style={styles.itemImage}
                      />
                      <View>
                        <Text style={styles.nameText}>{item.data.name}</Text>
                        <Text style={styles.nameText}>
                          {'Price: ' + item.data.discountPrice + ', Qty: ' + item.data.qty}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
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
});
