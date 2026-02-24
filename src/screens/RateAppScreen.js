import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // FontAwesome for star icons
import { useTheme } from '../utils/ThemeContext'; // Custom hook to access current theme

// RateAppScreen component to allow users to rate the app and provide feedback
const RateAppScreen = ({ navigation }) => {
  // Access the current theme from the context
  const { currentTheme } = useTheme();

  // State for storing rating and feedback text
  const [rating, setRating] = useState(0); // Rating from 1 to 5 stars
  const [feedback, setFeedback] = useState(''); // User's feedback message

  // Handle submission of the rating and feedback
  const handleSubmit = () => {
    if (rating === 0) {
      // If no rating is selected, show an error alert
      Alert.alert('Error', 'Please select a rating');
      return;
    }
    
    // Show a success message after submission
    Alert.alert('Thank You!', 'Your feedback has been submitted successfully.');
    
    // Go back to the previous screen after submitting feedback
    navigation.goBack();
  };

  // Styles based on the current theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background, // Use background color from theme
    },
    topBar: {
      backgroundColor: currentTheme.primary, // Top bar color from theme
      padding: 16,
      flexDirection: 'row', // Row layout for the back button and title
      alignItems: 'center', // Vertically center the content
    },
    backButton: {
      marginRight: 16, // Spacing between back button and title
    },
    title: {
      color: currentTheme.textLight, // Title color from theme
      fontSize: 20,
      fontWeight: 'bold', // Bold font for the title
    },
    content: {
      padding: 20,
      alignItems: 'center', // Center all content in the screen
    },
    starsContainer: {
      flexDirection: 'row', // Arrange stars horizontally
      marginVertical: 20, // Vertical margin for spacing
    },
    star: {
      padding: 5, // Padding around each star icon
    },
    feedbackInput: {
      width: '100%', // Make input take up full width
      borderWidth: 1,
      borderColor: currentTheme.border, // Border color from theme
      borderRadius: 8,
      padding: 12,
      marginVertical: 20,
      color: currentTheme.text, // Text color from theme
      height: 100, // Set a fixed height for the input box
      textAlignVertical: 'top', // Align text at the top of the input box
    },
    submitButton: {
      backgroundColor: currentTheme.primary, // Button background from theme
      paddingHorizontal: 40,
      paddingVertical: 12,
      borderRadius: 8, // Rounded corners for button
    },
    submitText: {
      color: currentTheme.textLight, // Button text color from theme
      fontSize: 16,
      fontWeight: 'bold', // Bold text for the button
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Status bar configuration */}
      <StatusBar
        backgroundColor={currentTheme.primary} // Set the status bar color
        barStyle={currentTheme.isDark ? 'light-content' : 'dark-content'} // Adjust text color based on theme
      />
      
      {/* TopBar with back button and title */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton} // Style for back button
          onPress={() => navigation.goBack()} // Navigate back to the previous screen
        >
          {/* FontAwesome icon for the back arrow */}
          <FontAwesome name="arrow-left" size={24} color={currentTheme.textLight} />
        </TouchableOpacity>
        <Text style={styles.title}>Rate App</Text> {/* Screen title */}
      </View>
      
      {/* Content section */}
      <View style={styles.content}>
        {/* Container for star ratings */}
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            // Map over star ratings (1 to 5) and display a star icon
            <TouchableOpacity
              key={star} // Set a unique key for each star
              style={styles.star} // Style for each star
              onPress={() => setRating(star)} // Set the rating value when a star is clicked
            >
              {/* Display filled or empty star based on the rating */}
              <FontAwesome
                name={star <= rating ? 'star' : 'star-o'} // Filled or outline star based on rating
                size={40} // Star size
                color={star <= rating ? '#FFD700' : currentTheme.text} // Gold for filled stars, text color for empty stars
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback input section */}
        <TextInput
          style={styles.feedbackInput}
          placeholder="Write your feedback here..." // Placeholder text
          placeholderTextColor={currentTheme.textSecondary} // Placeholder text color from theme
          multiline // Allow multiple lines for feedback
          value={feedback} // Bind input value to state
          onChangeText={setFeedback} // Update state with user input
        />

        {/* Submit button to submit the feedback */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text> {/* Button text */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RateAppScreen;
