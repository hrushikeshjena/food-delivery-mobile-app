import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const Category = () => {
  const items = [
    {id: '1', name: 'Fastest Delivery'},
    {id: '2', name: 'Rating 4.0+'},
    {id: '3', name: 'Offers'},
  ];

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity activeOpacity={0.8} style={styles.button}>
              <View style={styles.categoryItem}>
                <Text style={styles.text}>{item?.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
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
    marginRight: 20, // Space between items
  },
  categoryItem: {
    padding: 10,
    backgroundColor: '#D97B29',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Category;
