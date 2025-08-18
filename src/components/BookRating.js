import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const BookRating = ({ score }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="star" size={15} color={colors.kIconColor} />
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#D3D3D3',
    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
  },
  score: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
    color: colors.kBlackColor,
  },
});

export default BookRating;