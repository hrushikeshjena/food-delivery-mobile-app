import React, { useState, useEffect, useCallback } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { debounce } from 'lodash';

// API URL
const API_URL = 'http://10.0.2.2:8083/items/get/allitem';

const ItemCard = React.memo(({ item, addItems, addItemToCart, removeItemFromCart, goToDetailPage }) => (
  <View key={item.id} style={styles.item}>
    <Pressable style={styles.pressable} onPress={() => goToDetailPage(item)}>
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
        <Text style={styles.itemDescription}>
          {item.description.length > 40 ? `${item.description.slice(0, 40)}...` : item.description}
        </Text>
        <TouchableOpacity onPress={() => goToDetailPage(item)} style={styles.iconContainer}>
          <Ionicons name="arrow-redo-circle-outline" size={25} color="#D97B29" />
        </TouchableOpacity>
      </View>
      <View>
        <Image style={styles.itemImage} source={{ uri: item.image || 'default_image_url' }} />
        {addItems[item.id] ? (
          <View style={styles.quantityControl}>
            <Pressable onPress={() => removeItemFromCart(item.id)}>
              <Text style={styles.controlText}>-</Text>
            </Pressable>
            <Text style={styles.quantityText}>{addItems[item.id]}</Text>
            <Pressable onPress={() => addItemToCart(item.id)}>
              <Text style={styles.controlText}>+</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={() => addItemToCart(item.id)} style={styles.addToCartButton}>
            <Text style={styles.controlText}>Add</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  </View>
));

const SearchScreen = () => {
  const [vegItems, setVegItems] = useState([]);
  const [nonVegItems, setNonVegItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addItems, setAddItems] = useState({});
  const [filter, setFilter] = useState('all');
  const navigation = useNavigation();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      const items = response.data || [];
      const veg = items.filter(item => item.category === 'veg');
      const nonVeg = items.filter(item => item.category === 'non veg');

      setVegItems(veg);
      setNonVegItems(nonVeg);
      setFilteredItems([...veg, ...nonVeg]);
    } catch (err) {
      setError('Error fetching items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearch = useCallback(debounce(text => {
    setSearchQuery(text);
    const lowerCaseQuery = text.toLowerCase();
    const filtered = getFilteredItems(lowerCaseQuery);
    setFilteredItems(filtered);
  }, 300), [vegItems, nonVegItems, filter]);

  const getFilteredItems = (query) => {
    const allItems = [...vegItems, ...nonVegItems];
    const filtered = allItems.filter(item => 
      item.name.toLowerCase().includes(query)
    );

    // Apply category filter
    if (filter === 'veg') {
      return filtered.filter(item => item.category === 'veg');
    } else if (filter === 'non-veg') {
      return filtered.filter(item => item.category === 'non veg');
    }
    return filtered;
  };

  const addItemToCart = itemId => {
    setAddItems(prevItems => ({
      ...prevItems,
      [itemId]: (prevItems[itemId] || 0) + 1,
    }));
  };

  const removeItemFromCart = itemId => {
    setAddItems(prevItems => {
      const updatedItems = { ...prevItems };
      if (updatedItems[itemId] > 1) {
        updatedItems[itemId]--;
      } else {
        delete updatedItems[itemId];
      }
      return updatedItems;
    });
  };

  const goToDetailPage = item => {
    navigation.navigate('DetailsScreen', { item });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#D97B29" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container1}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search items..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilter('all')} style={[styles.filterButton, filter === 'all' && styles.activeFilter]}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('veg')} style={[styles.filterButton, filter === 'veg' && styles.activeFilter]}>
          <Text style={styles.filterText}>Veg</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('non-veg')} style={[styles.filterButton, filter === 'non-veg' && styles.activeFilter]}>
          <Text style={styles.filterText}>Non-Veg</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.itemList}>
        {filteredItems.length > 0 ? (
          <FlatList
            data={filteredItems}
            renderItem={({ item }) => (
              <ItemCard
                item={item}
                addItems={addItems}
                addItemToCart={addItemToCart}
                removeItemFromCart={removeItemFromCart}
                goToDetailPage={goToDetailPage}
              />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text style={styles.noItemsText}>No items found.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginRight: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#D97B29',
  },
  filterText: {
    fontSize: 16,
    color: '#333',
  },
  itemList: {
    padding: 10,
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
  item: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 15,
    marginTop: 5,
    color: '#D97B29',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  iconContainer: {
    marginTop: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  controlText: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#333',
  },
  quantityText: {
    fontSize: 20,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#D97B29',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;



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
//           placeholderTextColor="#c0c0c0"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <TouchableOpacity style={styles.button}  onPress={handleSearch}>
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
//     color:'#000',
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
