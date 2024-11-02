import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';

const FindFlavour = () => {
  const items = [
    {id: '1', name: 'Chaat-Element', image: require('../assets/food1.jpg')},
    {id: '2', name: 'Pani Puri', image: require('../assets/food1.jpg')},
    {id: '3', name: 'Sudindisch', image: require('../assets/food1.jpg')},
    {id: '3', name: 'Indo-Chinesisch', image: require('../assets/food1.jpg')},
    {id: '3', name: 'Mittagsmenu', image: require('../assets/food1.jpg')},
    {
      id: '3',
      name: 'Reis & Indisches Brot',
      image: require('../assets/food1.jpg'),
    },
    {id: '3', name: 'Dinner Menu', image: require('../assets/food1.jpg')},
    {id: '3', name: 'Getranke', image: require('../assets/food1.jpg')},
    {id: '3', name: 'Kaltes Getrank', image: require('../assets/food1.jpg')},
    {id: '3', name: 'Saft/Schorle', image: require('../assets/food1.jpg')},
    {id: '3', name: 'Wein', image: require('../assets/food1.jpg')},
    {id: '3', name: 'Nachtisch', image: require('../assets/food1.jpg')},
    {id: '3', name: 'Sudindisch', image: require('../assets/food1.jpg')},
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
    alignItems: 'center',
  },
  button: {
    marginRight: 20,
  },
  categoryItem: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
});

export default FindFlavour;
