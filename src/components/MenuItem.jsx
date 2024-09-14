// import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
// import React, {useState} from 'react';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const MenuItem = ({item}) => {
//   const [addItems, setAddItems] = useState(0);
//   const [selected, setSelected] = useState(false);
//   return (
//     <View>
//       <Pressable
//         // eslint-disable-next-line react-native/no-inline-styles
//         style={{
//           margin: 10,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           marginVertical: 15,
//         }}>
//         <View>
//           <Text style={{fontSize: 18, fontWeight: '600', width: 220}}>
//             {item?.name}
//           </Text>
//           <Text style={{fontSize: 15, marginTop: 4, fontWeight: '500'}}>
//             ₹{item?.price}
//           </Text>
//           {/* <Text style={{marginTop: 5, borderRadius: 4}}>
//             {[0, 0, 0, 0, 0].map((_, i) => (
//               <FontAwesome
//                 key={i}
//                 style={{paddingHorizontal: 3}}
//                 name={i < Math.floor(item.rating) ? 'star' : 'star-o'}
//                 size={15}
//                 color="#ffd700"
//               />
//             ))}
//           </Text> */}
//           <Text style={{marginTop: 5, borderRadius: 4}}>
//             {Array(5)
//               .fill(0)
//               .map((_, i) => (
//                 <FontAwesome
//                   key={i}
//                   style={{paddingHorizontal: 3}}
//                   name={i < Math.floor(item.rating) ? 'star' : 'star-o'}
//                   size={15}
//                   color="#ffd700"
//                 />
//               ))}
//           </Text>

//           <Text style={{width: 200, marginTop: 8, color: 'gray', fontSize: 16}}>
//             {item?.description.length > 40
//               ? item?.description.slice(0, 40) + '...'
//               : item?.description}
//           </Text>
//         </View>
//         <View>
//           <Pressable>
//             <Image
//               style={{width: 120, height: 120, borderRadius: 8}}
//               source={{uri: item?.image}}
//             />
//             {selected ? (
//               <View style={styles.quantityControl}>
//                 <Pressable
//                   onPress={() => {
//                     if (addItems === 1) {
//                       setAddItems(0);
//                       setSelected(false);
//                     } else {
//                       setAddItems(prevCount => prevCount - 1);
//                     }
//                   }}>
//                   <Text style={styles.controlText}>-</Text>
//                 </Pressable>

//                 <Text style={styles.quantityText}>{addItems}</Text>

//                 <Pressable
//                   onPress={() => {
//                     setAddItems(prevCount => prevCount + 1);
//                   }}>
//                   <Text style={styles.controlText}>+</Text>
//                 </Pressable>
//               </View>
//             ) : (
//               <Pressable
//                 onPress={() => {
//                   setSelected(true);
//                   if (addItems === 0) {
//                     setAddItems(prevCount => prevCount + 1);
//                   }
//                 }}
//                 style={styles.addToCartButton}>
//                 <Text style={styles.controlText}>Add</Text>
//               </Pressable>
//             )}
//           </Pressable>
//         </View>
//       </Pressable>
//     </View>
//   );
// };

// export default MenuItem;

// const styles = StyleSheet.create({
//   quantityControl: {
//     position: 'absolute',
//     top: 95,
//     left: 20,
//     borderColor: '#e32636',
//     borderWidth: 1,
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderRadius: 5,
//   },
//   addToCartButton: {
//     position: 'absolute',
//     top: 95,
//     left: 20,
//     borderColor: '#e32636',
//     borderWidth: 1,
//     paddingHorizontal: 25,
//     paddingVertical: 5,
//     backgroundColor: 'white',
//     borderRadius: 5,
//   },
//   controlText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#fd5c63',
//   },
//   quantityText: {
//     marginHorizontal: 10,
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });


import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const MenuItem = ({item}) => {
  const navigation = useNavigation();

  const [addItems, setAddItems] = useState(0);
  const [selected, setSelected] = useState(false);


  const handleCart =()=>{
    navigation.navigate('CART')
  }

  return (
    <View>
      <Pressable
        style={{
          margin: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 15,
        }}>
        <View>
          <Text style={{fontSize: 18, fontWeight: '600', width: 220}}>
            {item?.name}
          </Text>
          <Text style={{fontSize: 15, marginTop: 4, fontWeight: '500'}}>
            ₹{item?.price}
          </Text>

          {/* Display star rating */}
          <Text style={{marginTop: 5, borderRadius: 4}}>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <FontAwesome
                  key={i}
                  style={{paddingHorizontal: 3}}
                  name={i < Math.floor(item.rating) ? 'star' : 'star-o'}
                  size={15}
                  color="#ffd700"
                />
              ))}
          </Text>

          {/* Item description */}
          <Text style={{width: 200, marginTop: 8, color: 'gray', fontSize: 16}}>
            {item?.description.length > 40
              ? item?.description.slice(0, 40) + '...'
              : item?.description}
          </Text>
        </View>

        {/* Image and Add to Cart section */}
        <View>
          <Pressable>
            <Image
              style={{width: 120, height: 120, borderRadius: 8}}
              source={{uri: item?.image}}
            />
            {selected ? (
              <View style={styles.quantityControl}>
                <Pressable
                  onPress={() => {
                    if (addItems === 1) {
                      setAddItems(0);
                      setSelected(false);
                    } else {
                      setAddItems(prevCount => prevCount - 1);
                    }
                  }}>
                  <Text style={styles.controlText}>-</Text>
                </Pressable>

                <Text style={styles.quantityText}>{addItems}</Text>

                <Pressable
                  onPress={() => {
                    setAddItems(prevCount => prevCount + 1);
                  }}>
                  <Text style={styles.controlText}>+</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  setSelected(true);
                  if (addItems === 0) {
                    setAddItems(prevCount => prevCount + 1);
                  }
                }}
                style={styles.addToCartButton}>
                <Text style={styles.controlText}>Add</Text>
              </Pressable>
            )}
          </Pressable>
        </View>
      </Pressable>

      {/* Add to cart message based on addItems */}
      {addItems > 0 && (
        <Pressable
            onPress={handleCart}
          style={{
            backgroundColor: '#fd5c63',
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 15,
              fontWeight: '500',
            }}>
            {addItems} item{addItems > 1 ? 's' : ''} added
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              marginTop: 5,
              fontWeight: '600',
            }}>
            Add item(s) worth ₹240 to reduce surge fee by ₹35.
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  quantityControl: {
    position: 'absolute',
    top: 95,
    left: 20,
    borderColor: '#e32636',
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
    borderColor: '#e32636',
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  controlText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fd5c63',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
