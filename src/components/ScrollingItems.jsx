/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ItemsComponents from './ItemsComponents';

const recommended = [
  {
    id: 0,
    name: 'Nandhana Place',
    image: '../assets/close.jpg',
    time: '35-40 mins',
    type: 'Andhra',
    rating: 4.5,
    isFavorite: false,
    distance: '2.5 km',
    priceLevel: '$$',
    description: 'Popular for authentic Andhra cuisine with spicy delicacies.',
  },
  {
    id: 1,
    name: 'Malgudi Days',
    image: 'https://example.com/malgudi-days.jpg',
    time: '25-30 mins',
    type: 'South Indian',
    rating: 4.7,
    isFavorite: true,
    distance: '1.8 km',
    priceLevel: '$$',
    description:
      'A cozy spot serving traditional South Indian dishes with modern twists.',
  },
  {
    id: 2,
    name: 'Spice Junction',
    image: 'https://example.com/spice-junction.jpg',
    type: 'North Indian',
    rating: 4.3,
    isFavorite: false,
    distance: '3.2 km',
    priceLevel: '$$$',
    description:
      'Known for rich North Indian curries and an elegant dining experience.',
  },
  {
    id: 3,
    name: 'Spice Junction',
    image: 'https://example.com/spice-junction.jpg',
    type: 'North Indian',
    rating: 4.3,
    isFavorite: false,
    distance: '3.2 km',
    priceLevel: '$$$',
    description:
      'Known for rich North Indian curries and an elegant dining experience.',
  },
];

const items = [
  {
    id: 0,
    name: 'Offers',
    description: 'Up to 50% off',
    image: 'https://example.com/offers.jpg',
  },
  {
    id: 1,
    name: 'New Arrivals',
    description: 'Check out the latest additions',
    image: 'https://example.com/new-arrivals.jpg',
  },
  {
    id: 2,
    name: 'Best Sellers',
    description: 'Top-rated products you’ll love',
    image: 'https://example.com/best-sellers.jpg',
  },
  {
    id: 3,
    name: 'Seasonal Sale',
    description: 'Special discounts for the season',
    image: 'https://example.com/seasonal-sale.jpg',
  },
];

const itemDatas = [
  {
    id: 0,
    featured_image: 'https://example.com/featured-image.jpg',
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
];

// const cart = useSelector(state => state.cart.cart);
// console.log(cart);

const ScrollingItem = () => {
  return (
    <>
      <ScrollView style={styles.container}>
        {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}>
        {recommended?.map(item => (
          <View key={item.id} style={styles.card}>
            <Image style={styles.image} source={{uri: item.image}} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.timeContainer}>
                <Icon name="access-time" size={16} color="#666" />
                <Text style={styles.timeText}>{item.time} mins</Text>
              </View>
              <Text style={styles.type}>{item.type}</Text>
            </View>
          </View>
        ))}
      </ScrollView> */}

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
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
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
});

export default ScrollingItem;
