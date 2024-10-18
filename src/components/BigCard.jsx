import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const recommended = [
  {
    id: 0,
    name: 'Bavarian Feast',
    image:
      'https://cdn.pixabay.com/photo/2019/08/13/17/06/cheese-4403820_960_720.jpg',
    type: 'German',
    rating: 4.6,
    isFavorite: false,
    distance: '2.1 km',
    priceLevel: '$$',
    description:
      'Savor authentic Bavarian dishes, including pretzels and sausages, in a cozy atmosphere.',
  },
  {
    id: 1,
    name: 'Schnitzel Haus',
    image:
      'https://cdn.pixabay.com/photo/2018/10/28/19/44/schnitzel-3779726_1280.jpg',
    type: 'German',
    rating: 4.8,
    isFavorite: true,
    distance: '1.5 km',
    priceLevel: '$$',
    description:
      'A popular spot for crispy schnitzels and hearty sides, perfect for a satisfying meal.',
  },
  {
    id: 2,
    name: 'Berlin Currywurst',
    image:
      'https://cdn.pixabay.com/photo/2019/05/26/01/06/currywurst-4229460_640.jpg',
    type: 'Street Food',
    rating: 4.4,
    isFavorite: false,
    distance: '3.0 km',
    priceLevel: '$',
    description:
      'Enjoy the classic Berlin currywurst served with fries and tangy sauces in a casual setting.',
  },

  {
    id: 3,
    name: 'German Sausages',
    image:
      'https://cdn.pixabay.com/photo/2019/04/15/02/46/barbecue-4128310_640.jpg',
    type: 'Main Course',
    rating: 4.9,
    isFavorite: true,
    distance: '1.9 km',
    priceLevel: '$$$',
    description:
      'A variety of grilled German sausages served with sauerkraut and mustard.',
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
                <Icon name="arrow-forward" size={20} color="#D97B29" />
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
