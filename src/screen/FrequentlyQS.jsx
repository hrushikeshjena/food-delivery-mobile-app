// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const FrequentlyQS = () => {
//   return (
//     <View>
//       <Text>FrequentlyQS</Text>
//     </View>
//   )
// }

// export default FrequentlyQS

// const styles = StyleSheet.create({})

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   ScrollView,
//   TextInput,
//   Pressable,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import axios from 'axios';
// import FoodItem from '../components/FoodItem';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const SearchScreen = () => {
//   const [vegItems, setVegItems] = useState([]);
//   const [nonVegItems, setNonVegItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredVegItems, setFilteredVegItems] = useState([]);
//   const [filteredNonVegItems, setFilteredNonVegItems] = useState([]);
//   const [wishlist, setWishlist] = useState([]);

//   const navigation = useNavigation();

//   const handleAddToWishlist = item => {
//     setWishlist(prevWishlist => [...prevWishlist, item]);
//   };

//   const menu = [
//     {
//       id: '20',
//       name: 'Recommended',
//       items: [
//         {
//           id: '101',
//           name: 'Chicken Tikka',
//           price: 15.99,
//           description:
//             'Served with Raita and gravy, loaded with chill paste mixed chicken kebabs',
//           rating: 5,
//           ratings: 43,
//           image:
//             'https://cdn.pixabay.com/photo/2018/12/04/16/49/tandoori-3856045_640.jpg',
//           veg: false,
//           bestSeller: false,
//           quantity: 1,
//         },
//         {
//           id: '102',
//           name: 'Paneer Butter Masala',
//           price: 12.99,
//           description:
//             'Rich and creamy dish with tender paneer cubes in smooth tomato-based sauce',
//           rating: 4.8,
//           ratings: 56,
//           image:
//             'https://cdn.pixabay.com/photo/2022/03/02/12/42/paneer-7043099_640.jpg',
//           veg: true,
//           bestSeller: true,
//           quantity: 1,
//         },
//         // Other items...
//       ],
//     },
//   ];

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const response = await axios.get('http://yourapi.com/items');
//       const items = response.data;
//       const veg = items.filter(item => item.category === 'Veg');
//       const nonVeg = items.filter(item => item.category === 'Non-Veg');
//       setVegItems(veg);
//       setNonVegItems(nonVeg);
//       setFilteredVegItems(veg);
//       setFilteredNonVegItems(nonVeg);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSearch = () => {
//     const filteredVeg = vegItems.filter(item =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()),
//     );
//     const filteredNonVeg = nonVegItems.filter(item =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()),
//     );

//     setFilteredVegItems(filteredVeg);
//     setFilteredNonVegItems(filteredNonVeg);
//   };

//   const renderItem = ({item}) => (
//     <View style={styles.card}>
//       {item.image && <Image source={{uri: item.image}} style={styles.image} />}
//       <Text style={styles.title}>{item.name}</Text>
//       <Text style={styles.price}>₹{item.price}</Text>
//       <Text style={styles.description}>{item.description}</Text>
//       <View style={styles.actionsContainer}>
//         <TouchableOpacity
//           onPress={() => handleAddToWishlist(item)}
//           style={styles.wishlistButton}>
//           <Icon name="favorite-border" size={24} color="#D97B29" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('DetailsScreen', {item})}
//           style={styles.detailsButton}>
//           <Text style={styles.detailsButtonText}>Details</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchBar}
//           placeholder="Search items..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <TouchableOpacity style={styles.button} onPress={handleSearch}>
//           <Text style={styles.buttonText}>Search</Text>
//         </TouchableOpacity>
//       </View>

//       {filteredVegItems.length > 0 && (
//         <View>
//           <Text style={styles.categoryHeader}>Veg Items</Text>
//           <FlatList
//             data={filteredVegItems}
//             renderItem={renderItem}
//             keyExtractor={item => item.id.toString()}
//             contentContainerStyle={styles.list}
//           />
//         </View>
//       )}

//       {filteredNonVegItems.length > 0 && (
//         <View>
//           <Text style={styles.categoryHeader}>Non-Veg Items</Text>
//           <FlatList
//             data={filteredNonVegItems}
//             renderItem={renderItem}
//             keyExtractor={item => item.id.toString()}
//             contentContainerStyle={styles.list}
//           />
//         </View>
//       )}

//       <View>
//         {menu.map((menuItem, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => {
//               console.log(`Redirecting to details page for: ${menuItem.name}`);
//               navigation.navigate('DetailsScreen', {item: menuItem});
//             }}>
//             <FoodItem item={menuItem} />
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     marginTop: 10,
//   },
//   searchBar: {
//     flex: 1,
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingLeft: 10,
//     marginRight: 10,
//   },
//   list: {
//     padding: 10,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 10,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   price: {
//     fontSize: 16,
//     color: '#5246f2',
//     marginBottom: 5,
//   },
//   description: {
//     fontSize: 14,
//     color: '#333',
//   },
//   categoryHeader: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginVertical: 10,
//     paddingLeft: 10,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#D97B29',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   actionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   wishlistButton: {
//     padding: 5,
//   },
//   detailsButton: {
//     backgroundColor: '#D97B29',
//     borderRadius: 5,
//     padding: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   detailsButtonText: {
//     color: 'white',
//   },
// });

// export default SearchScreen;