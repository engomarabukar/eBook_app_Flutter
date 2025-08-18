import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const BookRating = ({ score, size = 'normal' }) => {
  const isSmall = size === 'small';
  
  return (
    <View style={[styles.container, isSmall && styles.containerSmall]}>
      <Ionicons 
        name="star" 
        size={isSmall ? 12 : 15} 
        color={colors.warning} 
      />
      <Text style={[styles.score, isSmall && styles.scoreSmall]}>
        {score}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  containerSmall: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  score: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginLeft: 4,
  },
  scoreSmall: {
    fontSize: 10,
  },
});

export default BookRating;