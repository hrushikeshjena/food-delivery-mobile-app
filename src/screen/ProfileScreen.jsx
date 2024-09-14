import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const ProfileScreen = () => {
  const [name, setName] = useState('Daniel Rozar');
  const [email, setEmail] = useState('danielrozar@gmail.com');
  const [school, setSchool] = useState('The Lawrenceville School');
  const [nickname, setNickname] = useState('r.denial');
  const [emergencyContact, setEmergencyContact] = useState('Jessica Curl');
  const [emergencyNumber, setEmergencyNumber] = useState('+1-987654321');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          {/* <Image source={require('./back-arrow.png')} style={styles.backArrow} /> */}
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      <View style={styles.profile}>
        {/* <Image source={require('./profile-pic.png')} style={styles.profileImage} /> */}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Name</Text>
          <TextInput
            style={styles.infoInput}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email Address</Text>
          <TextInput
            style={styles.infoInput}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>School</Text>
          <TextInput
            style={styles.infoInput}
            value={school}
            onChangeText={setSchool}
          />
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Nick Name</Text>
          <TextInput
            style={styles.infoInput}
            value={nickname}
            onChangeText={setNickname}
          />
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Emergency Contact</Text>
          <TextInput
            style={styles.infoInput}
            value={emergencyContact}
            onChangeText={setEmergencyContact}
          />
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Emergency Number</Text>
          <TextInput
            style={styles.infoInput}
            value={emergencyNumber}
            onChangeText={setEmergencyNumber}
          />
        </View>

        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>UPDATE PROFILE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          {/* <Image source={require('./calendar.png')} style={styles.footerIcon} /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          {/* <Image source={require('./document.png')} style={styles.footerIcon} /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          {/* <Image source={require('./user.png')} style={styles.footerIcon} /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          {/* <Image source={require('./settings.png')} style={styles.footerIcon} /> */}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    width: 20,
    height: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#333',
  },
  profile: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#007bff',
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    elevation: 2,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
    backgroundColor: '#fff',
  },
  updateButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerItem: {
    padding: 8,
  },
  footerIcon: {
    width: 24,
    height: 24,
  },
});

export default ProfileScreen;
