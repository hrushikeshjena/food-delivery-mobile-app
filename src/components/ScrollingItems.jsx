import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import ItemsComponents from './ItemsComponents';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const API_URL = 'http://10.0.2.2:8083/items/get/allitem';
const IMAGE_API_URL = item_id =>
  `http://10.0.2.2:8083/items/add-item_photo/${item_id}`;

const ScrollingItem = () => {
  const [itemDatas, setItemDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      const updatedData = response.data.map(item => ({
        ...item,
        featured_image: IMAGE_API_URL(item.id),
      }));
      setItemDatas(updatedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>All Food Items</Text>
      <View style={{marginHorizontal: 8}}>
        {itemDatas.slice(0, 50).map(data => (
          <TouchableOpacity
            key={data.id}
            onPress={() => navigation.navigate('DetailsScreen', {item: data})}>
            <ItemsComponents data={data} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.moreButton}
        onPress={() => navigation.navigate('SEARCH')}>
        <Text style={styles.moreButtonText}>More...</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  headerText: {
    textAlign: 'center',
    marginTop: 7,
    letterSpacing: 4,
    marginBottom: 5,
    color: 'gray',
  },
  itemContainer: {
    width: 90,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  itemName: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 6,
    color: '#000',
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: 12,
    color: 'gray',
    marginTop: 3,
    textAlign: 'center',
  },
  errorContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#D97B29',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  moreButton: {
    backgroundColor: '#D97B29',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  moreButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ScrollingItem;
