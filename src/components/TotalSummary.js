import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../utils/ThemeContext';

const TotalSummary = ({ totalAmount, noteCount, coinCount }) => {
  const { currentTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.cardBackground }]}>
      <Text style={[styles.label, { color: currentTheme.text }]}>Total Amount</Text>
      <Text style={[styles.amount, { color: currentTheme.primary }]}>₹ {totalAmount}</Text>

      {/* Notes and Coins in one horizontal line */}
      <View style={styles.inlineRow}>
        <Text style={[styles.inlineText, { color: currentTheme.text }]}>
          Notes: <Text style={{ color: currentTheme.primary }}>{noteCount}</Text>
        </Text>
        <Text style={[styles.inlineText, { color: currentTheme.text }]}>
          Coins: <Text style={{ color: currentTheme.primary }}>{coinCount}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  inlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  inlineText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TotalSummary;
