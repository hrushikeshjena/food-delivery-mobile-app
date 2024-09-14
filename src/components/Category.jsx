import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const Category = () => {
  const items = [
    {id: '1', name: 'fastest delivery'},
    {id: '2', name: 'rating 4.0+'},
    {id: '3', name: 'offers'},
    {id: '4', name: 'lorem'},
    {id: '5', name: 'lorem'},
    {id: '6', name: 'lorem'},
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
  },
  button: {
    marginRight: 10, // Space between items
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
