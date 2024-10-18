import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Alert,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import RNPickerSelect from 'react-native-picker-select';

// Main Cart Component
const Cart = ({navigation, route}) => {
  const [cart, setCart] = useState([
    // {
    //   id: 1,
    //   name: 'Laptop',
    //   price: 1000,
    //   quantity: 1,
    //   image:
    //     'https://images.pexels.com/photos/17696654/pexels-photo-17696654/free-photo-of-rice-with-meat.jpeg?auto=compress&cs=tinysrgb&w=600', // Update this with the actual image path
    // },
    // {
    //   id: 2,
    //   name: 'Phone',
    //   price: 500,
    //   quantity: 2,
    //   image:
    //     'https://cdn.pixabay.com/photo/2022/03/02/12/42/paneer-7043099_640.jpg', // Update this with the actual image path
    // },
    // {
    //   id: 3,
    //   name: 'Headphones',
    //   price: 150,
    //   quantity: 1,
    //   image:
    //     'https://cdn.pixabay.com/photo/2018/12/04/16/49/tandoori-3856045_640.jpg', // Update this with the actual image path
    // },
  ]);

  const [quantity, setQuantity] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [instructions, setInstructions] = useState('');

  // Initialize cart from route params
  useEffect(() => {
    if (route.params?.items) {
      setCart(route.params.items);
    }
  }, [route.params?.items]);

  // Calculate total price
  const total = cart.reduce((sum, item) => {
    const itemQuantity = quantity[item.name] || item.quantity;
    return sum + item.price * itemQuantity;
  }, 0);

  const paymentOptions = [{label: 'Paypal', value: 'paypal'}];

  // Update quantity for an item
  const updateQuantity = (itemName, change) => {
    setQuantity(prev => ({
      ...prev,
      [itemName]: Math.max((prev[itemName] || 1) + change, 1),
    }));
  };

  // Navigation functions
  const handleAddItems = () => navigation.navigate('SEARCH');

  const handleClearCart = () => {
    Alert.alert('Clear Cart', 'Are you sure you want to clear the cart?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'OK',
        onPress: () => {
          setCart([]);
          setQuantity({});
        },
      },
    ]);
  };

  const addCookingInstructions = () => {
    console.log('Cooking Instructions:', instructions);
    setInstructions('');
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} />
      <DeliveryInfo />
      <ItemsAdded
        cart={cart}
        quantity={quantity}
        updateQuantity={updateQuantity}
      />
      <AddMoreSection
        onAddItems={handleAddItems}
        onOpenModal={() => setModalVisible(true)}
      />
      <BillingDetails total={total} />
      {total > 0 && (
        <PaymentFooter
          total={total}
          paymentOptions={paymentOptions}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          handleClearCart={handleClearCart}
          navigation={navigation}
        />
      )}
      <AddInstructionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addCookingInstructions}
        instructions={instructions}
        setInstructions={setInstructions}
      />
    </ScrollView>
  );
};

// Modal for adding cooking instructions
const AddInstructionsModal = ({
  visible,
  onClose,
  onAdd,
  instructions,
  setInstructions,
}) => (
  <Modal transparent visible={visible} animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Add Cooking Instructions</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your instructions here"
          value={instructions}
          onChangeText={setInstructions}
        />
        <TouchableOpacity style={styles.button} onPress={onAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.closeButton]}
          onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

// Header Component
const Header = ({navigation}) => (
  <View style={styles.header}>
    <Ionicons
      name="arrow-back-outline"
      color="black"
      size={30}
      onPress={() => navigation.goBack()}
    />
    <Text style={styles.headerText}>Hotel</Text>
  </View>
);

// Delivery Info Component
const DeliveryInfo = () => (
  <View style={styles.deliveryContainer}>
    <Text style={styles.delivery}>
      Delivery in <Text style={styles.boldText}>35-40 mins</Text>
    </Text>
  </View>
);

// Items Added Section
const ItemsAdded = ({cart, quantity, updateQuantity}) => (
  <View style={styles.itemsAddedSection}>
    <Text style={styles.itemsAddedText}>All Items</Text>
    {cart.length === 0 ? (
      <EmptyCart />
    ) : (
      cart.map((item, index) => (
        <CartItem
          key={index}
          item={item}
          quantity={quantity[item.name] || 1}
          updateQuantity={updateQuantity}
        />
      ))
    )}
  </View>
);

// Empty Cart Component
const EmptyCart = () => (
  <View style={styles.emptyCartContainer}>
    <Text style={styles.emptyCartText}>🛒 No items added to the cart</Text>
  </View>
);

// Individual Cart Item
const CartItem = ({item, quantity, updateQuantity}) => (
  <Pressable style={styles.cartItemContainer}>
    <View style={styles.cartItemRow}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Image style={styles.itemImage} source={{uri: item.image}} />
    </View>
    <QuantityControl
      item={item}
      quantity={quantity}
      updateQuantity={updateQuantity}
    />
    <View style={styles.priceRow}>
      <Text style={styles.priceText}>₹{item.price * quantity}</Text>
      <Text style={styles.quantityText}>Quantity: {quantity}</Text>
    </View>
  </Pressable>
);

// Quantity Control for Cart Item
const QuantityControl = ({item, quantity, updateQuantity}) => (
  <View style={styles.quantityControl}>
    <Pressable onPress={() => updateQuantity(item.name, -1)}>
      <Text style={styles.controlText}>-</Text>
    </Pressable>
    <Text style={styles.quantityText}>{quantity}</Text>
    <Pressable onPress={() => updateQuantity(item.name, 1)}>
      <Text style={styles.controlText}>+</Text>
    </Pressable>
  </View>
);

// Add More Section
const AddMoreSection = ({onAddItems, onOpenModal}) => (
  <View>
    <AddMoreItem
      text="Add more Items"
      onPress={onAddItems}
      icon={<Octicons name="plus-circle" color="#d97b29" size={30} />}
    />
    <AddMoreItem
      text="Add Cooking Instructions"
      onPress={onOpenModal}
      icon={<Entypo name="new-message" color="#d97b29" size={30} />}
    />
  </View>
);

// Add More Item Component
const AddMoreItem = ({text, icon, onPress}) => (
  <Pressable onPress={onPress} style={styles.addMoreItemsContainer}>
    <View style={styles.addItemRow}>
      {icon}
      <Text style={styles.addMoreText}>{text}</Text>
    </View>
    <AntDesign name="right" color="#d97b29" size={30} />
  </Pressable>
);

const BillingDetails = ({total}) => (
  <View style={styles.billingDetails}>
    <Text style={styles.billingTitle}>Billing Details</Text>
    <View style={styles.billingInfo}>
      {renderBillingRow('Item Total', `€${total}`, {color: '#000'})}
      {renderBillingRow('Delivery Fee', '€15.00', {color: '#000'})}
      {renderBillingRow('Delivery Partner Fee', '€75', {color: '#000'})}
      {renderBillingRow('Total Payable', `€${total + 90}`, true)}
    </View>
  </View>
);

// Render Billing Row Helper
const renderBillingRow = (label, amount, bold = false) => (
  <View style={styles.billingRow}>
    <Text style={[styles.billingText, bold && styles.boldText]}>{label}</Text>
    <Text style={[styles.billingText, bold && styles.boldText]}>{amount}</Text>
  </View>
);

// Payment Footer Component
const PaymentFooter = ({
  total,
  paymentOptions,
  paymentMethod,
  setPaymentMethod,
  handleClearCart,
  navigation,
}) => {
  // Handle Paypal Payment Navigation
  const handlePaypalAccount = () => {
    if (paymentMethod === 'paypal') {
      navigation.navigate('PAYPAL');
    } else {
      Alert.alert('Error', 'Please select the payment method.');
    }
  };

  return (
    <Pressable style={styles.footerContainer}>
      <View>
        <Text style={styles.paymentText}>Pay Using</Text>
        <RNPickerSelect
          onValueChange={setPaymentMethod}
          items={paymentOptions}
          placeholder={{label: 'Select a payment method...', value: ''}}
          style={pickerSelectStyles}
        />
        <Text style={styles.codText}>
          {paymentMethod || 'Select payment method'}
        </Text>
      </View>

      <Pressable style={styles.placeOrderButton} onPress={handlePaypalAccount}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </Pressable>
      <Pressable style={styles.clearCartButton} onPress={handleClearCart}>
        <Text style={styles.clearCartText}>Clear Cart</Text>
      </Pressable>
    </Pressable>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  deliveryContainer: {
    padding: 16,
  },
  delivery: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  itemsAddedSection: {
    padding: 16,
  },
  itemsAddedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyCartContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#999',
  },
  cartItemContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cartItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 14,
    color: '#666',
  },
  quantityControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  controlText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addMoreItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    elevation: 1,
  },
  addItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addMoreText: {
    marginLeft: 10,
    fontSize: 16,
  },
  billingDetails: {
    padding: 16,
  },
  billingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  billingInfo: {
    marginTop: 10,
    color: '#000',
  },
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  billingText: {
    fontSize: 16,
  },
  footerContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eaeaea',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  codText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  placeOrderButton: {
    backgroundColor: '#d97b29',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  placeOrderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  clearCartButton: {
    backgroundColor: '#ff4d4d',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  clearCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#d97b29',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ff4d4d',
    marginTop: 10,
  },
});

// Picker Styles
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    marginTop: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    marginTop: 10,
  },
});

export default Cart;
