import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const PayPalCheckout = () => {
  const [approvalUrl, setApprovalUrl] = useState(null);

  // Create a PayPal payment
  const createPayment = async () => {
    console.log('Creating PayPal payment...');
    try {
      const response = await axios.post('http://10.0.2.2:8084/payment/create');
      console.log('Payment created successfully:', response.data);
  
      // Check if the response data contains approvalUrl
      if (response.data.approvalUrl) {
        setApprovalUrl(response.data.approvalUrl);
      } else {
        Alert.alert('Payment Error', 'No approval URL returned from the server.');
      }
    } catch (error) {
      console.error('Error creating payment:', error.response?.data || error.message);
      Alert.alert('Payment Error', 'Could not create payment. Please try again later.');
    }
  };
  

  // Handle navigation within the WebView
  const onNavigationStateChange = async (event) => {
    console.log('Navigation state changed:', event.url);
    // Check if the URL contains 'success'
    if (event.url.includes('success')) {
      const urlParams = new URLSearchParams(event.url.split('?')[1]);
      const paymentId = urlParams.get('paymentId');
      const payerId = urlParams.get('PayerID');

      console.log('Payment successful with ID:', paymentId, 'and Payer ID:', payerId);

      try {
        const response = await axios.post(
          'http://10.0.2.2:8083/payment/success',
          { paymentId, payerId },
        );
        console.log('Payment confirmation response:', response.data);
        Alert.alert('Payment Status', response.data.message || 'Payment successful');
        // Optionally, reset approvalUrl to allow for new payments
        setApprovalUrl(null);
      } catch (error) {
        console.error('Error confirming payment:', error);
        Alert.alert('Payment Status', 'Payment failed. Please try again.');
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!approvalUrl ? (
        <Button title="Pay with PayPal" onPress={createPayment} />
      ) : (
        <WebView
          source={{ uri: approvalUrl }}
          onNavigationStateChange={onNavigationStateChange}
          startInLoadingState={true}
        />
      )}
    </View>
  );
};

export default PayPalCheckout;
