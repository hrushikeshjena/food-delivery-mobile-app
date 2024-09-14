import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import axios from 'axios';
import FoodItem from '../components/FoodItem';

const SearchScreen = () => {
  const [vegItems, setVegItems] = useState([]);
  const [nonVegItems, setNonVegItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVegItems, setFilteredVegItems] = useState([]);
  const [filteredNonVegItems, setFilteredNonVegItems] = useState([]);

  const menu = [
    {
      id: '20',
      name: 'Recommended',
      items: [
        {
          id: '101',
          name: 'Chicken Tikka',
          price: 15.99,
          description:
            'This is served with Raita and gravy and has loaded with chill paste mixed chicken kebabs',
          rating: 5,
          ratings: 43,
          image:
            'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_960_720.jpg',
          veg: false,
          bestSeller: false,
          quantity: 1,
        },
        {
          id: '102',
          name: 'Paneer Butter Masala',
          price: 12.99,
          description:
            'A rich and creamy dish made with tender paneer cubes in a smooth tomato-based sauce',
          rating: 4.8,
          ratings: 56,
          image:
            'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_960_720.jpg',
          veg: true,
          bestSeller: true,
          quantity: 1,
        },
        {
          id: '103',
          name: 'Lamb Rogan Josh',
          price: 18.99,
          description:
            'A traditional Kashmiri dish with tender lamb cooked in aromatic spices and yogurt',
          rating: 4.6,
          ratings: 32,
          image:
            'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_960_720.jpg',
          veg: false,
          bestSeller: false,
          quantity: 1,
        },
        {
          id: '104',
          name: 'Vegetable Biryani',
          price: 10.99,
          description:
            'A fragrant rice dish cooked with mixed vegetables and flavorful spices',
          rating: 4.9,
          ratings: 78,
          image:
            'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_960_720.jpg',
          veg: true,
          bestSeller: true,
          quantity: 1,
        },
      ],
    },
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://yourapi.com/items');
      const items = response.data;
      const veg = items.filter(item => item.category === 'Veg');
      const nonVeg = items.filter(item => item.category === 'Non-Veg');
      setVegItems(veg);
      setNonVegItems(nonVeg);
      setFilteredVegItems(veg);
      setFilteredNonVegItems(nonVeg);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    const filteredVeg = vegItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    const filteredNonVeg = nonVegItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    setFilteredVegItems(filteredVeg);
    setFilteredNonVegItems(filteredNonVeg);
  };

  // const renderItem = ({item}) => (
  //   <View style={styles.card}>
  //     {item.imageUrl ? (
  //       <Image source={{uri: item.imageUrl}} style={styles.image} />
  //     ) : null}
  //     <Text style={styles.title}>{item.name}</Text>
  //     <Text style={styles.price}>${item.price}</Text>
  //     <Text style={styles.description}>{item.description}</Text>
  //   </View>
  // );

  const renderItem = ({item}) => (
    <View style={styles.card}>
      {item.image ? (
        <Image source={{uri: item.image}} style={styles.image} />
      ) : null}
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search items..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Veg Category */}
      {filteredVegItems.length > 0 && (
        <View>
          <Text style={styles.categoryHeader}>Veg Items</Text>
          <FlatList
            data={filteredVegItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.list}
          />
        </View>
      )}

      {/* Non-Veg Category */}
      {filteredNonVegItems.length > 0 && (
        <View>
          <Text style={styles.categoryHeader}>Non-Veg Items</Text>
          <FlatList
            data={filteredNonVegItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.list}
          />
        </View>
      )}

      <View>
        {menu.map((item, index) => (
          <FoodItem key={index} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#5246f2',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  categoryHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingLeft: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#D97B29',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SearchScreen;
