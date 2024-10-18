import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

const OrderStatus = () => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={
          route.params.status === 'success'
            ? require('../assets/Animation1.gif')
            : require('../assets/Animation.gif')
        }
        style={styles.icon}
      />
      <Text style={styles.msg}>
        {route.params.status === 'success'
          ? 'Order Placed Successfully !!'
          : 'Order failed !!'}
      </Text>
      <TouchableOpacity 
        style={styles.backToHome} 
        onPress={() => {
          navigation.navigate('HOME'); 
        }}
      >
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  icon: {
    width: '70%',
    height: '40%',
  },
  msg: {
    marginTop: 20, 
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backToHome: {
    marginTop: 30, 
    padding: 10,
    backgroundColor: '#D97B29', 
    borderRadius: 5,
  },
});
