
import React from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const Carousel = () => {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={3}
        paginationStyle={styles.pagination}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={require('../assets/close.jpg')} // Replace with your image URL
          />
          <Text style={styles.text}>Fresh Arrival</Text>
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={require('../assets/cooked.jpg')} // Replace with your image URL
          />
          <Text style={styles.text}>Delicious Meals</Text>
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={require('../assets/R.jpg')} // Replace with your image URL
          />
          <Text style={styles.text}>Special Offers</Text>
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,

  },
  wrapper: {
    height: width * 0.5, // Adjusted height for a more banner-like effect
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 5, // Shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  image: {
    width: width - 20, // Width adjusted for padding
    height: width * 0.5, // Height is now more proportional to screen width for banner effect
    resizeMode: 'cover',
    borderRadius: 15,
  },
  text: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for text
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  pagination: {
    bottom: 15,
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Light dot color
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#ff6600', // Custom active dot color
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
  },
});

export default Carousel;
