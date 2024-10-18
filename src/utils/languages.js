
import {
  View,
  Text,
  Modal,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icon from react-native-vector-icons

const {height, width} = Dimensions.get('window');

const Languages = ({langModalVisible, setLangModalVisible, setLangIndex}) => {
  const [selectedLang, setSelectedLang] = useState(0);  // Holds the index of the selected language
  const [languages, setLanguages] = useState([
    {name: 'English', selected: true},
    {name: 'हिन्दी', selected: false},
    {name: 'ਪੰਜਾਬੀ', selected: false},
    {name: 'اردو', selected: false},
    {name: 'தமிழ்', selected: false},
  ]);

  const selectLanguage = index => {
    // Update the selected language and store the selected index
    const updatedLanguages = languages.map((language, i) => ({
      ...language,
      selected: i === index,
    }));
    setLanguages(updatedLanguages);
    setSelectedLang(index);  // Set the index of the selected language
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={langModalVisible}
      onRequestClose={() => {
        setLangModalVisible(!langModalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Select Language</Text>
          <View style={{width: '100%'}}>
            <FlatList
              data={languages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.languageItem}
                    onPress={() => selectLanguage(index)}>
                    <Icon
                      name={
                        item.selected
                          ? 'radio-button-checked'
                          : 'radio-button-unchecked'
                      }
                      size={24}
                      color={item.selected ? 'green' : 'gray'}
                      style={styles.icon}
                    />
                    <Text style={styles.languageText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={styles.btns}>
            <TouchableOpacity
              onPress={() => {
                setLangModalVisible(!langModalVisible);  // Close modal without applying changes
              }}
              style={styles.cancelButton}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLangModalVisible(!langModalVisible);  // Close modal and apply selected language
                setLangIndex(selectedLang);  // Pass the selected language index to parent
              }}
              style={styles.applyButton}>
              <Text style={styles.btnText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Languages;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalView: {
    margin: 20,
    width: width - 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  languageItem: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  languageText: {
    fontSize: 16,
  },
  btns: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    width: '40%',
    height: 50,
    backgroundColor: '#8e8e8e',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButton: {
    width: '40%',
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
});
