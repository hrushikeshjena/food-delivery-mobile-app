import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons

const recommended = [
  {
    id: 0,
    name: 'Lorem ipseum',
    image: '../assets/close.jpg', // Replace with actual image URL
    // time: '35-40 mins',
    type: 'Andhra',
    rating: 4.5,
    isFavorite: false,
    distance: '2.5 km',
    priceLevel: '$$',
    description: 'Popular for authentic Andhra cuisine with spicy delicacies.',
  },
  {
    id: 1,
    name: 'Lorem ipseum',
    image: 'https://example.com/malgudi-days.jpg', // Replace with actual image URL
    // time: '25-30 mins',
    type: 'South Indian',
    rating: 4.7,
    isFavorite: true,
    distance: '1.8 km',
    priceLevel: '$$',
    description:
      'A cozy spot serving traditional South Indian dishes with modern twists.',
  },
  {
    id: 2,
    name: 'Lorem ipseum',
    image: 'https://example.com/spice-junction.jpg', // Replace with actual image URL
    // time: '45-50 mins',
    type: 'North Indian',
    rating: 4.3,
    isFavorite: false,
    distance: '3.2 km',
    priceLevel: '$$$',
    description:
      'Known for rich North Indian curries and an elegant dining experience.',
  },
];

const BigCard = ({onDetailsPress}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}>
        {recommended?.map(item => (
          <View key={item.id} style={styles.card}>
            <Image style={styles.image} source={{uri: item.image}} />
            <View style={styles.content}>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                {/* <View style={styles.timeContainer}>
                  <Icon name="access-time" size={14} color="#666" />
                  <Text style={styles.timeText}>{item.time} mins</Text>
                </View> */}
                <Text style={styles.type}>{item.type}</Text>
              </View>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => onDetailsPress(item.id)}>
                <Icon name="arrow-forward" size={20} color="#007bff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Icon
                name={item.isFavorite ? 'favorite' : 'favorite-border'}
                size={20}
                color={item.isFavorite ? 'red' : '#666'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>


      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 0,
  },
  card: {
    backgroundColor: 'white',
    width: 250, // Set fixed width
    height: 250, // Set fixed height to make the card square
    marginRight: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'relative',
  },
  image: {
    width: '100%', // Full width of the card
    height: '60%', // Adjusted to fit the card
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10, // Adjusted to fit within the card
    left: 10,
    right: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timeText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  type: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  detailsButton: {
    marginLeft: 10, // Ensure space between info and details button
  },
});

export default BigCard;
