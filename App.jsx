/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import WelcomeScreen from './src/screen/WelcomeScreen';
import SignupScreen from './src/screen/SignUpScreen';
import HomeScreenComponent from './src/screen/HomeScreen';
import SearchScreen from './src/screen/SearchScreen';
import CartScreen from './src/screen/Cart';
import OrderScreen from './src/screen/OrderScreen';
import DetailsScreen from './src/screen/DetailsScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import OrderDetails from './src/screen/OrderDetails';
import AdminDashboard from './src/screen/AdminDashboard';
import AddItems from './src/screen/AddItems';
import OrderStatus from './src/components/OrderStatus';
import EditProfile from './src/screen/EditProfile';
import CombinedYourOrder from './src/screen/YourOrder';
import LoginAdmin from './src/screen/LoginAdmin';
import LoginUser from './src/screen/LoginUsers';
import MenuItem from './src/components/MenuItem';

function HomeScreen() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="HOME" screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HOME"
        component={HomeScreenComponent}
        options={{
          title: 'Home',
          tabBarIcon: ({size, color}) => (
            <Icon name="home" size={size} color="#D97B29" />
          ),
        }}
      />
      <Tab.Screen
        name="SEARCH"
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({size, color}) => (
            <Icon name="search" size={size} color="#D97B29" />
          ),
        }}
      />
      <Tab.Screen
        name="CART"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarIcon: ({size, color}) => (
            <Icon name="cart" size={size} color="#D97B29" /> 
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="WELCOME" component={WelcomeScreen} />
        <Stack.Screen name="ADMIN" component={LoginAdmin} />
        <Stack.Screen name="USER" component={LoginUser} />
        {/* LoginAdmin  LoginUser */}
        {/* <Stack.Screen name="SIGNUP" component={SignupScreen} /> */}
        <Stack.Screen name="HOME" component={HomeScreen} />
        <Stack.Screen name="ADMINDASHBOARD" component={AdminDashboard} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="CART" component={CartScreen} />
        <Stack.Screen name="ORDER" component={OrderScreen} />
        <Stack.Screen name="PROFILE" component={ProfileScreen} />
        <Stack.Screen name="ORDERDETAILS" component={OrderDetails} />
        <Stack.Screen name="ADDITEMS" component={AddItems} />
        <Stack.Screen name="ORDERSTATUS" component={OrderStatus} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="YourOrder" component={CombinedYourOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
