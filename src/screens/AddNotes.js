import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../utils/ThemeContext'; // Import useTheme hook

// This component allows users to select which currency notes they want to add
const AddNotes = ({navigation, route}) => {
  const {currentNotes} = route.params || {}; // Get current notes from route params
  const {currentTheme} = useTheme(); // Get current theme from context

  // Initialize selectedNotes state with currentNotes or default values
  const [selectedNotes, setSelectedNotes] = useState(() => {
    return (
      currentNotes || {
        // Default values for selected notes
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
        0.5: true,
      }
    );
  });

  // Load saved notes from AsyncStorage when the component mounts
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const saved = await AsyncStorage.getItem('selectedNotes'); // Retrieve saved notes from AsyncStorage
        if (saved) setSelectedNotes(JSON.parse(saved)); // Parse and set saved notes to state
      } catch (err) {
        console.error('Error loading notes:', err);
      }
    };
    loadNotes(); // Call the function to load notes
  }, []);

  const toggleNote = async note => {
    // Toggle the selected state of a note
    const updated = {
      // Update the selected notes state
      ...selectedNotes, // Spread the current selected notes
      [note]: !selectedNotes[note], // Toggle the selected state of the note
    };
    setSelectedNotes(updated); // Update the state with the new selected notes
    await AsyncStorage.setItem('selectedNotes', JSON.stringify(updated)); // Save the updated notes to AsyncStorage
  };

  const handleApply = async () => {
    // Handle the apply button press
    try {
      await AsyncStorage.setItem(
        'selectedNotes',
        JSON.stringify(selectedNotes),
      ); // Save the selected notes to AsyncStorage
      navigation.navigate('HomeScreen', {selectedNotes}); // Navigate back to HomeScreen with the selected notes
    } catch (err) {
      console.error('Error saving notes:', err);
    }
  };

  // Define the available rupee and coin notes

  const rupeeNotes = [
    '5000',
    '2000',
    '1000',
    '500',
    '200',
    '100',
    '75',
    '50',
    '20',
    '10',
    '5',
    '2',
    '1',
  ];
  const coinNotes = ['20', '10', '5', '2', '1'];

  // Render the note grid with toggle functionality
  const renderNoteGrid = (
    notes, // Function to render the note grid
  ) => (
    <View style={styles.grid}>
      {notes.map(
        (
          note, // Map through the notes to create a grid of note cards
        ) => (
          <TouchableOpacity
            key={note}
            style={[
              styles.noteCard,
              selectedNotes[note] ? styles.cardSelected : styles.cardUnselected,
              {backgroundColor: currentTheme.cardBackground}, // Apply dynamic background color
            ]}
            onPress={() => toggleNote(note)} // Toggle the note when pressed
            activeOpacity={0.8}>
            <Text style={[styles.noteLabel, {color: currentTheme.text}]}>
              ₹{note === '0.5' ? '0.50' : note}
            </Text>{' '}
            {/* Display the note value */}
            <Switch
              value={selectedNotes[note]}
              onValueChange={() => toggleNote(note)}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={selectedNotes[note] ? '#1976D2' : '#f4f3f4'}
            />
          </TouchableOpacity>
        ),
      )}
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={currentTheme.primary}
        barStyle="light-content"
      />
      <View style={[styles.topBar, {backgroundColor: currentTheme.primary}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, {color: currentTheme.text}]}>
          Add Notes
        </Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.sectionTitle, {color: currentTheme.text}]}>
          Rupees
        </Text>
        {renderNoteGrid(rupeeNotes)}

        <Text style={[styles.sectionTitle, {color: currentTheme.text}]}>
          Coins
        </Text>
        {renderNoteGrid(coinNotes)}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.applyButton,
              {backgroundColor: currentTheme.primary},
            ]}
            onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const spacing = 12;
const columns = 3; // Set to 3 columns
const totalSpacing = spacing * (columns + 1); // Adjust spacing to account for 3 columns
const cardWidth = (screenWidth - totalSpacing) / columns; // Calculate card width based on screen size

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
    elevation: 4,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    padding: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 8,
    marginTop: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  noteCard: {
    width: 118,
    height: 60,
    margin: spacing / 3,
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#1976D2',
  },
  cardUnselected: {
    borderWidth: 1,
    borderColor: '#CFD8DC',
  },
  noteLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  applyButton: {
    paddingVertical: 12,
    borderRadius: 25,
  },
  applyButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddNotes;
