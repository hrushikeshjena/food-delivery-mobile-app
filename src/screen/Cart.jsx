import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import RNPickerSelect from 'react-native-picker-select';

const Cart = ({navigation}) => {
  const [cart, setCart] = useState([
    {
      name: 'Item 1',
      image: 'https://example.com/image1.jpg',
      price: 100,
      quantity: 2,
    },
    {
      name: 'Item 2',
      image: 'https://example.com/image2.jpg',
      price: 150,
      quantity: 1,
    },
  ]);

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [quantity, setQuantity] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');

  const total = cart.reduce(
    (sum, item) => sum + item.price * (quantity[item.name] || item.quantity),
    0,
  );

  const instructions = [
    {id: 0, name: 'Item 1', iconName: 'bell'},
    {id: 1, name: 'Leave at the Door', iconName: 'door-open'},
    {id: 2, name: 'Directions to Reach', iconName: 'directions'},
    {id: 3, name: 'Avoid Calling', iconName: 'phone-alt'},
  ];

  const paymentOptions = [
    {label: 'Cash on Delivery', value: 'cash'},
    {label: 'Paypal', value: 'paypal'},
  ];

  const handleQuantityChange = (index, change) => {
    setQuantity(prev => ({
      ...prev,
      [index]: Math.max((prev[index] || 0) + change, 1),
    }));
  };

  const handleAddItem = index => {
    setSelectedItemIndex(index);
    handleQuantityChange(index, 1);
  };

  const handleRemoveItem = index => {
    if (quantity[index] > 1) {
      handleQuantityChange(index, -1);
    } else {
      setQuantity(prev => {
        const newQuantity = {...prev};
        delete newQuantity[index];
        return newQuantity;
      });
      setSelectedItemIndex(null);
    }
  };

  const handleClearCart = () => {
    setCart([]);
    setQuantity({});
  };

  return (
    <ScrollView style={{padding: 10, flex: 1, backgroundColor: '#f0f8ff'}}>
      {/* Header */}
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
        <Ionicons
          name={'arrow-back-outline'}
          color={'black'}
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text>Hotel</Text>
      </View>

      {/* Delivery Info */}
      <View style={styles.deliveryContainer}>
        <Text>
          Delivery in <Text style={styles.boldText}> 35-40 mins </Text>
        </Text>
      </View>

      {/* Items Added Section */}
      <View style={styles.itemsAddedSection}>
        <Text style={styles.itemsAddedText}>Items Added</Text>
      </View>

      {/* Cart Items */}
      <View>
        {cart.map((item, index) => (
          <Pressable style={styles.cartItemContainer} key={index}>
            <View style={styles.cartItemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Image style={styles.itemImage} source={{uri: item.image}} />
            </View>

            {/* Quantity Control */}
            {selectedItemIndex === index ? (
              <View style={styles.quantityControl}>
                <Pressable onPress={() => handleRemoveItem(index)}>
                  <Text style={styles.controlText}>-</Text>
                </Pressable>
                <Text style={styles.quantityText}>
                  {quantity[index] || item.quantity}
                </Text>
                <Pressable onPress={() => handleQuantityChange(index, 1)}>
                  <Text style={styles.controlText}>+</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                onPress={() => handleAddItem(index)}
                style={styles.addToCartButton}>
                <Text style={styles.controlText}>Add</Text>
              </Pressable>
            )}
            <View style={styles.priceRow}>
              <Text style={styles.priceText}>
                ₹{item.price * (quantity[index] || item.quantity)}
              </Text>
              <Text style={styles.quantityText}>
                Quantity: {quantity[index] || item.quantity}
              </Text>
            </View>
          </Pressable>
        ))}

        {/* Delivery Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Delivery Instructions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {instructions.map((item, index) => (
              <Pressable key={index} style={styles.instructionItem}>
                <FontAwesome name={item.iconName} size={22} color="gray" />
                <Text style={styles.instructionText}>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Add More Items Section */}
        <View>
          <View style={styles.addMoreItemsContainer}>
            <View style={styles.addItemRow}>
              <Octicons name={'plus-circle'} color={'black'} size={30} />
              <Text style={styles.addMoreText}>Add more Items</Text>
            </View>
            <AntDesign name={'right'} color={'black'} size={30} />
          </View>

          <View style={styles.addMoreItemsContainer}>
            <View style={styles.addItemRow}>
              <Entypo name={'new-message'} color={'black'} size={30} />
              <Text style={styles.addMoreText}>
                Add more Cooking Instructions
              </Text>
            </View>
            <AntDesign name={'right'} color={'black'} size={30} />
          </View>
        </View>

        {/* Billing Details */}
        <View style={styles.billingDetails}>
          <Text style={styles.billingTitle}>Billing Details</Text>
          <View style={styles.billingInfo}>
            <View style={styles.billingRow}>
              <Text style={styles.billingText}>Item Total</Text>
              <Text style={styles.billingText}>₹{total}</Text>
            </View>
            <View style={styles.billingRow}>
              <Text style={styles.billingText}>Delivery Fee</Text>
              <Text style={styles.billingText}>₹15.00</Text>
            </View>
            <View style={styles.billingRow}>
              <Text style={styles.billingText}>Delivery Partner Fee</Text>
              <Text style={styles.billingText}>₹75</Text>
            </View>
            <View style={styles.billingRow}>
              <Text style={styles.boldText}>To Pay</Text>
              <Text style={styles.boldText}>₹{total + 90}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Footer Payment Button */}
      {total !== 0 && (
        <Pressable style={styles.footerContainer}>
          <View>
            <Text style={styles.paymentText}>Pay Using</Text>
            <RNPickerSelect
              onValueChange={value => setPaymentMethod(value)}
              items={paymentOptions}
              placeholder={{label: 'Select a payment method...', value: ''}}
              style={pickerSelectStyles}
            />
            <Text style={styles.codText}>{paymentMethod}</Text>
          </View>
          <Pressable
            onPress={() => {
              handleClearCart();
              navigation.navigate('ORDER');
            }}
            style={styles.payButton}>
            <View>
              <Text style={styles.payAmountText}>₹{total + 90}</Text>
              <Text style={styles.payText}>Pay</Text>
            </View>
          </Pressable>
        </Pressable>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  deliveryContainer: {
    backgroundColor: 'white',
    padding: 8,
    marginTop: 15,
    borderRadius: 8,
  },

  boldText: {
    fontWeight: '500',
  },
  itemsAddedSection: {
    marginVertical: 12,
  },
  itemsAddedText: {
    textAlign: 'center',
    letterSpacing: 3,
    fontSize: 15,
    color: 'gray',
  },
  cartItemContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 6,
  },
  cartItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    width: 200,
    fontSize: 16,
    fontWeight: '600',
  },
  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  controlText: {
    fontSize: 18,
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 15,
    fontWeight: '500',
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: '#fd5c63',
    padding: 10,
    borderRadius: 6,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  instructionsContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 15,
    borderRadius: 7,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  instructionText: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: '500',
  },
  addMoreItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 6,
  },
  addItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addMoreText: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 10,
  },
  billingDetails: {
    marginVertical: 10,
  },
  billingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  billingInfo: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 7,
  },
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  billingText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'gray',
  },
  footerContainer: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
  },
  codText: {
    fontSize: 13,
    color: 'gray',
    marginTop: 5,
  },
  payButton: {
    backgroundColor: '#fd5c63',
    padding: 10,
    borderRadius: 6,
  },
  payAmountText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  payTotalText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
});

export default Cart;
