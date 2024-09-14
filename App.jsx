import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './src/screen/WelcomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SignUpScreen';
import HomeScreen from './src/screen/HomeScreen';
import SearchScreen from './src/screen/SearchScreen';
import CartScreen from './src/screen/Cart';
import OrderScreen from './src/screen/OrderScreen';
import PayPalCheckout from './src/components/Paypal';

// enableScreens();

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="WELCOME" component={WelcomeScreen} />
        <Stack.Screen name="LOGIN" component={LoginScreen} />
        <Stack.Screen name="SIGNUP" component={SignupScreen} />
        {/* <Stack.Screen name="HOME" component={HomeScreen} /> */}
        <Stack.Screen name="HOME" component={SearchScreen} />
        <Stack.Screen name="CART" component={CartScreen} />
        <Stack.Screen name="ORDER" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
