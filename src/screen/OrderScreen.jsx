/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker, Polyline} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const OrderScreen = ({route, navigation}) => {
  const {params} = route;
  const [tip, setTip] = useState(0);
  const [time, setTime] = useState('');
  const mapViewRef = useRef(null);

  // Coordinates for the map
  const [coordinates] = useState([
    {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    {
      latitude: 13.0451,
      longitude: 77.6269,
    },
  ]);

  useEffect(() => {
    setTime(moment().format('LT'));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Delivery in 25 mins</Text>
          <Text style={styles.headerText}>Order Placed at {time}</Text>
        </View>
        <Text style={styles.helpText}>Help</Text>
      </View>

      {/* MapView */}
      <MapView
        ref={mapViewRef}
        initialRegion={{
          latitude: 12.9716,
          longitude: 77.5946,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        style={styles.map}
        showsUserLocation={true}>
        <Marker coordinate={coordinates[0]} title="Restaurant" />
        <Marker coordinate={coordinates[1]} title="Delivery Location" />
        <Polyline
          coordinates={coordinates}
          strokeColor="black"
          lineDashPattern={[4]}
          strokeWidth={2}
        />
      </MapView>

      {/* Tip and Order Status */}
      <View style={styles.orderContainer}>
        <Text style={styles.orderStatusText}>
          {params?.name} has accepted your order
        </Text>

        {/* Tip Section */}
        <View style={styles.tipContainer}>
          <FontAwesome name="hand-holding-heart" size={28} color="#fc8019" />
          <View style={{marginLeft: 10}}>
            <Text style={styles.tipTitle}>Tip your Hunger Savior</Text>
            <Text style={styles.tipDescription}>
              Thank your delivery partner for helping you stay safe indoors.
              Support them through these tough times with a tip.
            </Text>
          </View>
        </View>

        {/* Tip Options */}
        <View style={styles.tipOptions}>
          {[30, 50, 70].map(amount => (
            <TouchableOpacity
              key={amount}
              activeOpacity={0.6}
              onPress={() => setTip(amount)}
              style={styles.tipButton}>
              <Text style={styles.tipButtonText}>₹{amount}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Display Tip Confirmation */}
        {tip ? (
          <View>
            <Text style={styles.confirmTipText}>
              Please pay ₹{tip} to your delivery agent at the time of delivery.
            </Text>
            <TouchableOpacity onPress={() => setTip(0)} activeOpacity={0.7}>
              <Text style={styles.cancelText}>(Cancel)</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#fd5c63',
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  helpText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 400,
  },
  orderContainer: {
    padding: 10,
  },
  orderStatusText: {
    fontWeight: '500',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 20,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 6,
  },
  tipDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#696969',
  },
  tipOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  tipButton: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 7,
  },
  tipButtonText: {
    color: '#002d62',
    fontWeight: 'bold',
  },
  confirmTipText: {
    color: '#fc8019',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  cancelText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '700',
  },
});
