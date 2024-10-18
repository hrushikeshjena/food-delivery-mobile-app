/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import ItemsComponents from './ItemsComponents';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const items = [
  {
    id: 0,
    name: 'Offers',
    description: 'Up to 50% off',
    icon: 'offer',
  },
  {
    id: 1,
    name: 'New Arrivals',
    description: 'Check out',
    icon: 'new-box',
  },
  {
    id: 2,
    name: 'Best Sellers',
    description: 'Top-rated',
    icon: 'star-circle',
  },
  {
    id: 3,
    name: 'Seasonal Sale',
    description: 'Special Discounts',
    icon: 'sale',
  },
];

const itemDatas = [
  {
    id: 0,
    name: 'Delicious Burrito',
    price: 9.99,
    category: 'Mexican',
    customerRating: 4.5,
    featured_image:
      'https://cdn.pixabay.com/photo/2017/06/29/20/09/mexican-2456038_960_720.jpg',
    images: [
      {
        id: 0,
        image: 'https://example.com/image1.jpg',
        description: 'Desi Burri',
      },
      {
        id: 1,
        image: 'https://example.com/image2.jpg',
        description: 'Desi Veggie',
      },
    ],
  },
  {
    id: 1,
    name: 'Tasty Pizza',
    price: 12.99,
    category: 'Italian',
    customerRating: 4.8,
    featured_image:
      'https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_640.jpg',
    images: [
      {
        id: 0,
        image: 'https://example.com/pizza1.jpg',
        description: 'Cheese Pizza',
      },
      {
        id: 1,
        image: 'https://example.com/pizza2.jpg',
        description: 'Pepperoni Pizza',
      },
    ],
  },
  {
    id: 2,
    name: 'Spicy Ramen',
    price: 8.99,
    category: 'Japanese',
    customerRating: 4.7,
    featured_image:
      'https://cdn.pixabay.com/photo/2022/06/02/18/22/ramen-7238668_640.jpg',
    images: [
      {
        id: 0,
        image: 'https://example.com/ramen1.jpg',
        description: 'Miso Ramen',
      },
      {
        id: 1,
        image: 'https://example.com/ramen2.jpg',
        description: 'Spicy Tonkotsu Ramen',
      },
    ],
  },
];

const ScrollingItem = () => {
  return (
    <>
      <ScrollView style={styles.container}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 7,
            letterSpacing: 4,
            marginBottom: 5,
            color: 'gray',
          }}>
          Explore
        </Text>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          {items?.map((item, index) => (
            <View
              key={index}
              style={{
                width: 90,
                borderColor: '#E0E0E0',
                borderWidth: 1,
                paddingVertical: 5,
                paddingHorizontal: 1,
                borderRadius: 5,
                marginLeft: 10,
                marginVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              <Image
                style={{width: 50, height: 50}}
                source={{uri: item.image}}
              />
              <Text style={{fontSize: 13, fontWeight: '500', marginTop: 6}}>
                {item.name}
              </Text>
              <Text style={{fontSize: 12, color: 'gray', marginTop: 3}}>
                {item.description}
              </Text>
            </View>
          ))}
        </ScrollView> */}
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          {items?.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              {/* Displaying Icon instead of Image */}
              <MaterialCommunityIcons
                name={item.icon}
                size={50}
                color="#D97B29"
              />

              {/* Item Name */}
              <Text style={styles.itemName}>{item.name}</Text>

              {/* Item Description */}
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          ))}
        </ScrollView>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 7,
            letterSpacing: 4,
            marginBottom: 5,
            color: 'gray',
          }}>
          All Food Items
        </Text>
        <View style={{marginHorizontal: 8}}>
          {itemDatas?.map((data, index) => (
            <ItemsComponents key={index} data={data} />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginRight: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 7,
  },
  info: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  timeText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  type: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  itemContainer: {
    width: 90,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  itemName: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 6,
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: 12,
    color: 'gray',
    marginTop: 3,
    textAlign: 'center',
  },
});

export default ScrollingItem;
