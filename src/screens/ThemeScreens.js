import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {themes} from '../components/themes'; // All theme definitions
import {useTheme} from '../utils/ThemeContext'; // Custom hook to get/set current theme
import Icon from 'react-native-vector-icons/Ionicons'; // For the back arrow icon

// ThemeScreen component to let user choose a theme
const ThemeScreen = ({navigation}) => {
  // Get current theme colors and functions to change it
  const {changeTheme, currentTheme, themeName} = useTheme();

  // Called when user taps on a theme option
  const handleThemeSelect = async selectedTheme => {
    await changeTheme(selectedTheme); // Apply selected theme globally
    navigation.goBack(); // Go back to previous screen
  };

  return (
    // Root container with background from current theme
    <SafeAreaView
      style={[styles.container, {backgroundColor: currentTheme.background}]}>
      {/* Top bar with back arrow and title, themed dynamically */}
      <View style={[styles.topBar, {backgroundColor: currentTheme.primary}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={currentTheme.text} />
        </TouchableOpacity>
        <Text style={[styles.header, {color: currentTheme.text}]}>
          Select Theme
        </Text>
        {/* Empty view to balance layout and center title */}
        <View style={{width: 24}} />
      </View>

      {/* Scrollable list of theme options */}
      <ScrollView contentContainerStyle={styles.themeContainer}>
        {Object.entries(themes).map(([name, colors]) => (
          <TouchableOpacity
            key={name}
            style={styles.themeItem}
            onPress={() => handleThemeSelect(name)}>
            {/* Circle showing the theme's primary color */}
            <View
              style={[
                styles.circle,
                {
                  backgroundColor: colors.primary,
                  borderWidth: name === themeName ? 3 : 0, // Highlight selected theme
                  borderColor: '#000',
                },
              ]}
            />
            {/* Label under the circle */}
            <Text style={[styles.label, {color: currentTheme.text}]}>
              {name.charAt(0).toUpperCase() + name.slice(1)}{' '}
              {/* Capitalize theme name */}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles for ThemeScreen components
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row', // Arrange back arrow, title, and spacer horizontally
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  themeContainer: {
    flexDirection: 'row', // Display circles in rows
    flexWrap: 'wrap', // Allow wrapping to new lines
    justifyContent: 'center',
    padding: 16,
  },
  themeItem: {
    alignItems: 'center',
    margin: 16,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30, // Make it a circle
  },
  label: {
    marginTop: 8,
    fontSize: 14,
  },
});

export default ThemeScreen;
