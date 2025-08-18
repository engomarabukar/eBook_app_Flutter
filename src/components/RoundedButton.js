import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

const RoundedButton = ({ 
  text, 
  onPress, 
  verticalPadding = 16, 
  horizontalPadding = 30, 
  fontSize = 16,
  style 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { 
        paddingVertical: verticalPadding, 
        paddingHorizontal: horizontalPadding 
      }, style]} 
      onPress={onPress}
    >
      <Text style={[styles.text, { fontSize }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    shadowColor: '#666666',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.11,
    shadowRadius: 30,
    elevation: 8,
  },
  text: {
    fontWeight: 'bold',
    color: colors.kBlackColor,
  },
});

export default RoundedButton;