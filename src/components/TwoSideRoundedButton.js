import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

const TwoSideRoundedButton = ({ text, radius = 29, onPress, style }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { borderRadius: radius }, style]} 
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.kBlackColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopLeftRadius: 29,
    borderBottomRightRadius: 29,
  },
  text: {
    color: colors.white,
    fontWeight: '500',
  },
});

export default TwoSideRoundedButton;