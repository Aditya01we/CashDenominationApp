import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Alert,
  SafeAreaView,
  View,
} from 'react-native';
import TopBar from '../components/TopBar';
import CashCounter from '../components/CashCounter';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../utils/ThemeContext';

const HomeScreen = ({ route }) => {
  const cashCounterRef = useRef();
  const navigation = useNavigation();
  const { currentTheme } = useTheme();

  const [visibleNotes, setVisibleNotes] = useState({
    5000: false,
    2000: false,
    1000: false,
    500: true,
    200: true,
    100: true,
    50: true,
    20: true,
    10: true,
    5: true,
    2: true,
    1: true,
  });

  // Handle Delete without ads
  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'After delete, this cannot be restored. Continue?',
      [
        { text: 'Cancel', style: 'cancel', color: currentTheme.text },
        {
          text: 'Delete',
          onPress: () => {
            // Clear all cash counter fields without showing ads
            cashCounterRef.current?.clearAllFields();
          },
          style: 'destructive',
          color: currentTheme.error,
        },
      ],
      {
        cancelable: true,
        titleStyle: { color: currentTheme.text },
        messageStyle: { color: currentTheme.text },
      }
    );
  };

  // Handle notes visibility based on selected notes from route params
  useEffect(() => {
    if (route.params?.selectedNotes) {
      setVisibleNotes((prev) => ({
        ...prev,
        ...route.params.selectedNotes,
      }));
      navigation.setParams({ selectedNotes: undefined });
    }
  }, [route.params?.selectedNotes]);

  // Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
    },
    safeArea: {
      flex: 1,
      backgroundColor: currentTheme.primary,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <SafeAreaView style={styles.container}>
        <TopBar
          onDelete={handleDelete}
          navigation={navigation}
        />
        <CashCounter
          ref={cashCounterRef}
          visibleNotes={visibleNotes}
          theme={currentTheme}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default HomeScreen;
