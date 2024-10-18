import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuItem = ({item}) => {
  const navigation = useNavigation();
  const [addItems, setAddItems] = useState(0);
  const [selected, setSelected] = useState(false);

  const handleCart = () => navigation.navigate('CART', {item});
  const goToDetailPage = () => navigation.navigate('DetailsScreen', {item});

  // const renderStars = rating =>
  //   Array(5)
  //     .fill(0)
  //     .map((_, i) => (
  //       <FontAwesome
  //         key={i}
  //         style={styles.star}
  //         name={i < Math.floor(rating) ? 'star' : 'star-o'}
  //         size={15}
  //         color="#ffd700"
  //       />
  //     ));

  const addItemToCart = () => {
    setSelected(true);
    setAddItems(prevCount => prevCount + 1);
  };

  const removeItemFromCart = () => {
    if (addItems === 1) {
      setSelected(false);
    }
    setAddItems(prevCount => Math.max(prevCount - 1, 0));
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable} onPress={goToDetailPage}>
        <View style={styles.infoContainer}>
          <Text style={styles.itemName}>{item?.name}</Text>
          <Text style={styles.itemPrice}>€{item?.price}</Text>
          {/* <Text style={styles.starContainer}>{renderStars(item.rating)}</Text> */}
          <Text style={styles.itemDescription}>
            {item?.description.length > 40
              ? `${item?.description.slice(0, 40)}...`
              : item?.description}
          </Text>


          <TouchableOpacity
            onPress={goToDetailPage}
            style={styles.iconContainer}>
            <Icon name="arrow-redo-circle-outline" size={25} color="#D97B29" />
          </TouchableOpacity>
        </View>
        <View>
          <Image style={styles.itemImage} source={{uri: item?.image}} />
          {selected ? (
            <View style={styles.quantityControl}>
              <Pressable onPress={removeItemFromCart}>
                <Text style={styles.controlText}>-</Text>
              </Pressable>
              <Text style={styles.quantityText}>{addItems}</Text>
              <Pressable onPress={addItemToCart}>
                <Text style={styles.controlText}>+</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={addItemToCart} style={styles.addToCartButton}>
              <Text style={styles.controlText}>Add</Text>
            </Pressable>
          )}
        </View>
      </Pressable>
      {addItems > 0 && (
        <Pressable onPress={handleCart} style={styles.cartMessage}>
          <Text style={styles.cartText}>
            {addItems} item{addItems > 1 ? 's' : ''} added
          </Text>
          <Text style={styles.cartInfo}>
            Add item(s) worth ₹240 to reduce surge fee by ₹35.
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 15,
    marginTop: 4,
    fontWeight: '500',
    color: '#D97B29',
  },
  starContainer: {
    marginTop: 5,
  },
  star: {
    paddingHorizontal: 3,
  },
  itemDescription: {
    marginTop: 8,
    color: 'gray',
    fontSize: 16,
  },
  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  quantityControl: {
    position: 'absolute',
    top: 95,
    left: 20,
    borderColor: '#D97B29',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  addToCartButton: {
    position: 'absolute',
    top: 95,
    left: 20,
    borderColor: '#D97B29',
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  controlText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D97B29',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  cartMessage: {
    backgroundColor: '#D97B29',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  cartText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  cartInfo: {
    textAlign: 'center',
    color: 'white',
    marginTop: 5,
    fontWeight: '600',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
    padding: 5,
  },
});

