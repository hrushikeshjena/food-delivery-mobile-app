import React, {useState, useEffect} from 'react'
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
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import RNPickerSelect from 'react-native-picker-select'

// Main Cart Component
const Cart = ({navigation, route}) => {
  const [cart, setCart] = useState([])
  const [quantity, setQuantity] = useState({})
  const [paymentMethod, setPaymentMethod] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [instructions, setInstructions] = useState('')

  useEffect(() => {
    if (route.params?.items) {
      setCart(prevCart => [...prevCart, ...route.params.items])
    }
  }, [route.params?.items])

  const total = cart.reduce((sum, item) => {
    const itemQuantity = quantity[item.name] || 1
    return sum + item.price * itemQuantity
  }, 0)

  const paymentOptions = [{label: 'Paypal', value: 'paypal'}]

  const updateQuantity = (itemName, change) => {
    setQuantity(prev => ({
      ...prev,
      [itemName]: Math.max((prev[itemName] || 1) + change, 1),
    }))
  }

  const handleAddItems = () => navigation.navigate('SEARCH')

  const handleClearCart = () => {
    Alert.alert('Clear Cart', 'Are you sure you want to clear the cart?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'OK',
        onPress: () => {
          setCart([])
          setQuantity({})
        },
      },
    ])
  }

  const addCookingInstructions = () => {
    console.log('Cooking Instructions:', instructions)
    setInstructions('')
    setModalVisible(false)
  }

  const handleCheckout = () => {
    if (!paymentMethod) {
      Alert.alert('Error', 'Please select a payment method.')
      return
    }

    Alert.alert('Success', 'Your order has been placed successfully!', [
      {
        text: 'OK',
        onPress: () => {
          setCart([])
          setQuantity({})
          setPaymentMethod('')
        },
      },
    ])
  }

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
          handleCheckout={handleCheckout}
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
  )
}

// Modal for adding cooking instructions
const AddInstructionsModal = ({
  visible,
  onClose,
  onAdd,
  instructions,
  setInstructions,
}) => (
  <Modal transparent visible={visible} animationType='slide'>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Add Cooking Instructions</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter your instructions here'
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
)

// Header Component
const Header = ({navigation}) => (
  <View style={styles.header}>
    <Ionicons
      name='arrow-back-outline'
      color='black'
      size={30}
      onPress={() => navigation.goBack()}
    />
    <Text style={styles.headerText}>Hotel</Text>
  </View>
)

// Delivery Info Component
const DeliveryInfo = () => (
  <View style={styles.deliveryContainer}>
    <Text style={styles.delivery}>
      Delivery in <Text style={styles.boldText}>35-40 mins</Text>
    </Text>
  </View>
)

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
)

// Empty Cart Component
const EmptyCart = () => (
  <View style={styles.emptyCartContainer}>
    <Text style={styles.emptyCartText}>🛒 No items added to the cart</Text>
  </View>
)

// Individual Cart Item
const CartItem = ({item, quantity, updateQuantity}) => (
  <Pressable style={styles.cartItemContainer}>
    <View style={styles.cartItemRow}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Image
        style={styles.itemImage}
        source={{uri: item.image || 'fallback_image_url_here'}}
      />
    </View>
    <QuantityControl
      item={item}
      quantity={quantity}
      updateQuantity={updateQuantity}
    />
    <View style={styles.priceRow}>
      <Text style={styles.priceText}>
        ₹{(item.price * quantity).toFixed(2)}
      </Text>
      <Text style={styles.quantityText}>Quantity: {quantity}</Text>
    </View>
  </Pressable>
)

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
)

// Add More Section
const AddMoreSection = ({onAddItems, onOpenModal}) => (
  <View>
    <AddMoreItem
      text='Add more Items'
      onPress={onAddItems}
      icon={<Octicons name='plus-circle' color='#d97b29' size={30} />}
    />
    <AddMoreItem
      text='Add Cooking Instructions'
      onPress={onOpenModal}
      icon={<Entypo name='new-message' color='#d97b29' size={30} />}
    />
  </View>
)

// Add More Item Component
const AddMoreItem = ({text, icon, onPress}) => (
  <Pressable onPress={onPress} style={styles.addMoreItemsContainer}>
    <View style={styles.addItemRow}>
      {icon}
      <Text style={styles.addMoreText}>{text}</Text>
    </View>
    <AntDesign name='right' color='#d97b29' size={30} />
  </Pressable>
)

// Billing Details Component
const BillingDetails = ({total}) => (
  <View style={styles.billingDetails}>
    <Text style={styles.billingTitle}>Billing Details</Text>
    <View style={styles.billingInfo}>
      {renderBillingRow('Item Total', `₹${total.toFixed(2)}`, {color: '#000'})}
      {renderBillingRow('Delivery Fee', '₹15.00', {color: '#000'})}
      {renderBillingRow('Delivery Partner Fee', '₹75.00', {color: '#000'})}
      {renderBillingRow('Total Payable', `₹${(total + 90).toFixed(2)}`, true)}
    </View>
  </View>
)

// Render Billing Row Helper
const renderBillingRow = (label, amount, bold = false) => (
  <View style={styles.billingRow}>
    <Text style={[styles.billingText, bold && styles.boldText]}>{label}</Text>
    <Text style={[styles.billingText, bold && styles.boldText]}>{amount}</Text>
  </View>
)

// Payment Footer Component
const PaymentFooter = ({
  total,
  paymentOptions,
  paymentMethod,
  setPaymentMethod,
  handleClearCart,
  handleCheckout,
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
    <Pressable style={styles.placeOrderButton} onPress={handleCheckout}>
      <Text style={styles.placeOrderText}>Place Order</Text>
    </Pressable>
    <Pressable style={styles.clearCartButton} onPress={handleClearCart}>
      <Text style={styles.clearCartText}>Clear Cart</Text>
    </Pressable>
  </Pressable>
)

// Styles
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {flexDirection: 'row', alignItems: 'center', padding: 16},
  headerText: {fontSize: 20, marginLeft: 10},
  deliveryContainer: {padding: 16},
  delivery: {fontSize: 16},
  boldText: {fontWeight: 'bold'},
  itemsAddedSection: {padding: 16},
  itemsAddedText: {fontSize: 18, fontWeight: 'bold'},
  emptyCartContainer: {alignItems: 'center', marginTop: 20},
  emptyCartText: {fontSize: 18},
  cartItemContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cartItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {fontSize: 18},
  itemImage: {width: 50, height: 50, borderRadius: 5},
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceText: {fontSize: 16},
  quantityText: {fontSize: 16},
  quantityControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  controlText: {fontSize: 24},
  addMoreItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  addItemRow: {flexDirection: 'row', alignItems: 'center'},
  addMoreText: {fontSize: 18, marginLeft: 8},
  billingDetails: {padding: 16, borderTopWidth: 1, borderColor: '#ccc'},
  billingTitle: {fontSize: 18, fontWeight: 'bold'},
  billingInfo: {marginTop: 16},
  billingRow: {flexDirection: 'row', justifyContent: 'space-between'},
  billingText: {fontSize: 16},
  footerContainer: {padding: 16, borderTopWidth: 1, borderColor: '#ccc'},
  paymentText: {fontSize: 16},
  codText: {fontSize: 16, marginVertical: 8},
  placeOrderButton: {
    backgroundColor: '#d97b29',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 8,
  },
  placeOrderText: {color: '#fff', fontSize: 18},
  clearCartButton: {
    backgroundColor: '#ff4d4d',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  clearCartText: {color: '#fff', fontSize: 18},
  modalContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {fontSize: 20, marginBottom: 10},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#d97b29',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {color: '#fff'},
  closeButton: {backgroundColor: '#ccc', marginTop: 10},
})

// Picker styles
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    marginVertical: 10,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    marginVertical: 10,
  },
}

export default Cart
