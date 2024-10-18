import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from '../utils/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = useCallback(() => {
    setIsInCart(true);
    navigation.navigate('CART', { item, quantity });
  }, [item, quantity, navigation]);

  const handleFavorite = useCallback(() => {
    setIsFavorited((prev) => !prev);
  }, []);

  const increaseQuantity = useCallback(() => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }, []);

  const decreaseQuantity = useCallback(() => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Minimum quantity is 1
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={28}
          color="#fff"
          onPress={() => navigation.goBack()}
          accessible
          accessibilityLabel="Go back"
        />
        <Text style={styles.title}>{item.name}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Image style={styles.image} source={{ uri: item.image }} />
          <View style={styles.details}>
            <View style={styles.nameContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Pressable onPress={handleFavorite} accessible accessibilityLabel="Toggle favorite">
                <Icon
                  name={isFavorited ? 'favorite' : 'favorite-border'}
                  color={color.secondary}
                  size={25}
                />
              </Pressable>
            </View>

            <View style={styles.tagContainer}>
              {item.bestSeller && <Text style={styles.tag}>Best Seller</Text>}
            </View>

            <Text style={styles.detailsText}>
              <FontAwesome name="info-circle" size={20} color="black" />
              {` ${item.description}`}
            </Text>
            <Text style={styles.detailsText}>
              <FontAwesome name="dollar" size={20} color="green" /> {`Price: $${item.price.toFixed(2)}`}
            </Text>
            <Text style={styles.detailsText}>
              <FontAwesome name="star" size={20} color="gold" /> {`Rating: ${item.rating} stars`}
            </Text>
            <Text style={styles.detailsText}>
              <FontAwesome name="users" size={20} color="blue" /> {`Ratings Count: ${item.ratings}`}
            </Text>

            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <Pressable
                onPress={decreaseQuantity}
                style={styles.quantityButton}
                accessible
                accessibilityLabel="Decrease quantity"
              >
                <Text style={styles.quantityText}>-</Text>
              </Pressable>
              <Text style={styles.quantityText}>{quantity}</Text>
              <Pressable
                onPress={increaseQuantity}
                style={styles.quantityButton}
                accessible
                accessibilityLabel="Increase quantity"
              >
                <Text style={styles.quantityText}>+</Text>
              </Pressable>
            </View>

            <Pressable
              style={[styles.addToCartButton, isInCart && { backgroundColor: 'gray' }]}
              onPress={handleAddToCart}
              disabled={isInCart}
              accessible
              accessibilityLabel={isInCart ? 'Item already in cart' : 'Add to cart'}
            >
              <Text style={styles.addToCartText}>
                {isInCart ? 'Added to Cart' : 'Add to Cart'}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 100,
    padding: 10,
    backgroundColor: '#D97B29',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  details: {
    marginTop: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: 16,
    marginVertical: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tag: {
    backgroundColor: '#D97B29',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 12,
  },
  addToCartButton: {
    backgroundColor: '#D97B29',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#D97B29',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
});

export default DetailsScreen;
