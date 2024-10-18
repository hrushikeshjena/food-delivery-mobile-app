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
  const [cart, setCart] = useState([]);
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
    <Text>
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

// Billing Details Component
const BillingDetails = ({total}) => (
  <View style={styles.billingDetails}>
    <Text style={styles.billingTitle}>Billing Details</Text>
    <View style={styles.billingInfo}>
      {renderBillingRow('Item Total', `₹${total}`)}
      {renderBillingRow('Delivery Fee', '₹15.00')}
      {renderBillingRow('Delivery Partner Fee', '₹75')}
      {renderBillingRow('Total Payable', `₹${total + 90}`, true)}
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
}) => (
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
);

// Styles for the Cart Component
const styles = StyleSheet.create({
  // Overall Container
  container: {padding: 20},

  // Header
  header: {flexDirection: 'row', alignItems: 'center'},
  headerText: {fontSize: 18, fontWeight: 'bold', marginLeft: 20},

  // Delivery Info
  deliveryContainer: {marginTop: 20, marginBottom: 10},
  boldText: {fontWeight: 'bold'},

  // Items Added
  itemsAddedSection: {marginVertical: 20},
  itemsAddedText: {fontSize: 18, fontWeight: 'bold'},
  emptyCartContainer: {marginVertical: 30, alignItems: 'center'},
  emptyCartText: {fontSize: 16, fontWeight: 'bold'},

  // Cart Item
  cartItemContainer: {marginVertical: 15},
  cartItemRow: {flexDirection: 'row', justifyContent: 'space-between'},
  itemName: {fontSize: 16, fontWeight: 'bold'},
  itemImage: {width: 50, height: 50},
  quantityControl: {flexDirection: 'row', alignItems: 'center'},
  controlText: {fontSize: 20, paddingHorizontal: 10},
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceText: {fontSize: 16, fontWeight: 'bold'},
  quantityText: {fontSize: 14, color: '#555'},

  // Add More Items Section
  addMoreItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  addItemRow: {flexDirection: 'row', alignItems: 'center'},
  addMoreText: {fontSize: 16, marginLeft: 10},

  // Billing Details
  billingDetails: {marginTop: 20},
  billingTitle: {fontSize: 18, fontWeight: 'bold'},
  billingInfo: {marginTop: 10},
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  billingText: {fontSize: 16},

  // Footer (Payment)
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  paymentText: {fontSize: 16},
  codText: {fontSize: 14, color: '#888', marginTop: 5},
  payButton: {backgroundColor: '#d97b29', padding: 10, borderRadius: 5},
  payAmountText: {fontSize: 16, color: '#fff'},
  payText: {fontSize: 16, color: '#fff', fontWeight: 'bold'},

  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
  input: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#d97b29',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {backgroundColor: '#ddd'},
  buttonText: {color: '#fff', fontSize: 16},
});

// Styles for RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
    marginTop: 10,
  },
});

export default Cart;
