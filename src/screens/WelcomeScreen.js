import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import RoundedButton from '../components/RoundedButton';
import { colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={{ uri: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg' }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            <Text style={styles.titleNormal}>flamin</Text>
            <Text style={styles.titleBold}>go.</Text>
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <RoundedButton
            text="start reading"
            fontSize={20}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  titleContainer: {
    marginBottom: 50,
  },
  title: {
    fontSize: 48,
    color: colors.white,
    textAlign: 'center',
  },
  titleNormal: {
    fontWeight: 'normal',
  },
  titleBold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: width * 0.6,
  },
});

export default WelcomeScreen;