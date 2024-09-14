/* eslint-disable react-native/no-inline-styles */
import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker, Polyline} from 'react-native-maps';

const OrderScreen = () => {
  const [tip, setTip] = useState(0);
  // const time = moment().format('LT');
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
  return (
    <SafeAreaView>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 60,
          backgroundColor: '#fd5c63',
          padding: 10,
        }}>
        <View>
          <Text style={{color: 'white', fontSize: 15, fontWeight: '600'}}>
            Delivery in 25 mins
          </Text>
          <Text style={{color: 'white', fontSize: 15, fontWeight: '600'}}>
            Order Placed at {time}
          </Text>
        </View>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '600'}}>
          Help
        </Text>
      </View>
      <MapView
        ref={mapView}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{width: '100%', height: 400}}>
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
        <Polyline
          coordinates={coordinates}
          strokeColor="black"
          lineDashPattern={[4]}
          strokeWidth={1}></Polyline>
      </MapView>
      <View style={{padding: 10}}>
        <View>
          <Text style={{fontWeight: '500', fontSize: 17, textAlign: 'center'}}>
            {params?.name} has accepted your order
          </Text>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <FontAwesome name="hand-holding-heart" size={28} color="#fc8019" />

            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  paddingHorizontal: 2,
                  marginBottom: 6,
                }}>
                Tip your hunger Savior
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#696969',
                marginRight: 10,
                paddingHorizontal: 2,
              }}>
              Thank your delivery partner for helping you stay safe indoor.
              Support them through these tough times with a tip
            </Text>
            <Pressable
              style={{
                paddingTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setTip(30)}
                style={{
                  backgroundColor: '#f5f5f5',
                  padding: 10,
                  borderRadius: 7,
                  marginRight: 10,
                }}>
                <Text
                  style={{padding: 10, color: '#002d62', fontWeight: 'bold'}}>
                  30
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setTip(50)}
                style={{
                  backgroundColor: '#f5f5f5',
                  marginHorizontal: 10,
                  paddingHorizontal: 10,
                  borderRadius: 7,
                }}
                // eslint-disable-next-line no-trailing-spaces
              >
                <Text
                  style={{
                    padding: 10,
                    color: '#002d62',
                    fontWeight: 'bold',
                  }}>
                  ₹50
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setTip(70)}
                style={{
                  backgroundColor: '#f5f5f5',
                  marginHorizontal: 10,
                  paddingHorizontal: 10,
                  borderRadius: 7,
                }}>
                <Text
                  style={{padding: 10, color: '#002d62', fontWeight: 'bold'}}>
                  ₹70
                </Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        </View>
        {tip ? (

          <View>
            <Text style={{
              color:"#fc8019",
              fontSize: 16,
              fontWeight: "600",
              marginLeft:10,
              marginRight: 10,
              padding:10,
            }}>
please pay{"₹"}
{tip} to your delivery agent at the time of delivery
            </Text>
            <TouchableOpacity onPress={() => setTip(0)}
              activeOpacity={0.7}
              style={{padding:10, marginLeft:10, marginRight:10, position:"absolute", top:40, paddingBottom:40}}>
<Text style={{color:"red", fontSize:14, fontWeight:"700"}}>
(Cancel)
</Text>
            </TouchableOpacity>
          </View>
        ):
        
        null}
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;
