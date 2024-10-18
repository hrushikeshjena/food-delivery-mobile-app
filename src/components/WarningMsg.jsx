import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WarningMessage = ({isAdmin}) => {
  return (
    <View style={styles.warningContainer}>
      <Ionicons
        name={isAdmin ? 'alert-circle-outline' : 'information-circle-outline'}
        size={24}
        color={isAdmin ? '#fff' : '#fff'}
        style={styles.icon}
      />
      <Text style={styles.warningText}>
        {isAdmin ? ' Admin: Please log in here!' : ' User: Please log in here!'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  warningContainer: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#28A745', // Light yellow background
    borderColor: '#ffeeba', // Border color
    borderWidth: 1,
    borderRadius: 5,
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  warningText: {
    color: '#fff', // Darker text color for visibility
    fontSize: 16,
  },
});

export default WarningMessage;
