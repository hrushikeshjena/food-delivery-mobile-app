// // // // import React, {useState, useEffect, useCallback} from 'react';
// // // // import Icon from 'react-native-vector-icons/FontAwesome5';

// // // // import {
// // // //   View,
// // // //   Text,
// // // //   StyleSheet,
// // // //   TouchableOpacity,
// // // //   FlatList,
// // // //   Image,
// // // //   ScrollView,
// // // //   TextInput,
// // // //   Pressable,
// // // //   ActivityIndicator,
// // // // } from 'react-native';
// // // // import {useNavigation} from '@react-navigation/native';
// // // // import axios from 'axios';
// // // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // // import {debounce} from 'lodash';

// // // // // API URL
// // // // const API_URL = 'http://10.0.2.2:8083/items/get/allitem';
// // // // const IMAGE_API_URL = item_id =>
// // // //   `http://10.0.2.2:8083/items/add-item_photo/${item_id}`;

// // // // // ItemCard Component
// // // // const ItemCard = React.memo(
// // // //   ({item, addItems, addItemToCart, removeItemFromCart, goToDetailPage}) => (
// // // //     <View style={styles.item}>
// // // //       <Pressable style={styles.pressable} onPress={() => goToDetailPage(item)}>
// // // //         <View style={styles.infoContainer}>
// // // //           <Text style={styles.itemName}>{item.itemname}</Text>
// // // //           <Text style={styles.itemPrice}>₹{item.price}</Text>
// // // //           <Text style={styles.itemDescription}>
// // // //             {item.description?.length > 40
// // // //               ? `${item.description.slice(0, 40)}...`
// // // //               : item.description}
// // // //           </Text>
// // // //           <TouchableOpacity
// // // //             onPress={() => goToDetailPage(item)}
// // // //             style={styles.iconContainer}>
// // // //             <Ionicons
// // // //               name="arrow-redo-circle-outline"
// // // //               size={25}
// // // //               color="#D97B29"
// // // //             />
// // // //           </TouchableOpacity>
// // // //         </View>
// // // //         <View>
// // // //           <Image
// // // //             source={{uri: IMAGE_API_URL(item.item_id)}}
// // // //             style={styles.itemImage}
// // // //             onError={() => {
// // // //               console.log('Error loading image');
// // // //               // Optionally, set a default image here
// // // //             }}
// // // //           />
// // // //           {addItems[item.item_id] ? (
// // // //             <QuantityControl
// // // //               item_id={item.item_id}
// // // //               quantity={addItems[item.item_id]}
// // // //               addItemToCart={addItemToCart}
// // // //               removeItemFromCart={removeItemFromCart}
// // // //             />
// // // //           ) : (
// // // //             <Pressable
// // // //               onPress={() => addItemToCart(item.item_id)}
// // // //               style={styles.addToCartButton}>
// // // //               <Text style={styles.controlText}>Add</Text>
// // // //             </Pressable>
// // // //           )}
// // // //         </View>
// // // //       </Pressable>
// // // //     </View>
// // // //   ),
// // // // );

// // // // // QuantityControl Component
// // // // const QuantityControl = React.memo(
// // // //   ({item_id, quantity, addItemToCart, removeItemFromCart}) => (
// // // //     <View style={styles.quantityControl}>
// // // //       <Pressable onPress={() => removeItemFromCart(item_id)}>
// // // //         <Text style={styles.controlText}>-</Text>
// // // //       </Pressable>
// // // //       <Text style={styles.quantityText}>{quantity}</Text>
// // // //       <Pressable onPress={() => addItemToCart(item_id)}>
// // // //         <Text style={styles.controlText}>+</Text>
// // // //       </Pressable>
// // // //     </View>
// // // //   ),
// // // // );

// // // // // SearchScreen Component
// // // // const SearchScreen = () => {
// // // //   const [items, setItems] = useState([]);
// // // //   const [searchQuery, setSearchQuery] = useState('');
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState('');
// // // //   const [addItems, setAddItems] = useState({});
// // // //   const [filter, setFilter] = useState('all');
// // // //   const navigation = useNavigation();

// // // //   const fetchItems = useCallback(async () => {
// // // //     setLoading(true);
// // // //     setError('');
// // // //     try {
// // // //       const response = await axios.get(API_URL);
// // // //       setItems(response.data || []);
// // // //     } catch (err) {
// // // //       setError('Error fetching items. Please try again.');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, [API_URL]);

// // // //   useEffect(() => {
// // // //     fetchItems();
// // // //   }, [fetchItems]);

// // // // const handleSearch = useCallback(
// // // //   debounce(text => {
// // // //     setSearchQuery(text || ''); // Ensure it's always a string
// // // //   }, 300),
// // // //   [],
// // // // );

// // // //   const getFilteredItems = () => {
// // // //     const lowerCaseQuery = (searchQuery || '').toLowerCase(); // Ensure it’s a string
// // // //     let filtered = items.filter(item =>
// // // //       item.itemname && item.itemname.toLowerCase().includes(lowerCaseQuery),
// // // //     );

// // // //     if (filter === 'veg') {
// // // //       return filtered.filter(item => item.category === 'veg');
// // // //     } else if (filter === 'non-veg') {
// // // //       return filtered.filter(item => item.category === 'nonVeg');
// // // //     }
// // // //     return filtered;
// // // //   };

// // // //   const addItemToCart = item_id => {
// // // //     setAddItems(prevItems => ({
// // // //       ...prevItems,
// // // //       [item_id]: (prevItems[item_id] || 0) + 1,
// // // //     }));
// // // //   };

// // // //   const removeItemFromCart = item_id => {
// // // //     setAddItems(prevItems => {
// // // //       const updatedItems = {...prevItems};
// // // //       if (updatedItems[item_id] > 1) {
// // // //         updatedItems[item_id]--;
// // // //       } else {
// // // //         delete updatedItems[item_id];
// // // //       }
// // // //       return updatedItems;
// // // //     });
// // // //   };

// // // //   const goToDetailPage = item => {
// // // //     navigation.navigate('DetailsScreen', {item});
// // // //   };

// // // //   const getTotal = () => {
// // // //     return Object.entries(addItems).reduce((total, [item_id, quantity]) => {
// // // //       const item = items.find(item => item.item_id === item_id);
// // // //       return total + (item ? item.price * quantity : 0);
// // // //     }, 0);
// // // //   };

// // // //   const cartList = Object.entries(addItems).filter(
// // // //     ([_, quantity]) => quantity > 0,
// // // //   );

// // // //   if (loading) {
// // // //     return (
// // // //       <ActivityIndicator size="large" color="#D97B29" style={styles.loader} />
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return <Text style={styles.errorText}>{error}</Text>;
// // // //   }

// // // //   return (
// // // //     <>
// // // //       <ScrollView style={styles.container}>
// // // //         <View style={styles.searchContainer}>
// // // //           <TextInput
// // // //             style={styles.searchBar}
// // // //             placeholder="Search items..."
// // // //             value={searchQuery}
// // // //             onChangeText={handleSearch}
// // // //           />
// // // //         </View>

// // // //         <View style={styles.filterContainer}>
// // // //           {['all', 'veg', 'non-veg'].map(type => (
// // // //             <TouchableOpacity
// // // //               key={type}
// // // //               onPress={() => setFilter(type)}
// // // //               style={[
// // // //                 styles.filterButton,
// // // //                 filter === type && styles.activeFilter,
// // // //               ]}>
// // // //               <Text style={styles.filterText}>
// // // //                 {type.charAt(0).toUpperCase() + type.slice(1)}
// // // //               </Text>
// // // //             </TouchableOpacity>
// // // //           ))}
// // // //         </View>

// // // //         <View style={styles.itemList}>
// // // //           {filteredItems.length > 0 ? (
// // // //             <FlatList
// // // //               data={filteredItems}
// // // //               renderItem={({item}) => (
// // // //                 <ItemCard
// // // //                   item={item}
// // // //                   addItems={addItems}
// // // //                   addItemToCart={addItemToCart}
// // // //                   removeItemFromCart={removeItemFromCart}
// // // //                   goToDetailPage={goToDetailPage}
// // // //                 />
// // // //               )}
// // // //               keyExtractor={item => item.item_id.toString()}
// // // //             />
// // // //           ) : (
// // // //             <Text style={styles.noItemsText}>No items found.</Text>
// // // //           )}
// // // //         </View>
// // // //       </ScrollView>
// // // //       {cartList.length > 0 && (
// // // //         <View style={styles.checkoutView}>
// // // //           <TouchableOpacity
// // // //             style={[styles.addToCartButton]}
// // // //             onPress={() => {
// // // //               navigation.navigate('CART', {items});
// // // //             }}>
// // // //             <Text
// // // //               style={{
// // // //                 color: '#fff',
// // // //                 fontWeight: '900',
// // // //                 gap: '8',
// // // //                 textAlign: 'center',
// // // //               }}>
// // // //               {'' + cartList.length + ' Items added  '}
// // // //               <Icon
// // // //                 name="arrow-circle-right"
// // // //                 size={16}
// // // //                 color="#fff"
// // // //                 style={{marginLeft: 1}}
// // // //               />
// // // //             </Text>
// // // //             <Text style={{color: '#fff', fontWeight: '600'}}>
// // // //               <Text>{cartList.length + ' items added!'}</Text>
// // // //               {/* Adding marginLeft for spacing */}
// // // //               <Text style={{marginLeft: 10}}>
// // // //                 {'  '}
// // // //                 {'You are saving ₹ ' + getTotal()}
// // // //               </Text>
// // // //             </Text>
// // // //           </TouchableOpacity>
// // // //         </View>
// // // //       )}
// // // //     </>
// // // //   );
// // // // };

// // // // // Styles
// // // // const styles = StyleSheet.create({
// // // //   container: {flex: 1, padding: 20, backgroundColor: '#fff'},
// // // //   searchContainer: {marginBottom: 20},
// // // //   searchBar: {
// // // //     height: 40,
// // // //     borderColor: '#ccc',
// // // //     borderWidth: 1,
// // // //     borderRadius: 5,
// // // //     paddingHorizontal: 10,
// // // //   },
// // // //   filterContainer: {flexDirection: 'row', marginBottom: 20},
// // // //   filterButton: {padding: 10, borderRadius: 5, marginRight: 10},
// // // //   activeFilter: {backgroundColor: '#D97B29'},
// // // //   filterText: {color: '#000'},
// // // //   itemList: {flex: 1},
// // // //   noItemsText: {textAlign: 'center', marginTop: 20},
// // // //   checkoutView: {
// // // //     padding: 15,
// // // //     backgroundColor: '#D97B29',
// // // //     borderRadius: 5,
// // // //     marginTop: 20,
// // // //     alignItems: 'center',
// // // //   },
// // // //   item: {
// // // //     flexDirection: 'row',
// // // //     padding: 10,
// // // //     backgroundColor: '#f9f9f9',
// // // //     marginBottom: 10,
// // // //     borderRadius: 5,
// // // //   },
// // // //   pressable: {flexDirection: 'row', flex: 1},
// // // //   infoContainer: {flex: 1, marginRight: 10},
// // // //   itemName: {fontWeight: 'bold', fontSize: 16},
// // // //   itemPrice: {fontWeight: 'bold', fontSize: 14},
// // // //   itemDescription: {fontSize: 12, color: '#666'},
// // // //   iconContainer: {position: 'absolute', right: 0, top: 5},
// // // //   salesCount: {marginTop: 10, fontSize: 12, color: '#888'},
// // // //   itemImage: {width: 100, height: 100, borderRadius: 10},
// // // //   addToCartButton: {
// // // //     backgroundColor: '#D97B29',
// // // //     padding: 10,
// // // //     borderRadius: 5,
// // // //     alignItems: 'center',
// // // //   },
// // // //   quantityControl: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
// // // //   controlText: {fontSize: 18, marginHorizontal: 10},
// // // //   quantityText: {fontSize: 18},
// // // //   loader: {flex: 1, justifyContent: 'center'},
// // // //   errorText: {textAlign: 'center', color: 'red'},
// // // // });

// // // // export default SearchScreen;

// // import React, { useState, useEffect, useCallback } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   FlatList,
// //   Image,
// //   ScrollView,
// //   TextInput,
// //   Pressable,
// //   ActivityIndicator
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import axios from 'axios';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import { debounce } from 'lodash';
// // import Icon from 'react-native-vector-icons/MaterialIcons';
// // // API URL
// // const API_URL = 'http://10.0.2.2:8083/items/get/allitem';
// // const IMAGE_API_URL = item_id => `http://10.0.2.2:8083/items/add-item_photo/${item_id}`;

// // // ItemCard Component
// // const ItemCard = React.memo(({ item, addItems, addItemToCart, removeItemFromCart, goToDetailPage }) => (
// //   <View style={styles.item}>
// //     <Pressable style={styles.pressable} onPress={() => goToDetailPage(item)}>
// //       <View style={styles.infoContainer}>
// //         <Text style={styles.itemName}>{item.itemname}</Text>
// //         <Text style={styles.itemPrice}>₹{item.price}</Text>
// //         <Text style={styles.itemDescription}>
// //           {item.description?.length > 40 ? `${item.description.slice(0, 40)}...` : item.description}
// //         </Text>
// //         <TouchableOpacity onPress={() => goToDetailPage(item)} style={styles.iconContainer}>
// //           <Ionicons name="arrow-redo-circle-outline" size={25} color="#D97B29" />
// //         </TouchableOpacity>
// //       </View>
// //       <View>
// //         <Image
// //           source={{ uri: IMAGE_API_URL(item.item_id) }}
// //           style={styles.itemImage}
// //           onError={() => console.log('Error loading image')}
// //         />
// //         {addItems[item.item_id] ? (
// //           <QuantityControl
// //             item_id={item.item_id}
// //             quantity={addItems[item.item_id]}
// //             addItemToCart={addItemToCart}
// //             removeItemFromCart={removeItemFromCart}
// //           />
// //         ) : (
// //           <Pressable onPress={() => addItemToCart(item.item_id)} style={styles.addToCartButton}>
// //             <Text style={styles.controlText}>Add</Text>
// //           </Pressable>
// //         )}
// //       </View>
// //     </Pressable>
// //   </View>
// // ));

// // // QuantityControl Component
// // const QuantityControl = React.memo(({ item_id, quantity, addItemToCart, removeItemFromCart }) => (
// //   <View style={styles.quantityControl}>
// //     <Pressable onPress={() => removeItemFromCart(item_id)}>
// //       <Text style={styles.controlText}>-</Text>
// //     </Pressable>
// //     <Text style={styles.quantityText}>{quantity}</Text>
// //     <Pressable onPress={() => addItemToCart(item_id)}>
// //       <Text style={styles.controlText}>+</Text>
// //     </Pressable>
// //   </View>
// // ));

// // // SearchScreen Component
// // const SearchScreen = () => {
// //   const [items, setItems] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [addItems, setAddItems] = useState({});
// //   const [filter, setFilter] = useState('all');
// //   const navigation = useNavigation();

// //   const fetchItems = useCallback(async () => {
// //     setLoading(true);
// //     setError('');
// //     try {
// //       const response = await axios.get(API_URL);
// //       setItems(response.data || []);
// //     } catch (err) {
// //       setError('Error fetching items. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchItems();
// //   }, [fetchItems]);

// //   const handleSearch = useCallback(
// //     debounce(text => {
// //       setSearchQuery(text || ''); // Ensure it's always a string
// //     }, 300),
// //     [],
// //   );

// //   // Function to filter items based on search and category
// //   const getFilteredItems = () => {
// //     const lowerCaseQuery = (searchQuery || '').toLowerCase();
// //     let filtered = items.filter(item => item.itemname && item.itemname.toLowerCase().includes(lowerCaseQuery));

// //     if (filter === 'veg') {
// //       return filtered.filter(item => item.category === 'veg');
// //     } else if (filter === 'non-veg') {
// //       return filtered.filter(item => item.category === 'nonVeg');
// //     }
// //     return filtered;
// //   };

// //   const addItemToCart = item_id => {
// //     setAddItems(prevItems => ({
// //       ...prevItems,
// //       [item_id]: (prevItems[item_id] || 0) + 1,
// //     }));
// //   };

// //   const removeItemFromCart = item_id => {
// //     setAddItems(prevItems => {
// //       const updatedItems = { ...prevItems };
// //       if (updatedItems[item_id] > 1) {
// //         updatedItems[item_id]--;
// //       } else {
// //         delete updatedItems[item_id];
// //       }
// //       return updatedItems;
// //     });
// //   };

// //   const goToDetailPage = item => {
// //     navigation.navigate('DetailsScreen', { item });
// //   };

// //   const getTotal = () => {
// //     return Object.entries(addItems).reduce((total, [item_id, quantity]) => {
// //       const item = items.find(item => item.item_id === item_id);
// //       return total + (item ? item.price * quantity : 0);
// //     }, 0);
// //   };

// //   const cartList = Object.entries(addItems).filter(([_, quantity]) => quantity > 0);
// //   const filteredItems = getFilteredItems(); // Filtered items based on search and category

// //   if (loading) {
// //     return <ActivityIndicator size="large" color="#D97B29" style={styles.loader} />;
// //   }

// //   if (error) {
// //     return <Text style={styles.errorText}>{error}</Text>;
// //   }

// //   return (
// //     <>
// //       <ScrollView style={styles.container}>
// //       <Text style={styles.title}>Delicious Food Awaits!</Text>
// //         <View style={styles.searchContainer}>
// //           <TextInput
// //             style={styles.searchBar}
// //             placeholder="Search items..."
// //             value={searchQuery}
// //             onChangeText={handleSearch}
// //           />
// //           <TouchableOpacity
// //           // onPress={handleFilter}
// //           style={styles.filterButton}>
// //           <Icon name="filter-list" size={24} color="#D97B29" />
// //         </TouchableOpacity>
// //         </View>

// //         <View style={styles.filterContainer}>
// //           {['all', 'veg', 'non-veg'].map(type => (
// //             <TouchableOpacity
// //               key={type}
// //               onPress={() => setFilter(type)}
// //               style={[
// //                 styles.filterButton,
// //                 filter === type && styles.activeFilter,
// //               ]}>
// //               <Text style={styles.filterText}>
// //                 {type.charAt(0).toUpperCase() + type.slice(1)}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>

// //         <View style={styles.itemList}>
// //           {filteredItems.length > 0 ? (
// //             <FlatList
// //               data={filteredItems}
// //               renderItem={({ item }) => (
// //                 <ItemCard
// //                   item={item}
// //                   addItems={addItems}
// //                   addItemToCart={addItemToCart}
// //                   removeItemFromCart={removeItemFromCart}
// //                   goToDetailPage={goToDetailPage}
// //                 />
// //               )}
// //               keyExtractor={item => item.item_id.toString()}
// //             />
// //           ) : (
// //             <Text style={styles.noItemsText}>No items found.</Text>
// //           )}
// //         </View>
// //       </ScrollView>
// //       {cartList.length > 0 && (
// //         <View style={styles.checkoutView}>
// //           <TouchableOpacity
// //             style={[styles.addToCartButton]}
// //             onPress={() => navigation.navigate('CART', { items })}>
// //             <Text style={styles.cartText}>
// //               {cartList.length + ' Items added  '}
// //               <Ionicons name="arrow-forward" size={16} color="#fff" />
// //             </Text>
// //             <Text style={styles.savingsText}>
// //               {'You are saving ₹ ' + getTotal()}
// //             </Text>
// //           </TouchableOpacity>
// //         </View>
// //       )}
// //     </>
// //   );
// // };

// // // Styles
// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
// //   searchContainer: { marginBottom: 20 },
// //   searchBar: {
// //     height: 40,
// //     borderColor: '#ccc',
// //     borderWidth: 1,
// //     borderRadius: 25,
// //     paddingHorizontal: 10,
// //   },
// //   filterContainer: { flexDirection: 'row', marginBottom: 20 },
// //   filterButton: { padding: 10, borderRadius: 5, marginRight: 10 },
// //   activeFilter: { backgroundColor: '#D97B29' },
// //   filterText: { color: '#000' },
// //   itemList: { flex: 1 },
// //   noItemsText: { textAlign: 'center', marginTop: 20 },
// //   checkoutView: {
// //     padding: 15,
// //     backgroundColor: '#D97B29',
// //     borderRadius: 10,
// //     margin: 20,
// //   },
// //   addToCartButton: {
// //     padding: 10,
// //     backgroundColor: '#D97B29',
// //     borderRadius: 5,
// //     alignItems: 'center',
// //   },
// //   item: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 10,
// //     marginBottom: 15,
// //     overflow: 'hidden',
// //     backgroundColor: '#f9f9f9',
// //   },
// //   pressable: { flexDirection: 'row' },
// //   infoContainer: { flex: 1, padding: 10 },
// //   itemName: { fontWeight: 'bold', fontSize: 18 },
// //   itemPrice: { color: '#D97B29', fontSize: 16, marginTop: 5 },
// //   itemDescription: { color: '#666', marginTop: 5 },
// //   iconContainer: { alignSelf: 'flex-end' },
// //   itemImage: { width: '100%', height: 150 },
// //   quantityControl: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     padding: 10,
// //     backgroundColor: '#D9E7F4',
// //   },
// //   quantityText: { fontSize: 18 },
// //   controlText: { fontSize: 20, color: '#D97B29' },
// //   loader: { flex: 1, justifyContent: 'center' },
// //   errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
// //   cartText: { color: '#fff', fontSize: 18 },
// //   savingsText: { color: '#fff', fontSize: 14 },
// // });

// // export default SearchScreen;

// // import React, { useState, useEffect, useCallback } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   FlatList,
// //   Image,
// //   ScrollView,
// //   TextInput,
// //   Pressable,
// //   ActivityIndicator
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import axios from 'axios';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import { debounce } from 'lodash';

// // // API URL
// // const API_URL = 'http://10.0.2.2:8083/items/get/allitem';
// // const IMAGE_API_URL = item_id => `http://10.0.2.2:8083/items/add-item_photo/${item_id}`;

// // // ItemCard Component
// // const ItemCard = React.memo(({ item, addItems, addItemToCart, removeItemFromCart, goToDetailPage }) => (
// //   <View style={styles.item}>
// //     <Pressable style={styles.pressable} onPress={() => goToDetailPage(item)}>
// //       <View style={styles.infoContainer}>
// //         <Text style={styles.itemName}>{item.itemname}</Text>
// //         <Text style={styles.itemPrice}>₹{item.price}</Text>
// //         <Text style={styles.itemDescription}>
// //           {item.description?.length > 40 ? `${item.description.slice(0, 40)}...` : item.description}
// //         </Text>
// //         <TouchableOpacity onPress={() => goToDetailPage(item)} style={styles.iconContainer}>
// //           <Ionicons name="arrow-redo-circle-outline" size={25} color="#D97B29" />
// //         </TouchableOpacity>
// //       </View>
// //       <View>
// //         <Image
// //           source={{ uri: IMAGE_API_URL(item.item_id) }}
// //           style={styles.itemImage}
// //           onError={() => console.log('Error loading image')}
// //         />
// //         {addItems[item.item_id] ? (
// //           <QuantityControl
// //             item_id={item.item_id}
// //             quantity={addItems[item.item_id]}
// //             addItemToCart={addItemToCart}
// //             removeItemFromCart={removeItemFromCart}
// //           />
// //         ) : (
// //           <Pressable onPress={() => addItemToCart(item.item_id)} style={styles.addToCartButton}>
// //             <Text style={styles.controlText}>Add</Text>
// //           </Pressable>
// //         )}
// //       </View>
// //     </Pressable>
// //   </View>
// // ));

// // // QuantityControl Component
// // const QuantityControl = React.memo(({ item_id, quantity, addItemToCart, removeItemFromCart }) => (
// //   <View style={styles.quantityControl}>
// //     <Pressable onPress={() => removeItemFromCart(item_id)}>
// //       <Text style={styles.controlText}>-</Text>
// //     </Pressable>
// //     <Text style={styles.quantityText}>{quantity}</Text>
// //     <Pressable onPress={() => addItemToCart(item_id)}>
// //       <Text style={styles.controlText}>+</Text>
// //     </Pressable>
// //   </View>
// // ));

// // // SearchScreen Component
// // const SearchScreen = () => {
// //   const [items, setItems] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [addItems, setAddItems] = useState({});
// //   const [filter, setFilter] = useState('all');
// //   const [showMenu, setShowMenu] = useState(false); // State to show/hide the category menu
// //   const navigation = useNavigation();

// //   const fetchItems = useCallback(async () => {
// //     setLoading(true);
// //     setError('');
// //     try {
// //       const response = await axios.get(API_URL);
// //       setItems(response.data || []);
// //     } catch (err) {
// //       setError('Error fetching items. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchItems();
// //   }, [fetchItems]);

// //   const handleSearch = useCallback(
// //     debounce(text => {
// //       setSearchQuery(text || ''); // Ensure it's always a string
// //     }, 300),
// //     [],
// //   );

// //   // Function to filter items based on search and category
// //   const getFilteredItems = () => {
// //     const lowerCaseQuery = (searchQuery || '').toLowerCase();
// //     let filtered = items.filter(item => item.itemname && item.itemname.toLowerCase().includes(lowerCaseQuery));

// //     if (filter === 'veg') {
// //       return filtered.filter(item => item.category === 'veg');
// //     } else if (filter === 'non-veg') {
// //       return filtered.filter(item => item.category === 'nonVeg');
// //     }
// //     return filtered;
// //   };

// //   const addItemToCart = item_id => {
// //     setAddItems(prevItems => ({
// //       ...prevItems,
// //       [item_id]: (prevItems[item_id] || 0) + 1,
// //     }));
// //   };

// //   const removeItemFromCart = item_id => {
// //     setAddItems(prevItems => {
// //       const updatedItems = { ...prevItems };
// //       if (updatedItems[item_id] > 1) {
// //         updatedItems[item_id]--;
// //       } else {
// //         delete updatedItems[item_id];
// //       }
// //       return updatedItems;
// //     });
// //   };

// //   const goToDetailPage = item => {
// //     navigation.navigate('DetailsScreen', { item });
// //   };

// //   const getTotal = () => {
// //     return Object.entries(addItems).reduce((total, [item_id, quantity]) => {
// //       const item = items.find(item => item.item_id === item_id);
// //       return total + (item ? item.price * quantity : 0);
// //     }, 0);
// //   };

// //   const cartList = Object.entries(addItems).filter(([_, quantity]) => quantity > 0);
// //   const filteredItems = getFilteredItems(); // Filtered items based on search and category

// //   if (loading) {
// //     return <ActivityIndicator size="large" color="#D97B29" style={styles.loader} />;
// //   }

// //   if (error) {
// //     return <Text style={styles.errorText}>{error}</Text>;
// //   }

// //   return (
// //     <>
// //       <ScrollView style={styles.container}>
// //         <View style={styles.searchContainer}>
// //           <TextInput
// //             style={styles.searchBar}
// //             placeholder="Search items..."
// //             value={searchQuery}
// //             onChangeText={handleSearch}
// //           />
// //         </View>

// //         <TouchableOpacity style={styles.menuButton} onPress={() => setShowMenu(!showMenu)}>
// //           <Text style={styles.menuButtonText}>Menu</Text>
// //           <Ionicons name={showMenu ? "chevron-up" : "chevron-down"} size={20} color="#D97B29" />
// //         </TouchableOpacity>

// //         {showMenu && (
// //           <View style={styles.filterContainer}>
// //             {['all', 'veg', 'non-veg'].map(type => (
// //               <TouchableOpacity
// //                 key={type}
// //                 onPress={() => {
// //                   setFilter(type);
// //                   setShowMenu(false); // Hide menu after selecting a filter
// //                 }}
// //                 style={[
// //                   styles.filterButton,
// //                   filter === type && styles.activeFilter,
// //                 ]}>
// //                 <Text style={styles.filterText}>
// //                   {type.charAt(0).toUpperCase() + type.slice(1)}
// //                 </Text>
// //               </TouchableOpacity>
// //             ))}
// //           </View>
// //         )}

// //         <View style={styles.itemList}>
// //           {filteredItems.length > 0 ? (
// //             <FlatList
// //               data={filteredItems}
// //               renderItem={({ item }) => (
// //                 <ItemCard
// //                   item={item}
// //                   addItems={addItems}
// //                   addItemToCart={addItemToCart}
// //                   removeItemFromCart={removeItemFromCart}
// //                   goToDetailPage={goToDetailPage}
// //                 />
// //               )}
// //               keyExtractor={item => item.item_id.toString()}
// //             />
// //           ) : (
// //             <Text style={styles.noItemsText}>No items found.</Text>
// //           )}
// //         </View>
// //       </ScrollView>
// //       {cartList.length > 0 && (
// //         <View style={styles.checkoutView}>
// //           <TouchableOpacity
// //             style={[styles.addToCartButton]}
// //             onPress={() => navigation.navigate('CART', { items })}>
// //             <Text style={styles.cartText}>
// //               {cartList.length + ' Items added  '}
// //               <Ionicons name="arrow-forward" size={16} color="#fff" />
// //             </Text>
// //             <Text style={styles.savingsText}>
// //               {'You are saving ₹ ' + getTotal()}
// //             </Text>
// //           </TouchableOpacity>
// //         </View>
// //       )}
// //     </>
// //   );
// // };

// // // Styles
// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
// //   searchContainer: { marginBottom: 20 },
// //   searchBar: {
// //     height: 40,
// //     borderColor: '#ccc',
// //     borderWidth: 1,
// //     borderRadius: 5,
// //     paddingHorizontal: 10,
// //   },
// //   menuButton: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //   },
// //   menuButtonText: {
// //     fontSize: 18,
// //     color: '#D97B29',
// //     marginRight: 5,
// //   },
// //   filterContainer: {
// //     flexDirection: 'row',
// //     marginBottom: 10,
// //   },
// //   filterButton: {
// //     marginRight: 10,
// //     paddingVertical: 5,
// //     paddingHorizontal: 10,
// //     borderRadius: 5,
// //     backgroundColor: '#f0f0f0',
// //   },
// //   filterText: {
// //     color: '#333',
// //   },
// //   activeFilter: {
// //     backgroundColor: '#D97B29',
// //   },
// //   itemList: { flex: 1 },
// //   noItemsText: { textAlign: 'center', marginTop: 20 },
// //   loader: { flex: 1, justifyContent: 'center' },
// //   item: {
// //     flexDirection: 'row',
// //     padding: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#ccc',
// //   },
// //   infoContainer: { flex: 1, paddingRight: 10 },
// //   itemImage: { width: 100, height: 100, borderRadius: 5 },
// //   itemName: { fontSize: 16, fontWeight: 'bold' },
// //   itemPrice: { fontSize: 14, color: '#D97B29' },
// //   itemDescription: { fontSize: 12, color: '#555' },
// //   iconContainer: { alignSelf: 'flex-end' },
// //   addToCartButton: {
// //     backgroundColor: '#D97B29',
// //     padding: 10,
// //     borderRadius: 5,
// //     alignItems: 'center',
// //   },
// //   quantityControl: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   controlText: {
// //     fontSize: 20,
// //     padding: 10,
// //     color: '#fff',
// //   },
// //   quantityText: {
// //     fontSize: 16,
// //     marginHorizontal: 10,
// //   },
// //   checkoutView: {
// //     backgroundColor: '#D97B29',
// //     padding: 15,
// //     alignItems: 'center',
// //   },
// //   cartText: {
// //     color: '#fff',
// //     fontSize: 18,
// //   },
// //   savingsText: {
// //     color: '#fff',
// //     fontSize: 14,
// //   },
// // });

// // export default SearchScreen;

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
  Modal,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {debounce} from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';

// API URL
const API_URL = 'http://10.0.2.2:8083/items/get/allitem';
const IMAGE_API_URL = item_id =>
  `http://10.0.2.2:8083/items/add-item_photo/${item_id}`;

// ItemCard Component
const ItemCard = React.memo(
  ({item, addItems, addItemToCart, removeItemFromCart, goToDetailPage}) => (
    <View style={styles.item}>
      <Pressable style={styles.pressable} onPress={() => goToDetailPage(item)}>
        <View style={styles.infoContainer}>
          <Text style={styles.itemName}>{item.itemname}</Text>
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
        </View>
        <View>
          <Image
            source={{uri: IMAGE_API_URL(item.item_id)}}
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
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const categories = [
    'all',
    'Chaat',
    'Pani Puri',
    'Sudindisch',
    'Nachtisch',
    'Wein',
    'Saft/Schorle',
    'Indo-Chinesisch',
    'Mittagsmenu',
    'Kaltes Getrank',
    'Dinner Menu',
  ];

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
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSearch = useCallback(
    debounce(text => {
      setSearchQuery(text || ''); // Ensure it's always a string
    }, 300),
    [],
  );

  // Function to filter items based on search and category
  const getFilteredItems = () => {
    const lowerCaseQuery = (searchQuery || '').toLowerCase();
    let filtered = items.filter(
      item =>
        item.itemname && item.itemname.toLowerCase().includes(lowerCaseQuery),
    );

    if (filter === 'all') {
      return filtered; // Return all filtered items
    } else {
      return filtered.filter(item => item.category === filter);
    }
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
  const filteredItems = getFilteredItems(); // Filtered items based on search and category

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#D97B29" style={styles.loader} />
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Delicious Food Awaits!</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search items..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setModalVisible(true)} // Show modal on press
          >
            <Icon name="filter-list" size={24} color="#D97B29" />
          </TouchableOpacity>
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
              keyExtractor={item => item.item_id.toString()}
            />
          ) : (
            <Text style={styles.noItemsText}>No items found.</Text>
          )}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Category</Text>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={styles.modalOption}
                onPress={() => {
                  setFilter(category);
                  setModalVisible(false);
                }}>
                <Text style={styles.modalOptionText}>{category}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {cartList.length > 0 && (
        <View style={styles.checkoutView}>
          <TouchableOpacity
            style={[styles.addToCartButton]}
            onPress={() => navigation.navigate('CART', {items})}>
            <Text style={styles.cartText}>
              {cartList.length + ' Items added  '}
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </Text>
            <Text style={styles.savingsText}>
              {'You are saving ₹ ' + getTotal()}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D97B29',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingLeft: 10,
  },
  itemList: {marginBottom: 70},
  item: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#D97B29', // Your desired background color
    borderRadius: 25,           // Rounded corners
    paddingVertical: 10,        // Vertical padding
    paddingHorizontal: 20,      // Horizontal padding
    alignItems: 'center',       // Center text horizontally
    marginTop: 20,              // Spacing from other elements
  },
  closeButtonText: {
    color: '#fff',              // Text color
    fontWeight: 'bold',         // Bold text
    fontSize: 16,               // Text size
  },
  pressable: {flexDirection: 'row', flex: 1},
  infoContainer: {flex: 1, padding: 10},
  itemImage: {width: 100, height: 100, borderRadius: 10},
  itemName: {fontSize: 18, fontWeight: 'bold'},
  itemPrice: {fontSize: 16, color: '#D97B29'},
  itemDescription: {fontSize: 14, color: '#555'},
  controlText: {fontSize: 20, paddingHorizontal: 10},
  quantityControl: {flexDirection: 'row', alignItems: 'center'},
  quantityText: {fontSize: 18, marginHorizontal: 10},
  addToCartButton: {
    backgroundColor: '#D97B29',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  checkoutView: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#D97B29',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  cartText: {color: '#fff', fontWeight: 'bold'},
  savingsText: {color: '#fff', fontSize: 12},
  noItemsText: {textAlign: 'center', fontSize: 18, color: '#555'},
  loader: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  errorText: {color: 'red', textAlign: 'center'},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 20},
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  modalOptionText: {fontSize: 16},
});

export default SearchScreen;
