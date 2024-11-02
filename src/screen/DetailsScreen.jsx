// import React, {useState} from 'react';
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Pressable,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const IMAGE_API_URL = item_id =>
//   `http://10.0.2.2:8083/items/add-item_photo/${item_id}`;


// const DetailsScreen = ({navigation, route}) => {
//   const {item} = route.params;
//   const [isInCart, setIsInCart] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = () => {
//     const selectedItem = {
//       id: item.item_id,
//       name: item.itemname,
//       price: item.price,
//       quantity: quantity,
//       image: IMAGE_API_URL(item.item_id), // Correctly call the function to get the image URL
//     };

//     console.log('Item added to cart:', selectedItem); // Log the selected item

//     navigation.navigate('CART', {items: [selectedItem]});
//     setIsInCart(true); // Update cart status
//   };

//   const increaseQuantity = () => setQuantity(prev => prev + 1);
//   const decreaseQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Icon
//           name="arrow-back"
//           size={28}
//           color="#fff"
//           onPress={() => navigation.goBack()}
//         />
//         <Text style={styles.title}>{item.itemname}</Text>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.content}>
//           <Image
//             style={styles.image}
//             source={{uri: IMAGE_API_URL(item.item_id)}}
//           />
//           <View style={styles.details}>
//             <Text style={styles.itemName}>{item.itemname}</Text>
//             <Text style={styles.detailsText}>{item.description}</Text>
//             <Text style={styles.priceText}>
//               Price: €{item.price.toFixed(2)}
//             </Text>
//             <Text style={styles.ratingText}>Rating: {item.rating} stars</Text>

//             <Text style={styles.quantityLabel}>Quantity</Text>
//             <View style={styles.quantityContainer}>
//               <Pressable
//                 onPress={decreaseQuantity}
//                 style={styles.quantityButton}>
//                 <Text style={styles.quantityText}>-</Text>
//               </Pressable>
//               <Text style={styles.quantityText}>{quantity}</Text>
//               <Pressable
//                 onPress={increaseQuantity}
//                 style={styles.quantityButton}>
//                 <Text style={styles.quantityText}>+</Text>
//               </Pressable>
//             </View>

//             <Pressable
//               style={[
//                 styles.addToCartButton,
//                 isInCart && styles.disabledButton,
//               ]}
//               onPress={handleAddToCart}
//               disabled={isInCart}>
//               <Text style={styles.addToCartText}>
//                 {isInCart ? 'Added to Cart' : 'Add to Cart'}
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f4f8',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#D97B29',
//     padding: 16,
    
//   },
//   title: {
//     flex: 1,
//     fontSize: 22,
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',

//   },
//   content: {
//     padding: 16,
//   },
//   image: {
//     width: '100%',
//     height: 250,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   details: {
//     borderRadius: 10,
//     padding: 16,
//     alignItems:'center',
   
//   },
//   itemName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   detailsText: {
//     marginVertical: 10,
//     fontSize: 16,
//     color: '#666',

//   },
//   priceText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#D97B29',
//     marginTop: 20,

//   },
//   ratingText: {
//     fontSize: 16,
//     color: '#444',
//     marginTop: 20,

//   },
//   quantityLabel: {
//     marginTop: 20,
//     fontSize: 16,
//     fontWeight: 'bold',
    
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//     justifyContent: 'left',
    
//   },
//   quantityButton: {
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 10,
//     marginHorizontal: 10,
    
//   },
//   quantityText: {
//     fontSize: 20,
//     fontWeight: '400',
//     color: '#000',
//   },
//   addToCartButton: {
//     backgroundColor: '#D97B29',
//     borderRadius: 25,
//     padding: 15,
//     width: 350,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   disabledButton: {
//     backgroundColor: 'gray',
//   },
//   addToCartText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });

// export default DetailsScreen;


import React, { useState } from 'react';
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

const IMAGE_API_URL = item_id =>
  `http://10.0.2.2:8083/items/add-item_photo/${item_id}`;

const DetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const selectedItem = {
      id: item.item_id,
      name: item.itemname,
      price: item.price,
      quantity: quantity,
      image: IMAGE_API_URL(item.item_id),
    };

    console.log('Item added to cart:', selectedItem);
    navigation.navigate('CART', { items: [selectedItem] });
    setIsInCart(true);
  };

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
        <Text style={styles.title}>{item.itemname}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={{ uri: IMAGE_API_URL(item.item_id) }}
          />
          <View style={styles.details}>
            <Text style={styles.itemName}>{item.itemname}</Text>
            <Text style={styles.detailsText}>{item.description}</Text>
            <Text style={styles.priceText}>€{item.price.toFixed(2)}</Text>
            <Text style={styles.ratingText}>Rating: {item.rating} stars</Text>

            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <Pressable
                onPress={decreaseQuantity}
                style={styles.quantityButton}>
                <Text style={styles.quantityText}>-</Text>
              </Pressable>
              <Text style={styles.quantityText}>{quantity}</Text>
              <Pressable
                onPress={increaseQuantity}
                style={styles.quantityButton}>
                <Text style={styles.quantityText}>+</Text>
              </Pressable>
            </View>

            <Pressable
              style={[styles.addToCartButton, isInCart && styles.disabledButton]}
              onPress={handleAddToCart}
              disabled={isInCart}>
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D97B29',
    padding: 16,
  },
  title: {
    flex: 1,
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  details: {
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsText: {
    marginVertical: 10,
    fontSize: 16,
    color: '#666',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D97B29',
    marginTop: 20,
  },
  ratingText: {
    fontSize: 16,
    color: '#444',
    marginTop: 20,
  },
  quantityLabel: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#f0f4f8',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    elevation: 1,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000',
  },
  addToCartButton: {
    backgroundColor: '#D97B29',
    borderRadius: 25,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DetailsScreen;
