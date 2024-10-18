/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MenuItem from './MenuItem';

const FoodItem = ({item}) => {
  const data = [item];

  return (
    <View>
      {data?.map(item => (
        <Pressable
          key={item.id}
          style={{
            margin: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.text}>
            {item.name} ({item.items.length})
          </Text>
          {item?.items?.map(subItem => (
            <MenuItem key={subItem.id} item={subItem} /> // Unique key for MenuItem
          ))}
        </Pressable>
      ))}
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});
