import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes } from '../components/themes'; // Adjust path based on actual location

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => themes?.default || {});
  const [themeName, setThemeName] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('selectedTheme');
      const validTheme = savedTheme && themes[savedTheme] ? savedTheme : 'default';
      setCurrentTheme(themes[validTheme]);
      setThemeName(validTheme);
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setLoading(false);
    }
  };

  const changeTheme = async (newThemeName) => {
    try {
      const selected = themes[newThemeName] || themes.default;
      await AsyncStorage.setItem('selectedTheme', newThemeName);
      setCurrentTheme(selected);
      setThemeName(newThemeName);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, themeName, changeTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
