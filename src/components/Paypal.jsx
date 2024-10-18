import React, {useState} from 'react';
import {View, Button, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import axios from 'axios';

const PayPalCheckout = () => {
  const [approvalUrl, setApprovalUrl] = useState(null);

  // Create a PayPal payment
  const createPayment = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:8083/payment/create');
      setApprovalUrl(response.data.approvalUrl);
    } catch (error) {
      console.error(
        'Error creating payment:',
        error.response?.data || error.message,
      );
    }
  };

  // Handle navigation within the WebView
  const onNavigationStateChange = async event => {
    if (event.url.includes('success')) {
      const urlParams = new URLSearchParams(event.url.split('?')[1]);
      const paymentId = urlParams.get('paymentId');
      const payerId = urlParams.get('PayerID');

      try {
        const response = await axios.post(
          'http://10.0.2.2:8083/payment/success',
          {paymentId, payerId},
        );
        Alert.alert(
          'Payment Status',
          response.data.message || 'Payment successful',
        );
      } catch (error) {
        console.error('Error confirming payment:', error);
        Alert.alert('Payment Status', 'Payment failed. Please try again.');
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      {!approvalUrl ? (
        <Button title="Pay with PayPal" onPress={createPayment} />
      ) : (
        <WebView
          source={{uri: approvalUrl}}
          onNavigationStateChange={onNavigationStateChange}
          startInLoadingState={true}
        />
      )}
    </View>
  );
};

export default PayPalCheckout;
