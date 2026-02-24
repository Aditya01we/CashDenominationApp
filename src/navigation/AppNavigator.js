import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen'; 
import AddNotes from '../screens/AddNotes';
import ThemeScreen from '../screens/ThemeScreens'; 
import RateApp from '../screens/RateAppScreen'; 
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddNotes" component={AddNotes} />
      <Stack.Screen name="ThemeScreen" component={ThemeScreen} />
      <Stack.Screen name="RateApp" component={RateApp} />
  
    </Stack.Navigator>
  );
};

export default AppNavigator;
