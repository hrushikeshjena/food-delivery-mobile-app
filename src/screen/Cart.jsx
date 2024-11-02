// // import React, {useState, useEffect} from 'react';
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   ScrollView,
// //   Pressable,
// //   Image,
// //   Alert,
// //   TextInput,
// //   Modal,
// //   TouchableOpacity,
// // } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import Octicons from 'react-native-vector-icons/Octicons';
// // import AntDesign from 'react-native-vector-icons/AntDesign';
// // import Entypo from 'react-native-vector-icons/Entypo';
// // import RNPickerSelect from 'react-native-picker-select';
// // import axios from 'axios';

// // const API_URL_CHECKOUT = `http://10.0.2.2:8083/userorder/create/registuserorderrations`;
// // const API_URL = `http://10.0.2.2:8083/user/get/user_id/1`;
// // const IMAGE_API_URL = item_id =>
// //   `http://10.0.2.2:8083/items/add-item_photo/${item_id}`;

// // const Cart = ({navigation, route}) => {
// //   const [cart, setCart] = useState([]);
// //   const [quantity, setQuantity] = useState({});
// //   const [paymentMethod, setPaymentMethod] = useState('');
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [instructions, setInstructions] = useState('');

// //   useEffect(() => {
// //     if (route.params?.items) {
// //       setCart(route.params.items);
// //     }
// //   }, [route.params?.items]);

// //   const total = cart.reduce((sum, item) => {
// //     const itemQuantity = quantity[item.itemname] || 1;
// //     return sum + item.price * itemQuantity;
// //   }, 0);

// //   const paymentOptions = [{label: 'Paypal', value: 'paypal'}];

// //   const updateQuantity = (itemname, change) => {
// //     setQuantity(prev => ({
// //       ...prev,
// //       [itemname]: Math.max((prev[itemname] || 1) + change, 1),
// //     }));
// //   };

// //   const handleAddItems = () => navigation.navigate('SEARCH');

// //   const handleClearCart = () => {
// //     Alert.alert('Clear Cart', 'Are you sure you want to clear the cart?', [
// //       {text: 'Cancel', style: 'cancel'},
// //       {
// //         text: 'OK',
// //         onPress: () => {
// //           setCart([]);
// //           setQuantity({});
// //         },
// //       },
// //     ]);
// //   };

// //   const addCookingInstructions = () => {
// //     setModalVisible(false);
// //   };

// //   const [loading, setLoading] = useState(false);

// //   const handleCheckout = async () => {
// //     if (!paymentMethod) {
// //       Alert.alert('Error', 'Please select a payment method.');
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       console.log('Starting checkout process...');
// //       const cartResponse = await axios.get(API_URL);
// //       const user = cartResponse.data;
// //       console.log('user:', user);
// //       const payload = {
// //         user: {
// //           id: user.id,
// //           name: user.name,
// //           email: user.email,
// //           phone: user.phno,
// //           address: user.address,
// //         },
// //         items: cart.map(item => ({
// //           id: item.item_id,
// //           name: item.itemname,
// //           quantity: quantity[item.itemname] || 1,
// //           price: item.price,
// //         })),
// //         paymentMethod,
// //         instructions,
// //         total: total + 20, // Including delivery fee
// //       };
// //       console.log('Order placed successfully:', payload);

// //       const response = await axios.post(API_URL_CHECKOUT, payload);
// //       console.log('Order placed successfully:', response.data);

// //       Alert.alert('Success', 'Your order has been placed successfully!', [
// //         {
// //           text: 'OK',
// //           onPress: () => {
// //             setCart([]);
// //             setQuantity({});
// //             setPaymentMethod('');
// //             setInstructions('');
// //             navigation.navigate('YourOrder', {order: response.data});
// //           },
// //         },
// //       ]);
// //     } catch (error) {
// //       console.error('Checkout Error:', error);
// //       Alert.alert('Error', 'Failed to place order. Please try again.');
// //     } finally {
// //       setLoading(false); // Set loading state to false
// //     }
// //   };

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Header navigation={navigation} />
// //       <DeliveryInfo />
// //       <ItemsAdded
// //         cart={cart}
// //         quantity={quantity}
// //         updateQuantity={updateQuantity}
// //       />
// //       <AddMoreSection
// //         onAddItems={handleAddItems}
// //         onOpenModal={() => setModalVisible(true)}
// //       />
// //       <BillingDetails total={total} />
// //       {total > 0 && (
// //         <PaymentFooter
// //           total={total}
// //           paymentOptions={paymentOptions}
// //           paymentMethod={paymentMethod}
// //           setPaymentMethod={setPaymentMethod}
// //           handleClearCart={handleClearCart}
// //           handleCheckout={handleCheckout}
// //         />
// //       )}
// //       <AddInstructionsModal
// //         visible={modalVisible}
// //         onClose={() => setModalVisible(false)}
// //         onAdd={addCookingInstructions}
// //         instructions={instructions}
// //         setInstructions={setInstructions}
// //       />
// //     </ScrollView>
// //   );
// // };

// // const AddInstructionsModal = ({
// //   visible,
// //   onClose,
// //   onAdd,
// //   instructions,
// //   setInstructions,
// // }) => (
// //   <Modal transparent visible={visible} animationType="slide">
// //     <View style={styles.modalContainer}>
// //       <View style={styles.modalContent}>
// //         <Text style={styles.modalTitle}>Add Cooking Instructions</Text>
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Enter your instructions here"
// //           value={instructions}
// //           onChangeText={setInstructions}
// //         />
// //         <TouchableOpacity style={styles.button} onPress={onAdd}>
// //           <Text style={styles.buttonText}>Add</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity
// //           style={[styles.button, styles.closeButton]}
// //           onPress={onClose}>
// //           <Text style={styles.buttonText}>Close</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   </Modal>
// // );

// // // Header Component
// // const Header = ({navigation}) => (
// //   <View style={styles.header}>
// //     <Ionicons
// //       name="arrow-back-outline"
// //       color="black"
// //       size={30}
// //       onPress={() => navigation.goBack()}
// //     />
// //     <Text style={styles.headerText}>Hotel</Text>
// //   </View>
// // );

// // // Delivery Info Component
// // const DeliveryInfo = () => (
// //   <View style={styles.deliveryContainer}>
// //     <Text style={styles.delivery}>
// //       Delivery in <Text style={styles.boldText}>35-40 mins</Text>
// //     </Text>
// //   </View>
// // );

// // // Items Added Section
// // const ItemsAdded = ({cart, quantity, updateQuantity}) => (
// //   <View style={styles.itemsAddedSection}>
// //     <Text style={styles.itemsAddedText}>All Items</Text>
// //     {cart.length === 0 ? (
// //       <EmptyCart />
// //     ) : (
// //       cart.map((item, index) => (
// //         <CartItem
// //           key={index}
// //           item={item}
// //           quantity={quantity[item.name] || 1}
// //           updateQuantity={updateQuantity}
// //         />
// //       ))
// //     )}
// //   </View>
// // );

// // // Empty Cart Component
// // const EmptyCart = () => (
// //   <View style={styles.emptyCartContainer}>
// //     <Text style={styles.emptyCartText}>🛒 No items added to the cart</Text>
// //   </View>
// // );

// // // Individual Cart Item
// // const CartItem = ({item, quantity, updateQuantity}) => (
// //   <Pressable style={styles.cartItemContainer}>
// //     <View style={styles.cartItemRow}>
// //       <Text style={styles.itemName}>{item.itemname}</Text>
// //       <Image
// //         style={styles.itemImage}
// //         source={{uri: IMAGE_API_URL(item.item_id)}}
// //       />
// //     </View>
// //     <QuantityControl
// //       item={item}
// //       quantity={quantity}
// //       updateQuantity={updateQuantity}
// //     />
// //     <View style={styles.priceRow}>
// //       <Text style={styles.priceText}>
// //         ₹{(item.price * quantity).toFixed(2)}
// //       </Text>
// //     </View>
// //   </Pressable>
// // );

// // // Quantity Control for Cart Item
// // const QuantityControl = ({item, quantity, updateQuantity}) => (
// //   <View style={styles.quantityControl}>
// //     <Pressable onPress={() => updateQuantity(item.itemname, -1)}>
// //       <Text style={styles.controlText}>-</Text>
// //     </Pressable>
// //     <Text style={styles.quantityText}>{quantity}</Text>
// //     <Pressable onPress={() => updateQuantity(item.itemname, 1)}>
// //       <Text style={styles.controlText}>+</Text>
// //     </Pressable>
// //   </View>
// // );

// // // Add More Section
// // const AddMoreSection = ({onAddItems, onOpenModal}) => (
// //   <View>
// //     <AddMoreItem
// //       text="Add more Items"
// //       onPress={onAddItems}
// //       icon={<Octicons name="plus-circle" color="#d97b29" size={30} />}
// //     />
// //     <AddMoreItem
// //       text="Add Cooking Instructions"
// //       onPress={onOpenModal}
// //       icon={<Entypo name="new-message" color="#d97b29" size={30} />}
// //     />
// //   </View>
// // );

// // // Add More Item Component
// // const AddMoreItem = ({text, icon, onPress}) => (
// //   <Pressable onPress={onPress} style={styles.addMoreItemsContainer}>
// //     <View style={styles.addItemRow}>
// //       {icon}
// //       <Text style={styles.addMoreText}>{text}</Text>
// //     </View>
// //     <AntDesign name="right" color="#d97b29" size={30} />
// //   </Pressable>
// // );

// // // Billing Details Component
// // const BillingDetails = ({total}) => (
// //   <View style={styles.billingDetails}>
// //     <Text style={styles.billingTitle}>Billing Details</Text>
// //     <View style={styles.billingInfo}>
// //       {renderBillingRow('Item Total', `₹${total.toFixed(2)}`)}
// //       {renderBillingRow('Delivery Fee', '₹20.00')}
// //       {renderBillingRow('Total', `₹${(total + 20).toFixed(2)}`)}
// //     </View>
// //   </View>
// // );

// // // Helper function to render billing rows
// // const renderBillingRow = (label, amount) => (
// //   <View style={styles.billingRow}>
// //     <Text style={styles.billingLabel}>{label}</Text>
// //     <Text style={styles.billingAmount}>{amount}</Text>
// //   </View>
// // );

// // // Payment Footer Component
// // const PaymentFooter = ({
// //   total,
// //   paymentOptions,
// //   paymentMethod,
// //   setPaymentMethod,
// //   handleClearCart,
// //   handleCheckout,
// // }) => (
// //   <View>
// //     <View style={styles.paymentSection}>
// //       <RNPickerSelect
// //         placeholder={{label: 'Select Payment Method', value: null}}
// //         value={paymentMethod}
// //         onValueChange={value => setPaymentMethod(value)}
// //         items={paymentOptions}
// //         style={pickerSelectStyles}
// //       />
// //     </View>
// //     <View style={styles.footerButtons}>
// //       <TouchableOpacity
// //         style={[styles.button, styles.clearCartButton]}
// //         onPress={handleClearCart}>
// //         <Text style={styles.buttonText}>Clear Cart</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity style={styles.button} onPress={handleCheckout}>
// //         <Text style={styles.buttonText}>
// //           Place Order - ₹{(total + 20).toFixed(2)}
// //         </Text>
// //       </TouchableOpacity>
// //     </View>
// //   </View>
// // );

// // // Styles
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     padding: 20,
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 20,
// //   },
// //   headerText: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginLeft: 10,
// //   },
// //   deliveryContainer: {
// //     marginBottom: 20,
// //   },
// //   delivery: {
// //     fontSize: 18,
// //   },
// //   boldText: {
// //     fontWeight: 'bold',
// //   },
// //   itemsAddedSection: {
// //     marginBottom: 20,
// //   },
// //   itemsAddedText: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //   },
// //   emptyCartContainer: {
// //     alignItems: 'center',
// //   },
// //   emptyCartText: {
// //     fontSize: 18,
// //     color: '#999',
// //   },
// //   cartItemContainer: {
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#ccc',
// //     paddingVertical: 10,
// //   },
// //   cartItemRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //   },
// //   itemName: {
// //     fontSize: 18,
// //   },
// //   itemImage: {
// //     width: 50,
// //     height: 50,
// //     borderRadius: 5,
// //   },
// //   priceRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //   },
// //   priceText: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   quantityControl: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginVertical: 10,
// //   },
// //   controlText: {
// //     fontSize: 24,
// //     marginHorizontal: 10,
// //   },
// //   quantityText: {
// //     fontSize: 18,
// //   },
// //   addMoreItemsContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingVertical: 10,
// //   },
// //   addItemRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   addMoreText: {
// //     marginLeft: 10,
// //     fontSize: 18,
// //   },
// //   billingDetails: {
// //     marginBottom: 20,
// //   },
// //   billingTitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //   },
// //   billingInfo: {
// //     backgroundColor: '#f8f8f8',
// //     padding: 10,
// //     borderRadius: 5,
// //   },
// //   billingRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     paddingVertical: 5,
// //   },
// //   labelText: {
// //     fontSize: 16,
// //   },
// //   amountText: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   paymentFooter: {
// //     marginTop: 20,
// //     borderTopWidth: 1,
// //     borderTopColor: '#ccc',
// //     paddingTop: 20,
// //   },
// //   footerButtons: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginTop: 10,
// //   },
// //   clearCartButton: {
// //     backgroundColor: '#e74c3c',
// //     padding: 10,
// //     borderRadius: 5,
// //     flex: 1,
// //     marginRight: 5,
// //   },
// //   clearCartText: {
// //     color: '#fff',
// //     textAlign: 'center',
// //     fontWeight: 'bold',
// //   },
// //   checkoutButton: {
// //     backgroundColor: '#2ecc71',
// //     padding: 10,
// //     borderRadius: 5,
// //     flex: 1,
// //     marginLeft: 5,
// //   },
// //   checkoutText: {
// //     color: '#fff',
// //     textAlign: 'center',
// //     fontWeight: 'bold',
// //   },
// //   modalContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //   },
// //   modalContent: {
// //     width: '80%',
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //     padding: 20,
// //   },
// //   modalTitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 5,
// //     padding: 10,
// //     marginBottom: 10,
// //   },
// //   button: {
// //     backgroundColor: '#3498db',
// //     padding: 10,
// //     borderRadius: 5,
// //     alignItems: 'center',
// //   },
// //   closeButton: {
// //     backgroundColor: '#e74c3c',
// //     marginTop: 10,
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //   },
// // });

// // // Picker Select Styles
// // const pickerSelectStyles = StyleSheet.create({
// //   inputIOS: {
// //     fontSize: 16,
// //     padding: 10,
// //     marginVertical: 10,
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 5,
// //   },
// //   inputAndroid: {
// //     fontSize: 16,
// //     padding: 10,
// //     marginVertical: 10,
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 5,
// //   },
// // });

// // export default Cart;


// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Pressable,
//   Image,
//   Alert,
//   TextInput,
//   Modal,
//   TouchableOpacity,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Entypo from 'react-native-vector-icons/Entypo';
// import RNPickerSelect from 'react-native-picker-select';
// import axios from 'axios';

// const API_URL_CHECKOUT = `http://10.0.2.2:8083/userorder/create/registuserorderrations`;
// const API_URL = `http://10.0.2.2:8083/user/get/user_id/1`;
// const IMAGE_API_URL = item_id =>
//   `http://10.0.2.2:8083/items/add-item_photo/${item_id}`;

// const Cart = ({navigation, route}) => {
//   const [cart, setCart] = useState([]);
//   const [quantity, setQuantity] = useState({});
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [instructions, setInstructions] = useState('');

//   useEffect(() => {
//     if (route.params?.items) {
//       setCart(route.params.items);
//     }
//   }, [route.params?.items]);

//   const total = cart.reduce((sum, item) => {
//     const itemQuantity = quantity[item.itemname] || 1;
//     return sum + item.price * itemQuantity;
//   }, 0);

//   const paymentOptions = [{label: 'Paypal', value: 'paypal'}];

//   const updateQuantity = (itemname, change) => {
//     setQuantity(prev => ({
//       ...prev,
//       [itemname]: Math.max((prev[itemname] || 1) + change, 1),
//     }));
//   };

//   const handleAddItems = () => navigation.navigate('SEARCH');

//   const handleClearCart = () => {
//     Alert.alert('Clear Cart', 'Are you sure you want to clear the cart?', [
//       {text: 'Cancel', style: 'cancel'},
//       {
//         text: 'OK',
//         onPress: () => {
//           setCart([]);
//           setQuantity({});
//         },
//       },
//     ]);
//   };

//   const addCookingInstructions = () => {
//     setModalVisible(false);
//   };

//   const [loading, setLoading] = useState(false);

//   const handleCheckout = async () => {
//     if (!paymentMethod) {
//       Alert.alert('Error', 'Please select a payment method.');
//       return;
//     }
  
//     if (paymentMethod === 'paypal') {
//       navigation.navigate('PAYPAL'); // Navigate to PayPal screen
//       return;
//     }
  
//     setLoading(true);
//     try {
//       const cartResponse = await axios.get(API_URL);
//       const user = cartResponse.data;
//       const payload = {
//         user: {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           phone: user.phno,
//           address: user.address,
//         },
//         items: cart.map(item => ({
//           id: item.item_id,
//           name: item.itemname,
//           quantity: quantity[item.itemname] || 1,
//           price: item.price,
//         })),
//         paymentMethod,
//         instructions,
//         total: total + 20, // Including delivery fee
//       };
  
//       const response = await axios.post(API_URL_CHECKOUT, payload);
//       Alert.alert('Success', 'Your order has been placed successfully!', [
//         {
//           text: 'OK',
//           onPress: () => {
//             setCart([]);
//             setQuantity({});
//             setPaymentMethod('');
//             setInstructions('');
//             navigation.navigate('YourOrder', { order: response.data });
//           },
//         },
//       ]);
//     } catch (error) {
//       Alert.alert('Error', error.response?.data?.message || 'Failed to place order. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <ScrollView style={styles.container}>
//       <Header navigation={navigation} />
//       <DeliveryInfo />
//       <ItemsAdded
//         cart={cart}
//         quantity={quantity}
//         updateQuantity={updateQuantity}
//       />
//       <AddMoreSection
//         onAddItems={handleAddItems}
//         onOpenModal={() => setModalVisible(true)}
//       />
//       <BillingDetails total={total} />
//       {total > 0 && (
//         <PaymentFooter
//           total={total}
//           paymentOptions={paymentOptions}
//           paymentMethod={paymentMethod}
//           setPaymentMethod={setPaymentMethod}
//           handleClearCart={handleClearCart}
//           handleCheckout={handleCheckout}
//         />
//       )}
//       <AddInstructionsModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         onAdd={addCookingInstructions}
//         instructions={instructions}
//         setInstructions={setInstructions}
//       />
//     </ScrollView>
//   );
// };

// const AddInstructionsModal = ({
//   visible,
//   onClose,
//   onAdd,
//   instructions,
//   setInstructions,
// }) => (
//   <Modal transparent visible={visible} animationType="slide">
//     <View style={styles.modalContainer}>
//       <View style={styles.modalContent}>
//         <Text style={styles.modalTitle}>Add Cooking Instructions</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your instructions here"
//           value={instructions}
//           onChangeText={setInstructions}
//         />
//         <TouchableOpacity style={styles.button} onPress={onAdd}>
//           <Text style={styles.buttonText}>Add</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.button, styles.closeButton]}
//           onPress={onClose}>
//           <Text style={styles.buttonText}>Close</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </Modal>
// );

// // Header Component
// const Header = ({navigation}) => (
//   <View style={styles.header}>
//     <Ionicons
//       name="arrow-back-outline"
//       color="black"
//       size={30}
//       onPress={() => navigation.goBack()}
//     />
//     <Text style={styles.headerText}>Hotel</Text>
//   </View>
// );

// // Delivery Info Component
// const DeliveryInfo = () => (
//   <View style={styles.deliveryContainer}>
//     <Text style={styles.delivery}>
//       Delivery in <Text style={styles.boldText}>35-40 mins</Text>
//     </Text>
//   </View>
// );

// // Items Added Section
// const ItemsAdded = ({cart, quantity, updateQuantity}) => (
//   <View style={styles.itemsAddedSection}>
//     <Text style={styles.itemsAddedText}>All Items</Text>
//     {cart.length === 0 ? (
//       <EmptyCart />
//     ) : (
//       cart.map((item, index) => (
//         <CartItem
//           key={index}
//           item={item}
//           quantity={quantity[item.name] || 1}
//           updateQuantity={updateQuantity}
//         />
//       ))
//     )}
//   </View>
// );

// // Empty Cart Component
// const EmptyCart = () => (
//   <View style={styles.emptyCartContainer}>
//     <Text style={styles.emptyCartText}>🛒 No items added to the cart</Text>
//   </View>
// );

// // Individual Cart Item
// const CartItem = ({item, quantity, updateQuantity}) => (
//   <Pressable style={styles.cartItemContainer}>
//     <View style={styles.cartItemRow}>
//       <Text style={styles.itemName}>{item.itemname}</Text>
//       <Image
//         style={styles.itemImage}
//         source={{uri: IMAGE_API_URL(item.item_id)}}
//       />
//     </View>
//     <QuantityControl
//       item={item}
//       quantity={quantity}
//       updateQuantity={updateQuantity}
//     />
//     <View style={styles.priceRow}>
//       <Text style={styles.priceText}>
//         ₹{(item.price * quantity).toFixed(2)}
//       </Text>
//     </View>
//   </Pressable>
// );

// // Quantity Control for Cart Item
// const QuantityControl = ({item, quantity, updateQuantity}) => (
//   <View style={styles.quantityControl}>
//     <Pressable onPress={() => updateQuantity(item.itemname, -1)}>
//       <Text style={styles.controlText}>-</Text>
//     </Pressable>
//     <Text style={styles.quantityText}>{quantity}</Text>
//     <Pressable onPress={() => updateQuantity(item.itemname, 1)}>
//       <Text style={styles.controlText}>+</Text>
//     </Pressable>
//   </View>
// );

// // Add More Section
// const AddMoreSection = ({onAddItems, onOpenModal}) => (
//   <View>
//     <AddMoreItem
//       text="Add more Items"
//       onPress={onAddItems}
//       icon={<Octicons name="plus-circle" color="#d97b29" size={30} />}
//     />
//     <AddMoreItem
//       text="Add Cooking Instructions"
//       onPress={onOpenModal}
//       icon={<Entypo name="new-message" color="#d97b29" size={30} />}
//     />
//   </View>
// );

// // Add More Item Component
// const AddMoreItem = ({text, icon, onPress}) => (
//   <Pressable onPress={onPress} style={styles.addMoreItemsContainer}>
//     <View style={styles.addItemRow}>
//       {icon}
//       <Text style={styles.addMoreText}>{text}</Text>
//     </View>
//     <AntDesign name="right" color="#d97b29" size={30} />
//   </Pressable>
// );

// // Billing Details Component
// const BillingDetails = ({total}) => (
//   <View style={styles.billingDetails}>
//     <Text style={styles.billingTitle}>Billing Details</Text>
//     <View style={styles.billingInfo}>
//       {renderBillingRow('Item Total', `₹${total.toFixed(2)}`)}
//       {renderBillingRow('Delivery Fee', '₹20.00')}
//       {renderBillingRow('Total', `₹${(total + 20).toFixed(2)}`)}
//     </View>
//   </View>
// );

// // Helper function to render billing rows
// const renderBillingRow = (label, amount) => (
//   <View style={styles.billingRow}>
//     <Text style={styles.billingLabel}>{label}</Text>
//     <Text style={styles.billingAmount}>{amount}</Text>
//   </View>
// );

// // Payment Footer Component
// const PaymentFooter = ({
//   total,
//   paymentOptions,
//   paymentMethod,
//   setPaymentMethod,
//   handleClearCart,
//   handleCheckout,
// }) => (
//   <View>
//     <View style={styles.paymentSection}>
//       <RNPickerSelect
//         placeholder={{label: 'Select Payment Method', value: null}}
//         value={paymentMethod}
//         onValueChange={value => setPaymentMethod(value)}
//         items={paymentOptions}
//         style={pickerSelectStyles}
//       />
//     </View>
//     <View style={styles.footerButtons}>
//       <TouchableOpacity
//         style={[styles.button, styles.clearCartButton]}
//         onPress={handleClearCart}>
//         <Text style={styles.buttonText}>Clear Cart</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleCheckout}>
//         <Text style={styles.buttonText}>
//           Place Order - ₹{(total + 20).toFixed(2)}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// );

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   deliveryContainer: {
//     marginBottom: 20,
//   },
//   delivery: {
//     fontSize: 18,
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   itemsAddedSection: {
//     marginBottom: 20,
//   },
//   itemsAddedText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   emptyCartContainer: {
//     alignItems: 'center',
//   },
//   emptyCartText: {
//     fontSize: 18,
//     color: '#999',
//   },
//   cartItemContainer: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     paddingVertical: 10,
//   },
//   cartItemRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   itemName: {
//     fontSize: 18,
//   },
//   itemImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 5,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   priceText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   quantityControl: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   controlText: {
//     fontSize: 24,
//     marginHorizontal: 10,
//   },
//   quantityText: {
//     fontSize: 18,
//   },
//   addMoreItemsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   addItemRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   addMoreText: {
//     marginLeft: 10,
//     fontSize: 18,
//   },
//   billingDetails: {
//     marginBottom: 20,
//   },
//   billingTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   billingInfo: {
//     backgroundColor: '#f8f8f8',
//     padding: 10,
//     borderRadius: 5,
//   },
//   billingRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 5,
//   },
//   labelText: {
//     fontSize: 16,
//   },
//   amountText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   paymentFooter: {
//     marginTop: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//     paddingTop: 20,
//   },
//   footerButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   clearCartButton: {
//     backgroundColor: '#e74c3c',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 5,
//   },
//   clearCartText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   checkoutButton: {
//     backgroundColor: '#2ecc71',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginLeft: 5,
//   },
//   checkoutText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#3498db',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   closeButton: {
//     backgroundColor: '#e74c3c',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// // Picker Select Styles
// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     padding: 10,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   inputAndroid: {
//     fontSize: 16,
//     padding: 10,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
// });

// export default Cart;




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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore } from '../utils/firebaseConfig';

const API_URL_CHECKOUT = `http://10.0.2.2:8083/userorder/create/registuserorderrations`;
const API_URL = `http://10.0.2.2:8083/user/get/user_id/1`;
const IMAGE_API_URL = item_id =>
  `http://10.0.2.2:8083/items/add-item_photo/${item_id}`;

const Cart = ({navigation, route}) => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [instructions, setInstructions] = useState('');
  
  const getAddressList = async () => {
    try {
      const userId = await AsyncStorage.getItem('USERID');
      const addressId = await AsyncStorage.getItem('Address');
      const userDoc = await firestore().collection('users').doc(userId).get();
      const userData = userDoc.data();
      const tempData = userData?.address || [];
  
      // Find the selected address and set it in the state
      const selectedAddressItem = tempData.find(item => item.addressId === addressId);
      if (selectedAddressItem) {
        setSelectedAddress({
          street: selectedAddressItem.street,
          addressLine1: selectedAddressItem.addressLine1,
          addressLine2: selectedAddressItem.addressLine2,
          city: selectedAddressItem.city,
          state: selectedAddressItem.state,
          zipCode: selectedAddressItem.zipCode,
          mobileNumber: selectedAddressItem.mobileNumber,
          addressId: selectedAddressItem.addressId,
        });
      }
      
      // Optionally, set the entire address list to the state if needed
      setAddressList(tempData);
    } catch (error) {
      console.error("Error fetching address list: ", error);
    }
  };
  
  useEffect(() => {
    if (route.params?.items) {
      setCart(route.params.items);
    }
  }, [route.params?.items]);

  const total = cart.reduce((sum, item) => {
    const itemQuantity = quantity[item.itemname] || 1;
    return sum + item.price * itemQuantity;
  }, 0);

  const paymentOptions = [{label: 'Paypal', value: 'paypal'}];

  const updateQuantity = (itemname, change) => {
    setQuantity(prev => ({
      ...prev,
      [itemname]: Math.max((prev[itemname] || 1) + change, 1),
    }));
  };

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
    setModalVisible(false);
  };

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!paymentMethod) {
      Alert.alert('Error', 'Please select a payment method.');
      return;
    }
  
    if (paymentMethod === 'paypal') {
      navigation.navigate('PAYPAL'); // Navigate to PayPal screen
      return;
    }
  
    setLoading(true);
    try {
      const cartResponse = await axios.get(API_URL);
      const user = cartResponse.data;
      const payload = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phno,
          address: user.address,
        },
        items: cart.map(item => ({
          id: item.item_id,
          name: item.itemname,
          quantity: quantity[item.itemname] || 1,
          price: item.price,
        })),
        paymentMethod,
        instructions,
        total: total + 20, // Including delivery fee
      };
  
      const response = await axios.post(API_URL_CHECKOUT, payload);
      Alert.alert('Success', 'Your order has been placed successfully!', [
        {
          text: 'OK',
          onPress: () => {
            setCart([]);
            setQuantity({});
            setPaymentMethod('');
            setInstructions('');
            navigation.navigate('YourOrder', { order: response.data });
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
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
  );
};

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
      <Text style={styles.itemName}>{item.itemname}</Text>
      <Image
        style={styles.itemImage}
        source={{uri: IMAGE_API_URL(item.item_id)}}
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
    </View>
  </Pressable>
);

// Quantity Control for Cart Item
const QuantityControl = ({item, quantity, updateQuantity}) => (
  <View style={styles.quantityControl}>
    <Pressable onPress={() => updateQuantity(item.itemname, -1)}>
      <Text style={styles.controlText}>-</Text>
    </Pressable>
    <Text style={styles.quantityText}>{quantity}</Text>
    <Pressable onPress={() => updateQuantity(item.itemname, 1)}>
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

const SelectAddress = ({ text, icon, onPress, navigation }) => (
  <Pressable onPress={onPress} style={styles.selectAddressContainer}>
    <View style={styles.addressRow}>
      {icon}
      <Text style={styles.addressText} onPress={()=>(
        navigation.navigate('Address')
      )}>Change Address</Text>
    </View>
    <AntDesign name="right" color="#d97b29" size={30} />
  </Pressable>
);

// Billing Details Component
const BillingDetails = ({total}) => (
  <View style={styles.billingDetails}>
    <Text style={styles.billingTitle}>Billing Details</Text>
    <View style={styles.billingInfo}>
      {renderBillingRow('Item Total', `₹${total.toFixed(2)}`)}
      {renderBillingRow('Delivery Fee', '₹20.00')}
      {renderBillingRow('Total', `₹${(total + 20).toFixed(2)}`)}
    </View>
  </View>
);

// Helper function to render billing rows
const renderBillingRow = (label, amount) => (
  <View style={styles.billingRow}>
    <Text style={styles.billingLabel}>{label}</Text>
    <Text style={styles.billingAmount}>{amount}</Text>
  </View>
);

// Payment Footer Component
const PaymentFooter = ({
  total,
  paymentOptions,
  paymentMethod,
  setPaymentMethod,
  handleClearCart,
  handleCheckout,
}) => (
  <View>
    <View style={styles.paymentSection}>
      <RNPickerSelect
        placeholder={{label: 'Select Payment Method', value: null}}
        value={paymentMethod}
        onValueChange={value => setPaymentMethod(value)}
        items={paymentOptions}
        style={pickerSelectStyles}
      />
    </View>
    <View style={styles.footerButtons}>
      <TouchableOpacity
        style={[styles.button, styles.clearCartButton]}
        onPress={handleClearCart}>
        <Text style={styles.buttonText}>Clear Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>
          Place Order - ₹{(total + 20).toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  deliveryContainer: {
    marginBottom: 20,
  },
  delivery: {
    fontSize: 18,
  },
  boldText: {
    fontWeight: 'bold',
  },
  itemsAddedSection: {
    marginBottom: 20,
  },
  itemsAddedText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyCartContainer: {
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#999',
  },
  selectAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderColor: '#d97b29',
    borderWidth: 1,
    marginVertical: 10,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  cartItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  cartItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  controlText: {
    fontSize: 24,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
  },
  addMoreItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  addItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addMoreText: {
    marginLeft: 10,
    fontSize: 18,
  },
  billingDetails: {
    marginBottom: 20,
  },
  billingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  billingInfo: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 5,
  },
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  labelText: {
    fontSize: 16,
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentFooter: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  clearCartButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  clearCartText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  checkoutText: {
    color: '#fff',
    textAlign: 'center',
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

// Picker Select Styles
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default Cart;
