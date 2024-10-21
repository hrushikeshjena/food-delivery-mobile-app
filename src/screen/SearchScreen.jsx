import React, {useState, useEffect, useCallback} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {debounce} from 'lodash'

// API URL
const API_URL = 'http://10.0.2.2:8083/items/get/allitem'

const ItemCard = React.memo(
  ({item, addItems, addItemToCart, removeItemFromCart, goToDetailPage}) => (
    <View key={item.id} style={styles.item}>
      <Pressable style={styles.pressable} onPress={() => goToDetailPage(item)}>
        <View style={styles.infoContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
          <Text style={styles.itemDescription}>
            {item.description.length > 40
              ? `${item.description.slice(0, 40)}...`
              : item.description}
          </Text>
          <TouchableOpacity
            onPress={() => goToDetailPage(item)}
            style={styles.iconContainer}>
            <Ionicons
              name='arrow-redo-circle-outline'
              size={25}
              color='#D97B29'
            />
          </TouchableOpacity>
        </View>
        <View>
          <Image source={{uri: item.imageUrl}} style={styles.itemImage} />
          {addItems[item.id] ? (
            <QuantityControl
              item_id={item.id}
              quantity={addItems[item.id]}
              addItemToCart={addItemToCart}
              removeItemFromCart={removeItemFromCart}
            />
          ) : (
            <Pressable
              onPress={() => addItemToCart(item.id)}
              style={styles.addToCartButton}>
              <Text style={styles.controlText}>Add</Text>
            </Pressable>
          )}
        </View>
      </Pressable>
    </View>
  ),
)

const QuantityControl = ({
  item_id,
  quantity,
  addItemToCart,
  removeItemFromCart,
}) => (
  <View style={styles.quantityControl}>
    <Pressable onPress={() => removeItemFromCart(item_id)}>
      <Text style={styles.controlText}>-</Text>
    </Pressable>
    <Text style={styles.quantityText}>{quantity}</Text>
    <Pressable onPress={() => addItemToCart(item_id)}>
      <Text style={styles.controlText}>+</Text>
    </Pressable>
  </View>
)

const SearchScreen = () => {
  const [items, setItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [addItems, setAddItems] = useState({})
  const [filter, setFilter] = useState('all')
  const navigation = useNavigation()

  const fetchItems = async () => {
    setLoading(true)
    try {
      const response = await axios.get(API_URL)
      setItems(response.data || [])
    } catch (err) {
      setError('Error fetching items. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleSearch = useCallback(
    debounce(text => {
      setSearchQuery(text)
    }, 300),
    [],
  )

  const getFilteredItems = () => {
    const lowerCaseQuery = searchQuery.toLowerCase()
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(lowerCaseQuery),
    )

    if (filter === 'veg') {
      return filtered.filter(item => item.category === 'veg')
    } else if (filter === 'non-veg') {
      return filtered.filter(item => item.category === 'nonVeg')
    }
    return filtered
  }

  const addItemToCart = item_id => {
    setAddItems(prevItems => ({
      ...prevItems,
      [item_id]: (prevItems[item_id] || 0) + 1,
    }))
  }

  const removeItemFromCart = item_id => {
    setAddItems(prevItems => {
      const updatedItems = {...prevItems}
      if (updatedItems[item_id]) {
        if (updatedItems[item_id] > 1) {
          updatedItems[item_id]--
        } else {
          delete updatedItems[item_id] 
        }
      }
      return updatedItems
    })
  }

  const goToDetailPage = item => {
    navigation.navigate('DetailsScreen', {item})
  }

  const getTotal = () => {
    return Object.entries(addItems).reduce((total, [item_id, quantity]) => {
      const item = items.find(item => item.id === item_id)
      return total + (item ? item.price * quantity : 0)
    }, 0)
  }

  const cartList = Object.entries(addItems).filter(
    ([_, quantity]) => quantity > 0,
  )

  if (loading) {
    return (
      <ActivityIndicator size='large' color='#D97B29' style={styles.loader} />
    )
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>
  }

  const filteredItems = getFilteredItems()

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder='Search items...'
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['all', 'veg', 'non-veg'].map(type => (
          <TouchableOpacity
            key={type}
            onPress={() => setFilter(type)}
            style={[
              styles.filterButton,
              filter === type && styles.activeFilter,
            ]}>
            <Text style={styles.filterText}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.itemList}>
        {filteredItems.length > 0 ? (
          <FlatList
            data={filteredItems}
            renderItem={({item}) => (
              <ItemCard
                item={item}
                addItems={addItems}
                addItemToCart={addItemToCart}
                removeItemFromCart={removeItemFromCart}
                goToDetailPage={goToDetailPage}
              />
            )}
            keyExtractor={item => item.id} // Ensure key is a string
          />
        ) : (
          <Text style={styles.noItemsText}>No items found.</Text>
        )}
      </View>

      {cartList.length > 0 && (
        <View style={styles.checkoutView}>
          <Text style={{color: '#000', fontWeight: '600'}}>
            {'Items (' + cartList.length + ')\nTotal: ₹' + getTotal()}
          </Text>
          <TouchableOpacity
            style={[styles.addToCartButton, {width: 100, height: 40}]}
            onPress={() => navigation.navigate('CART', {cartItems: addItems})}>
            <Text style={{color: '#fff'}}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginRight: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#D97B29',
  },
  filterText: {
    fontSize: 16,
    color: '#333',
  },
  itemList: {
    padding: 10,
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
  item: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 15,
    marginTop: 5,
    color: '#D97B29',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  iconContainer: {
    marginTop: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  controlText: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#333',
  },
  quantityText: {
    fontSize: 20,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#D97B29',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  checkoutView: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    marginVertical: 20,
  },
})

export default SearchScreen
