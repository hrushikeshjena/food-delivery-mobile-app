/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([
    { id: '1', item: 'Product A', price: '$10'},
    { id: '2', item: 'Product B', price: '$15'},
  ]);

  const totalRevenue = orders
    .reduce((total, order) => total + parseFloat(order.price.slice(1)), 0)
    .toFixed(2);

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>

      {/* Notification Section */}
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => alert('No new notifications')}>
          <Icon name="notifications-outline" size={30} color="#000" />
          <Text style={styles.notificationText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      {/* Total Revenue Section */}
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.revenueContainer}
          onPress={() => alert(`Total Revenue: $${totalRevenue}`)}>
          <Icon name="cash-outline" size={30} color="#f57f17" />
          <View style={styles.revenueTextContainer}>
            <Text style={styles.revenueText}>Total Revenue</Text>
            <Text style={styles.revenueAmount}>${totalRevenue}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('ORDERDETAILS')}>
          <Text style={styles.actionButtonText}>Customer Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('ADDITEMS')}>
          <Text style={styles.actionButtonText}>Add Items</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('ALLUSERS')}>
          <Text style={styles.actionButtonText}>All Users</Text>
        </TouchableOpacity>

        {/* Main Home Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('MAINHOME')}>
          <Text style={styles.actionButtonText}>User Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.0,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#00796b',
  },
  revenueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  revenueTextContainer: {
    marginLeft: 10,
  },
  revenueText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f57f17',
  },
  revenueAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f57f17',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    width: '100%',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
