import React from 'react';
import {Pressable, StyleSheet, Text, View, Image, } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ItemsComponents = ({data}) => {
  return (
    <Pressable
      style={{
        marginHorizontal: 6,
        marginVertical: 12,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
      }}
      onPress={() => console.log(data?.name)}>
      <Image
        style={{
          width: '100%',
          aspectRatio: 6 / 4,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
        source={{uri: data?.featured_Image}}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{paddingVertical: 4, paddingHorizontal: 3}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{data?.name}</Text>
          <Text style={{fontSize: 14, color: 'gray', marginTop: 4}}>
            {data?.description}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#006a4e',
            borderRadius: 4,
            paddingHorizontal: 4,
            paddingVertical: 5,
            marginRight: 10,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>
            {data?.customerRating}5.5
          </Text>
          <MaterialCommunityIcons name="star" size={20} color="white" style={styles.icon} />
        </View>
      </View>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: '#c8c8c8',
          marginHorizontal: 10,
          marginVertical: 4,
          paddingLeft: 20,
        }}
      />
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
        <MaterialCommunityIcons
          name="brightness-percent"
          size={20}
          color="blue"
          style={styles.icon}
        />
        <Text>{data.discount}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 8, 
  },
});

export default ItemsComponents;
