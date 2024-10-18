// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   Button,
//   Image,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const ordersSample = [
//   {
//     id: '1',
//     customerName: 'John Doe',
//     address: '1234 Elm Street, Springfield, USA',
//     totalOrderPrice: 90,
//     items: [
//       {
//         id: '1',
//         itemName: 'Item 1',
//         quantity: 2,
//         price: 20,
//         imageUrl: 'https://via.placeholder.com/100',
//       },
//       {
//         id: '2',
//         itemName: 'Item 2',
//         quantity: 1,
//         price: 50,
//         imageUrl: 'https://via.placeholder.com/100',
//       },
//     ],
//   },
//   {
//     id: '2',
//     customerName: 'Jane Smith',
//     address: '5678 Oak Avenue, Metropolis, USA',
//     totalOrderPrice: 150,
//     items: [
//       {
//         id: '1',
//         itemName: 'Item A',
//         quantity: 1,
//         price: 100,
//         imageUrl: 'https://via.placeholder.com/100',
//       },
//       {
//         id: '2',
//         itemName: 'Item B',
//         quantity: 2,
//         price: 25,
//         imageUrl: 'https://via.placeholder.com/100',
//       },
//     ],
//   },
// ];

// const OrderDetails = ({navigation}) => {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const fetchOrders = async () => {
//     setOrders(ordersSample);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const renderOrderItem = ({item}) => (
//     <View style={styles.itemContainer}>
//       <Image source={{uri: item.imageUrl}} style={styles.itemImage} />
//       <View style={styles.itemDetails}>
//         <Text style={styles.itemText}>Item: {item.itemName}</Text>
//         <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
//         <Text style={styles.itemText}>Price: ${item.price}</Text>
//       </View>
//     </View>
//   );

//   const renderOrderDetails = () => (
//     <View style={styles.orderContainer}>
//       <Text style={styles.title}>
//         Order Details for {selectedOrder.customerName}
//       </Text>
//       <Text style={styles.sectionTitle}>Customer Information:</Text>
//       <Text style={styles.detailText}>Name: {selectedOrder.customerName}</Text>
//       <Text style={styles.detailText}>Address: {selectedOrder.address}</Text>
//       <Text style={styles.sectionTitle}>Order Summary:</Text>
//       <Text style={styles.detailText}>
//         Total Order Price: ${selectedOrder.totalOrderPrice}
//       </Text>
//       <Text style={styles.sectionTitle}>Items Ordered:</Text>
//       <FlatList
//         data={selectedOrder.items}
//         renderItem={renderOrderItem}
//         keyExtractor={item => item.id}
//       />
//       <Button title="Back to Orders" onPress={() => setSelectedOrder(null)} />
//     </View>
//   );

//   const renderCustomerList = () => (
//     <View style={styles.customerListContainer}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('ADMINDASHBOARD')}
//           style={styles.backButton}>
//           <Icon name="arrow-back" size={24} color="#D97B29" />
//           <Text style={styles.backButtonText}>Back</Text>
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.headerTitle}>Customer Orders</Text>
//       <FlatList
//         data={orders}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             onPress={() => setSelectedOrder(item)}
//             style={styles.customerButton}>
//             <Text style={styles.customerName}>{item.customerName}</Text>
//           </TouchableOpacity>
//         )}
//         keyExtractor={item => item.id}
//       />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {selectedOrder ? renderOrderDetails() : renderCustomerList()}
//     </View>
//   );
// };

// export default OrderDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 24,
//     color: '#000',
//   },
//   backButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   backButtonText: {
//     fontSize: 16,
//     color: '#000',
//     marginLeft: 8,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   detailText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   customerListContainer: {
//     flex: 1,
//   },
//   customerButton: {
//     padding: 15,
//     backgroundColor: '#fff',
//     marginVertical: 5,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   customerName: {
//     fontSize: 18,
//   },
//   orderContainer: {
//     marginBottom: 30,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#f0f0f0',
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 8,
//     elevation: 1,
//   },
//   itemImage: {
//     width: 60,
//     height: 60,
//     marginRight: 15,
//     borderRadius: 8,
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   itemText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });


import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios'; // Import Axios
import Icon from 'react-native-vector-icons/MaterialIcons';

// Sample API URL (replace this with your actual API endpoint)
const API_URL = 'https://your-api-url.com/orders';

const OrderDetails = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(API_URL); // Fetch data from API
      setOrders(response.data); // Set orders from response
    } catch (error) {
      console.error('Error fetching orders:', error); // Handle errors
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.imageUrl}} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>Item: {item.itemName}</Text>
        <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
        <Text style={styles.itemText}>Price: ${item.price}</Text>
      </View>
    </View>
  );

  const renderOrderDetails = () => (
    <View style={styles.orderContainer}>
      <Text style={styles.title}>
        Order Details for {selectedOrder.customerName}
      </Text>
      <Text style={styles.sectionTitle}>Customer Information:</Text>
      <Text style={styles.detailText}>Name: {selectedOrder.customerName}</Text>
      <Text style={styles.detailText}>Address: {selectedOrder.address}</Text>
      <Text style={styles.sectionTitle}>Order Summary:</Text>
      <Text style={styles.detailText}>
        Total Order Price: ${selectedOrder.totalOrderPrice}
      </Text>
      <Text style={styles.sectionTitle}>Items Ordered:</Text>
      <FlatList
        data={selectedOrder.items}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
      />
      <Button title="Back to Orders" onPress={() => setSelectedOrder(null)} />
    </View>
  );

  const renderCustomerList = () => (
    <View style={styles.customerListContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ADMINDASHBOARD')}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#D97B29" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>Customer Orders</Text>
      <FlatList
        data={orders}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => setSelectedOrder(item)}
            style={styles.customerButton}>
            <Text style={styles.customerName}>{item.customerName}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {selectedOrder ? renderOrderDetails() : renderCustomerList()}
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#000',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  customerListContainer: {
    flex: 1,
  },
  customerButton: {
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  customerName: {
    fontSize: 18,
  },
  orderContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 1,
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
