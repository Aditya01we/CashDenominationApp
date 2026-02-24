// TopBar.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  Dimensions,
  Animated,
  Pressable,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../utils/ThemeContext';

const { width } = Dimensions.get('window');

const TopBar = ({ onDelete, onAddNotes }) => {
  const { currentTheme } = useTheme();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [entryName, setEntryName] = useState('');
  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleThemePress = () => {
    closeMenu();
    navigation.navigate('ThemeScreen');
  };

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.75,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  const handleRateApp = () => {
    closeMenu();
    navigation.navigate('RateApp');
  };

  const saveEntry = async () => {
    if (!entryName.trim()) {
      Alert.alert('Validation', 'Please enter a name');
      return;
    }

    try {
      const history = JSON.parse(await AsyncStorage.getItem('history')) || [];
      history.push({ name: entryName.trim(), date: new Date().toISOString() });
      await AsyncStorage.setItem('history', JSON.stringify(history));
      setModalVisible(false);
      setEntryName('');
      Alert.alert('Success', 'Entry saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save entry');
    }
  };

  const handleAddNotes = () => {
    closeMenu();
    if (onAddNotes) onAddNotes();
    navigation.navigate('AddNotes');
  };

  const styles = StyleSheet.create({
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: currentTheme.primary,
      paddingHorizontal: 16,
      paddingVertical: 16,
      justifyContent: 'space-between',
      elevation: 4,
    },
    menuButton: {
      padding: 6,
    },
    menuIcon: {
      color: currentTheme.textLight,
    },
    date: {
      flex: 1,
      textAlign: 'center',
      color: currentTheme.textLight,
      fontSize: width * 0.04,
      fontWeight: '500',
    },
    rightButtons: {
      flexDirection: 'row',
    },
    button: {
      backgroundColor: currentTheme.background,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      marginLeft: 8,
    },
    buttonText: {
      color: currentTheme.primary,
      fontWeight: '600',
      fontSize: 14,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 20,
    },
    modalContent: {
      backgroundColor: currentTheme.background,
      borderRadius: 12,
      padding: 20,
      elevation: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: currentTheme.primary,
    },
    modalInput: {
      borderWidth: 1,
      borderColor: currentTheme.primary,
      borderRadius: 8,
      padding: 10,
      marginBottom: 20,
      fontSize: 16,
      color: currentTheme.text,
      backgroundColor: currentTheme.surface,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButtonCancel: {
      backgroundColor: currentTheme.secondary,
      padding: 10,
      borderRadius: 6,
      width: '45%',
    },
    modalButtonSave: {
      backgroundColor: currentTheme.primary,
      padding: 10,
      borderRadius: 6,
      width: '45%',
    },
    modalButtonText: {
      color: currentTheme.textLight,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    menuWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '120%',
      flexDirection: 'row',
      zIndex: 100,
    },
    menuBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    menuDrawer: {
      width: width * 0.75,
      backgroundColor: currentTheme.background,
      paddingTop: 60,
      paddingHorizontal: 20,
      height: '100%',
      elevation: 8,
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
    },
    menuHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: currentTheme.primary,
    },
    menuItem: {
      paddingVertical: 15,
      borderBottomColor: currentTheme.border,
      borderBottomWidth: 1,
    },
    menuItemText: {
      fontSize: 16,
      color: currentTheme.text,
    },
  });

  return (
    <>
      <StatusBar
        backgroundColor={currentTheme.primary}
        barStyle={currentTheme.isDark ? 'light-content' : 'dark-content'}
      />

      <SafeAreaView style={{ backgroundColor: currentTheme.primary }}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
            <FontAwesome name="bars" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.date}>{today}</Text>

          <View style={styles.rightButtons}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete} style={styles.button}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {menuVisible && (
        <View style={styles.menuWrapper}>
          <Pressable style={styles.menuBackdrop} onPress={closeMenu} />
          <Animated.View style={[styles.menuDrawer, { transform: [{ translateX: slideAnim }] }]}>
            <Text style={styles.menuHeader}>Menu</Text>
            <TouchableOpacity style={styles.menuItem} onPress={handleRateApp}>
              <Text style={styles.menuItemText}>Rate App</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleThemePress}>
              <Text style={styles.menuItemText}>Themes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleAddNotes}>
              <Text style={styles.menuItemText}>Add Notes</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Name</Text>
            <TextInput
              placeholder="Enter name..."
              style={styles.modalInput}
              value={entryName}
              onChangeText={setEntryName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonSave} onPress={saveEntry}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TopBar;
