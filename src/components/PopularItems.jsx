import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const IMAGE_API_URL = item_id =>
  `http://10.0.2.2:8083/items/add-item_photo/${item_id}`;

const API_URL = 'http://10.0.2.2:8083/items/get/allitem';

const PopularItems = () => {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(API_URL);
        setRecommended(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const lastFiveItems = recommended.slice(-5);

  const goToDetailPage = item => {
    navigation.navigate('DetailsScreen', { item });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}>
        {lastFiveItems.length === 0 ? (
          <Text style={styles.emptyText}>No items available</Text>
        ) : (
          lastFiveItems.map(item => (
            <View key={item.id} style={styles.card}>
              <Image style={styles.image} source={{ uri: IMAGE_API_URL(item.item_id) }} />
              <View style={styles.content}>
                <View style={styles.info}>
                  <Text style={styles.name}>{item.itemname}</Text>
                  <Text style={styles.type}>{item.type}</Text>
                </View>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => goToDetailPage(item)}
                >
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
          ))
        )}
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
    width: 250,
    height: 250,
    marginRight: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '60%',
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
    bottom: 10,
    left: 10,
    right: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
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
    marginLeft: 10,
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 20,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginVertical: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
  },
});

export default PopularItems;
