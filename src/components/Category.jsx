import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';

const Category = () => {
  const items = [
    {id: '1', name: 'Deals', image: require('../assets/food1.jpg')},
    {id: '2', name: 'Resturants', image: require('../assets/food1.jpg')},
    {id: '3', name: 'Bakery', image: require('../assets/food1.jpg')},
  ];

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity activeOpacity={0.8} style={styles.button}>
            <View style={styles.categoryItem}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    padding: 10,
    alignItems: 'left',
  },
  button: {
    marginRight: 20, // Space between items
  },
  categoryItem: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center', // Center the image and text
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 5, // Space between image and text
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
});

export default Category;
