// import React, {useEffect, useState} from 'react';
// import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {firestore} from '../utils/firebaseConfig';

// const Address = () => {
//   const [addressList, setAddressList] = useState([]);
//   const isFoused = useIsFocused();
//   const [selectedAddress, setSelectedAddress] = useState('')
//   useEffect(() => {
//     getAddressList();
//   }, [isFocused]);
//   const getAddressList = async () => {
//     const userId = await AsyncStorage.getItem('USERID');
// const addressId = await AsyncStorage.getItem('Address')
//     const user = await firestore().collection('users').doc(userId).get();
//     let tempDart = [];
//     tempDart = user._data.address;
// tempDart.map (item =>{
//     if(item.addressId == addressId){
//         item.selected = true
//     }
//     else{
//         item.selected = false
//     }
// })

//     setAddressList(tempDart)
//   };
//   const navigation = useNavigation();

//   const handleAddNewAddress = () => {
//     navigation.navigate('ADDNEWADDRESS');
//   };

//   const saveDefaultAddress = async ( ) => {
//     await AsyncStorage.setItem('Address', item.addressId)
//     let tempDart = [];
//     tempDart = addressList;
// tempDart.map (item =>{
//     if(item.addressId == addressId){
//         itm.selected = true
//     }
//     else{
//         itm.selected = false
//     }

//     let temp =[]
//     tempDart.map(item =>{
//         temp.push(item)
//     })
//     setAddressList(temp)
// }
//   return (
//     <View style={styles.container}>
//         <FlatList  data={addressList} renderItem={()=>{
//             return(
//                 <View>
//                     <View>
//                         <Text>{'street  :'Item.street}</Text>
//                         <Text>{Item.Zipcode}</Text>
//                         <Text>{Item.city}</Text>
//                         <Text>{Item.address1}</Text>
//                         <Text>{Item.address2}</Text>
//                         <Text>{Item.moblieNumber}</Text>
//                     </View>
//                 {tempDart.selected==true? (<Text>Selected</Text>):( <TouchableOpacity onPress={() => {
//                     saveDefaultAddress(item);
//                 }}>
//                         <Text> Set Default</Text>
//                     </TouchableOpacity>)}   
//                 </View>
//             )
//         }}/>
//       <TouchableOpacity style={styles.addButton} onPress={handleAddNewAddress}>
//         <Text style={styles.addButtonText}>Add New Address</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addButton: {
//     backgroundColor: '#d97b29',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default Address;


import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore } from '../utils/firebaseConfig';

const Address = () => {
  const [addressList, setAddressList] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      getAddressList();
    }
  }, [isFocused]);

  const getAddressList = async () => {
    try {
      const userId = await AsyncStorage.getItem('USERID');
      const addressId = await AsyncStorage.getItem('Address');
      const userDoc = await firestore().collection('users').doc(userId).get();
      const userData = userDoc.data();
      const tempData = userData?.address || [];

      // Mark selected address
      const updatedAddressList = tempData.map(item => ({
        ...item,
        selected: item.addressId === addressId,
      }));

      setAddressList(updatedAddressList);
    } catch (error) {
      console.error("Error fetching address list: ", error);
    }
  };

  const handleAddNewAddress = () => {
    navigation.navigate('ADDNEWADDRESS');
  };

  const saveDefaultAddress = async (item) => {
    await AsyncStorage.setItem('Address', item.addressId);
    const updatedAddressList = addressList.map(addr => ({
      ...addr,
      selected: addr.addressId === item.addressId,
    }));

    setAddressList(updatedAddressList);
  };

  const renderItem = ({ item }) => (
    <View style={styles.addressItem}>
      <Text>Street: {item.street}</Text>
      <Text>Zipcode: {item.Zipcode}</Text>
      <Text>City: {item.city}</Text>
      <Text>Address 1: {item.address1}</Text>
      <Text>Address 2: {item.address2}</Text>
      <Text>Mobile Number: {item.mobileNumber}</Text>
      {item.selected ? (
        <Text style={styles.selectedText}>Selected</Text>
      ) : (
        <TouchableOpacity onPress={() => saveDefaultAddress(item)}>
          <Text style={styles.setDefaultText}>Set Default</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={addressList}
        renderItem={renderItem}
        keyExtractor={(item) => item.addressId} // Use unique addressId as key
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddNewAddress}>
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addressItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedText: {
    color: 'green',
    fontWeight: 'bold',
  },
  setDefaultText: {
    color: '#d97b29',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#d97b29',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Address;
