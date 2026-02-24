import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import {useTheme} from '../utils/ThemeContext';
import TotalSummary from './TotalSummary';
import numberToWords from '../utils/numberstowords';

const {width: screenWidth} = Dimensions.get('window');

const CashCounter = forwardRef(({visibleNotes}, ref) => {
  const {currentTheme} = useTheme();

  const [fivethousand, setFiveThousand] = useState('');
  const [twothousand, setTwoThousand] = useState('');
  const [onethousand, setOneThousand] = useState('');
  const [fivehundred, setFiveHundred] = useState('');
  const [twohundred, setTwoHundred] = useState('');
  const [hundred, setHundred] = useState('');
  const [seventyfive, setSeventyFive] = useState('');
  const [fifty, setFifty] = useState('');
  const [twenty, setTwenty] = useState('');
  const [ten, setTen] = useState('');
  const [five, setFive] = useState('');
  const [two, setTwo] = useState('');
  const [one, setOne] = useState('');
  const [additionalAmount, setAdditionalAmount] = useState('');

  useImperativeHandle(ref, () => ({
    clearAllFields: clearAllFields,
  }));

  function clearAllFields() {
    setFiveThousand('');
    setTwoThousand('');
    setOneThousand('');
    setFiveHundred('');
    setTwoHundred('');
    setHundred('');
    setSeventyFive('');
    setFifty('');
    setTwenty('');
    setTen('');
    setFive('');
    setTwo('');
    setOne('');
    setAdditionalAmount('');
  }

  const calculateTotal = (denomination, amount) =>
    denomination * (parseInt(amount) || 0);

  const denominations = [
    {label: '₹5000X', value: fivethousand, set: setFiveThousand, denom: 5000},
    {label: '₹2000X', value: twothousand, set: setTwoThousand, denom: 2000},
    {label: '₹1000X', value: onethousand, set: setOneThousand, denom: 1000},
    {label: '₹500X', value: fivehundred, set: setFiveHundred, denom: 500},
    {label: '₹200X', value: twohundred, set: setTwoHundred, denom: 200},
    {label: '₹100X', value: hundred, set: setHundred, denom: 100},
    {label: '₹75X', value: seventyfive, set: setSeventyFive, denom: 75},
    {label: '₹50X', value: fifty, set: setFifty, denom: 50},
    {label: '₹20X', value: twenty, set: setTwenty, denom: 20},
    {label: '₹10X', value: ten, set: setTen, denom: 10},
    {label: '₹5X', value: five, set: setFive, denom: 5},
    {label: '₹2X', value: two, set: setTwo, denom: 2},
    {label: '₹1X', value: one, set: setOne, denom: 1},
  ];

  const visibleDenominations = denominations.filter(
    ({denom}) => visibleNotes[denom],
  );

  const denominationTotal = denominations.reduce(
    (sum, {denom, value}) => sum + calculateTotal(denom, value),
    0,
  );

  const totalAmount = denominationTotal + (parseInt(additionalAmount) || 0);
  const totalInWords = numberToWords(totalAmount);

  const noteDenoms = [5000, 2000, 1000, 500, 200, 100, 75, 50, 20, 10];
  const coinDenoms = [5, 2, 1];

  const totalNoteCount = denominations
    .filter(({denom}) => noteDenoms.includes(denom))
    .reduce((sum, {value}) => sum + (parseInt(value) || 0), 0);

  const totalCoinCount = denominations
    .filter(({denom}) => coinDenoms.includes(denom))
    .reduce((sum, {value}) => sum + (parseInt(value) || 0), 0);

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: currentTheme.background}]}>
      <View style={styles.container}>
        <TextInput
          style={[
            styles.wordsInput,
            {color: currentTheme.text, borderColor: currentTheme.primary},
          ]}
          value={totalInWords}
          editable={false}
          multiline
        />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {visibleDenominations.map(({label, value, set, denom}, index) => (
            <View
              key={index}
              style={[
                styles.denominationRow,
                {backgroundColor: currentTheme.cardBackground},
              ]}>
              <Text
                style={[styles.denominationText, {color: currentTheme.text}]}>
                {label}
              </Text>

              <TextInput
                style={[
                  styles.input,
                  {borderColor: currentTheme.primary, color: currentTheme.text},
                ]}
                keyboardType="numeric"
                value={value}
                onChangeText={set}
                placeholder="00"
              />

              <Text style={[styles.totalText, {color: currentTheme.primary}]}>
                ₹{calculateTotal(denom, value)}
              </Text>
            </View>
          ))}

          {/* Additional input field */}
          <View
            style={[
              styles.denominationRow,
              {backgroundColor: currentTheme.cardBackground},
            ]}>
            <Text style={[styles.denominationText, {color: currentTheme.text}]}>
              Plus +
            </Text>

            <TextInput
              style={[
                styles.input,
                {borderColor: currentTheme.primary, color: currentTheme.text},
              ]}
              keyboardType="numeric"
              value={additionalAmount}
              onChangeText={setAdditionalAmount}
              placeholder="0"
            />

            <Text style={[styles.totalText, {color: currentTheme.primary}]}>
              ₹{parseInt(additionalAmount) || 0}
            </Text>
          </View>
        </ScrollView>

        <TotalSummary
          totalAmount={totalAmount}
          noteCount={totalNoteCount}
          coinCount={totalCoinCount}
        />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  container: {flex: 1, padding: screenWidth * 0.03},
  scrollContent: {paddingBottom: 20},
  wordsInput: {
    backgroundColor: '#fff',
    padding: screenWidth * 0.03,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: screenWidth * 0.04,
    marginBottom: 10,
  },
  denominationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: screenWidth * 0.025,
    paddingHorizontal: screenWidth * 0.04,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 6,
  },
  denominationText: {
    width: screenWidth * 0.22,
    fontSize: screenWidth * 0.045,
    fontWeight: 'bold',
  },
  input: {
    width: screenWidth * 0.35,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: screenWidth * 0.04,
    marginHorizontal: screenWidth * 0.02,
  },
  totalText: {
    width: screenWidth * 0.22,
    fontSize: screenWidth * 0.042,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default CashCounter;
