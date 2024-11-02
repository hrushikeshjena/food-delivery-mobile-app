

import React, {useState, useEffect, useCallback} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {debounce} from 'lodash';

// API URL
const API_URL = 'http://10.0.2.2:8083/items/get/allitem';
const IMAGE_API_URL = item_id =>
  `http://10.0.2.2:8083/items/add-item_photo/${item_id}`;

// ItemCard Component
const ItemCard = React.memo(
  ({item, addItems, addItemToCart, removeItemFromCart, goToDetailPage}) => (
    <View key={item.item_id} style={styles.item}>
      <Pressable style={styles.pressable} onPress={() => goToDetailPage(item)}>
        <View style={styles.infoContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
          <Text style={styles.itemDescription}>
            {item.description?.length > 40
              ? `${item.description.slice(0, 40)}...`
              : item.description}
          </Text>
          <TouchableOpacity
            onPress={() => goToDetailPage(item)}
            style={styles.iconContainer}>
            <Ionicons
              name="arrow-redo-circle-outline"
              size={25}
              color="#D97B29"
            />
          </TouchableOpacity>
          <Text style={styles.salesCount}>Sales: {item.salesCount}</Text>
        </View>
        <View>
          <Image
            source={{uri: IMAGE_API_URL(item.item_id)}} // Use the image API URL here
            style={styles.itemImage}
            onError={() => console.log('Error loading image')}
          />
          {addItems[item.item_id] ? (
            <QuantityControl
              item_id={item.item_id}
              quantity={addItems[item.item_id]}
              addItemToCart={addItemToCart}
              removeItemFromCart={removeItemFromCart}
            />
          ) : (
            <Pressable
              onPress={() => addItemToCart(item.item_id)}
              style={styles.addToCartButton}>
              <Text style={styles.controlText}>Add</Text>
            </Pressable>
          )}
        </View>
      </Pressable>
    </View>
  ),
);

// QuantityControl Component
const QuantityControl = React.memo(
  ({item_id, quantity, addItemToCart, removeItemFromCart}) => (
    <View style={styles.quantityControl}>
      <Pressable onPress={() => removeItemFromCart(item_id)}>
        <Text style={styles.controlText}>-</Text>
      </Pressable>
      <Text style={styles.quantityText}>{quantity}</Text>
      <Pressable onPress={() => addItemToCart(item_id)}>
        <Text style={styles.controlText}>+</Text>
      </Pressable>
    </View>
  ),
);

// SearchScreen Component
const SearchScreen = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addItems, setAddItems] = useState({});
  const [filter, setFilter] = useState('all');
  const navigation = useNavigation();

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(API_URL);
      setItems(response.data || []);
    } catch (err) {
      setError('Error fetching items. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSearch = useCallback(
    debounce(text => {
      setSearchQuery(text);
    }, 300),
    [],
  );

  const getFilteredItems = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    let filtered = items.filter(item =>
      item.name.toLowerCase().includes(lowerCaseQuery),
    );

    if (filter === 'veg') {
      return filtered.filter(item => item.category === 'veg');
    } else if (filter === 'non-veg') {
      return filtered.filter(item => item.category === 'nonVeg');
    }
    return filtered;
  };

  const addItemToCart = item_id => {
    setAddItems(prevItems => ({
      ...prevItems,
      [item_id]: (prevItems[item_id] || 0) + 1,
    }));
  };

  const removeItemFromCart = item_id => {
    setAddItems(prevItems => {
      const updatedItems = {...prevItems};
      if (updatedItems[item_id] > 1) {
        updatedItems[item_id]--;
      } else {
        delete updatedItems[item_id];
      }
      return updatedItems;
    });
  };

  const goToDetailPage = item => {
    navigation.navigate('DetailsScreen', {item});
  };

  const getTotal = () => {
    return Object.entries(addItems).reduce((total, [item_id, quantity]) => {
      const item = items.find(item => item.item_id === item_id);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const cartList = Object.entries(addItems).filter(
    ([_, quantity]) => quantity > 0,
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#D97B29" style={styles.loader} />
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const filteredItems = getFilteredItems();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search items..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.filterContainer}>
        {['all', 'veg', 'non-veg'].map(type => (
          <TouchableOpacity
            key={type}
            onPress={() => setFilter(type)}
            style={[
              styles.filterButton,
              filter === type && styles.activeFilter,
            ]}>
            <Text style={styles.filterText}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.itemList}>
        {filteredItems.length > 0 ? (
          <FlatList
            data={filteredItems}
            renderItem={({item}) => (
              <ItemCard
                item={item}
                addItems={addItems}
                addItemToCart={addItemToCart}
                removeItemFromCart={removeItemFromCart}
                goToDetailPage={goToDetailPage}
              />
            )}
            keyExtractor={item => item.item_id.toString()} // Correct key extractor
          />
        ) : (
          <Text style={styles.noItemsText}>No items found.</Text>
        )}
      </View>

      {cartList.length > 0 && (
        <View style={styles.checkoutView}>
          <Text style={{color: '#000', fontWeight: '600'}}>
            {'Items (' + cartList.length + ')\nTotal: ₹' + getTotal()}
          </Text>
          <TouchableOpacity
            style={[styles.addToCartButton, {width: 100, height: 40}]}
            onPress={() => {
              navigation.navigate('CART', {items});
            }}>
            <Text style={{color: '#fff'}}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  searchContainer: {marginBottom: 20},
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  filterContainer: {flexDirection: 'row', marginBottom: 20},
  filterButton: {padding: 10, borderRadius: 5, marginRight: 10},
  activeFilter: {backgroundColor: '#D97B29'},
  filterText: {color: '#000'},
  itemList: {flex: 1},
  noItemsText: {textAlign: 'center', marginTop: 20},
  checkoutView: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
  },
  pressable: {flexDirection: 'row', flex: 1},
  infoContainer: {flex: 1, marginRight: 10},
  itemName: {fontWeight: 'bold', fontSize: 16},
  itemPrice: {fontWeight: 'bold', fontSize: 14},
  itemDescription: {fontSize: 12, color: '#666'},
  iconContainer: {position: 'absolute', right: 0, top: 5},
  salesCount: {marginTop: 10, fontSize: 12, color: '#888'},
  itemImage: {width: 100, height: 100, borderRadius: 10},
  addToCartButton: {
    backgroundColor: '#D97B29',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  quantityControl: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  controlText: {fontSize: 18, marginHorizontal: 10},
  quantityText: {fontSize: 18},
  loader: {flex: 1, justifyContent: 'center'},
  errorText: {textAlign: 'center', color: 'red'},
});

export default SearchScreen;





//  const handleCheckout = async () => {
//     if (!paymentMethod) {
//       Alert.alert('Error', 'Please select a payment method.');
//       return;
//     }

//     try {
//       const cartResponse = await axios.get(`${API_URL}`);
//       const { cart_id, user } = cartResponse.data;

//       const payload = {
//         order_id: cart_id,
//         user: { id: user.id, ...user }, // User details
//         items: cart.map(item => ({
//           id: item.id,
//           name: item.name,
//           quantity: quantity[item.name] || 1,
//           price: item.price,
//         })),
//         paymentMethod,
//         instructions,
//         total: total + 20, // Including delivery fee
//       };

//       const response = await axios.post(`${API_URL_CHECKOUT}`, payload);
//       Alert.alert('Success', 'Your order has been placed successfully!', [
//         {
//           text: 'OK',
//           onPress: () => {
//             setCart([]);
//             setQuantity({});
//             setPaymentMethod('');
//             setInstructions('');
//             navigation.navigate('YourOrder', { order: response.data });
//           },
//         },
//       ]);
//     } catch (error) {
//       console.error('Checkout Error:', error);
//       Alert.alert('Error', 'Failed to place order. Please try again.');
//     }
//   };

// const handleCheckout = async () => {
//   if (!paymentMethod) {
//       Alert.alert('Error', 'Please select a payment method.');
//       return;
//   }

//   try {
//       // Log the payment method and any other relevant info
//       console.log('Selected payment method:', paymentMethod);
      
//       const cartResponse = await axios.get(`${API_URL}`);
//       const { cart_id, user } = cartResponse.data;

//       console.log('Cart Response:', cartResponse.data);

//       const payload = {
//           order_id: cart_id,
//           user: { id: user.id, ...user }, 
//           items: cart.map(item => ({
//               id: item.id,
//               name: item.name,
//               quantity: quantity[item.name] || 1,
//               price: item.price,
//           })),
//           paymentMethod,
//           instructions,
//           total: total + 20, 
//       };

//       console.log('Payload:', JSON.stringify(payload, null, 2));

//       const response = await axios.post(`${API_URL_CHECKOUT}`, payload);
      
//       console.log('Checkout Response:', response.data);
      
//       Alert.alert('Success', 'Your order has been placed successfully!', [
//           {
//               text: 'OK',
//               onPress: () => {
//                   setCart([]);
//                   setQuantity({});
//                   setPaymentMethod('');
//                   setInstructions('');
//                   navigation.navigate('YourOrder', { order: response.data });
//               },
//           },
//       ]);
//   } catch (error) {
//       console.error('Checkout Error:', error.response ? error.response.data : error.message);
//       Alert.alert('Error', 'Failed to place order. Please try again.');
//   }
// };