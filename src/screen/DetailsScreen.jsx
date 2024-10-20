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

const DetailsScreen = ({ navigation, route }) => {
  const { item } = route.params; 
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = useCallback(() => {
    setIsInCart(true);
    navigation.navigate('CART', { item, quantity });
  }, [item, quantity, navigation]);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={28}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>{item.name}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
          <View style={styles.details}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.detailsText}>{item.description}</Text>
            <Text style={styles.detailsText}>Price: ${item.price.toFixed(2)}</Text>
            <Text style={styles.detailsText}>Rating: {item.rating} stars</Text>

            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <Pressable onPress={decreaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityText}>-</Text>
              </Pressable>
              <Text style={styles.quantityText}>{quantity}</Text>
              <Pressable onPress={increaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityText}>+</Text>
              </Pressable>
            </View>

            <Pressable
              style={[styles.addToCartButton, isInCart && { backgroundColor: 'gray' }]}
              onPress={handleAddToCart}
              disabled={isInCart}
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
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D97B29',
    padding: 16,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  details: {
    marginTop: 10,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsText: {
    marginVertical: 5,
    fontSize: 16,
  },
  quantityLabel: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#D97B29',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#D97B29',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DetailsScreen;
