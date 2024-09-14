import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const PayPalCheckout = () => {
  const [approvalUrl, setApprovalUrl] = useState(null);

  const createPayment = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/paypal/create?sum=10.00');
      setApprovalUrl(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onNavigationStateChange = (event) => {
    if (event.url.includes('success')) {
      const urlParams = new URLSearchParams(event.url.split('?')[1]);
      const paymentId = urlParams.get('paymentId');
      const payerId = urlParams.get('PayerID');

      axios.post('http://localhost:8080/api/paypal/execute', { paymentId, payerId })
        .then(response => {
          Alert.alert('Payment Status', response.data);
        }).catch(error => {
          console.error(error);
        });
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
        />
      )}
    </View>
  );
};

export default PayPalCheckout;
