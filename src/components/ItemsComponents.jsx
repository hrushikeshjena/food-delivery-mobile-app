/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const IMAGE_API_URL = item_id =>
  `http://10.0.2.2:8083/items/add-item_photo/${item_id}`;

const ItemsComponents = ({data}) => {
  return (
    <Pressable style={styles.container} onPress={() => console.log(data?.name)}>
      <Image style={styles.image}  source={{uri: IMAGE_API_URL(data.item_id)}} />

      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          {/* Item Name */}
          <Text style={styles.title}>{data?.name}</Text>

          {/* Item Price */}
          <Text style={styles.price}>
            {data?.price ? `€ ${data.price}` : 'Price not available'}
          </Text>

          {/* Item Category */}
          <Text style={styles.category}>
            {data?.category || 'Category not specified'}
          </Text>
        </View>

        <View style={styles.ratingContainer}>
          {/* Customer Rating */}
          <Text style={styles.ratingText}>{data?.customerRating || 5.5}</Text>
          <MaterialCommunityIcons
            name="star"
            size={20}
            color="white"
            style={styles.icon}
          />
        </View>
      </View>

      <View style={styles.divider} />
      <View style={styles.discountContainer}>
        <MaterialCommunityIcons
          name="brightness-percent"
          size={20}
          color="#D97B29"
          style={styles.icon}
        />
        <Text style={styles.discount}>
          {data?.discount ? `Flat ${data.discount} Off` : 'Flat 20% Off'}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
    marginVertical: 12,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    aspectRatio: 6 / 4,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  category: {
    color: 'gray',
  },
  discount: {
    color: '#000',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  price: {
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0b421a',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 5,
    marginRight: 10,
  },
  ratingText: {
    textAlign: 'center',
    color: 'white',
    marginRight: 8,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: '#c8c8c8',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  icon: {
    marginRight: 8,
  },
});

export default ItemsComponents;
