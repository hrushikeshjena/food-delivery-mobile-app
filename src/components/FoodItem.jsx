import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuItem from './MenuItem';

const FoodItem = ({item}) => {
  const data = [item];

  return (
    <View>
      {data?.map(item => (
        <Pressable
          key={item.id} // Use a unique key if available
          style={{
            margin: 10,
            // flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.text}>
            {item?.name} ({item?.items?.length})
          </Text>
          {/* <Ionicons name="chevron-down" size={20} color="#000" /> */}
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
  },
});
