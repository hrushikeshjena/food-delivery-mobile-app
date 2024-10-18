
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
//         {
//           id: '103',
//           name: 'Lamb Biryani',
//           price: 18.99,
//           description:
//             'Fragrant basmati rice with tender lamb pieces, slow-cooked with spices',
//           rating: 4.7,
//           ratings: 32,
//           image:
//             'https://images.pexels.com/photos/17696654/pexels-photo-17696654/free-photo-of-rice-with-meat.jpeg?auto=compress&cs=tinysrgb&w=600',
//           veg: false,
//           bestSeller: true,
//           quantity: 1,
//         },
//         {
//           id: '104',
//           name: 'Dal Makhani',
//           price: 9.99,
//           description:
//             'Creamy black lentils simmered with butter and spices for a rich taste',
//           rating: 4.5,
//           ratings: 78,
//           image:
//             'https://images.pexels.com/photos/19834445/pexels-photo-19834445/free-photo-of-traditional-indian-dish-with-ingredients-on-table.jpeg?auto=compress&cs=tinysrgb&w=600',
//           veg: true,
//           bestSeller: false,
//           quantity: 1,
//         },
//         {
//           id: '105',
//           name: 'Tandoori Roti',
//           price: 2.99,
//           description:
//             'Whole wheat flatbread baked in a tandoor, served hot and crispy',
//           rating: 4.3,
//           ratings: 52,
//           image:
//             'https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=600',
//           veg: true,
//           bestSeller: false,
//           quantity: 1,
//         },
//         {
//           id: '106',
//           name: 'Fish Fry',
//           price: 14.99,
//           description:
//             'Crispy fried fish marinated with tangy spices and served with lemon wedges',
//           rating: 4.6,
//           ratings: 28,
//           image:
//             'https://images.pexels.com/photos/17628580/pexels-photo-17628580/free-photo-of-fried-shrimps-in-a-basket.jpeg?auto=compress&cs=tinysrgb&w=600',
//           veg: false,
//           bestSeller: false,
//           quantity: 1,
//         },
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
//       <Text style={styles.price}>€{item.price}</Text>
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
//           placeholderTextColor="gray"
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
