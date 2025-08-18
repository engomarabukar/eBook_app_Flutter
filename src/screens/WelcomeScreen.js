import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  Dimensions,
  Animated 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RoundedButton from '../components/RoundedButton';
import { colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ImageBackground 
      source={{ uri: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg' }}
      style={styles.container}
    >
      <LinearGradient
        colors={['rgba(108, 92, 231, 0.8)', 'rgba(162, 155, 254, 0.6)']}
        style={styles.overlay}
      >
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.appName}>
              <Text style={styles.titleNormal}>Book</Text>
              <Text style={styles.titleBold}>Verse</Text>
            </Text>
            <Text style={styles.subtitle}>
              Discover your next favorite book
            </Text>
          </View>
          
          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Text style={styles.featureText}>📚 Vast Library</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureText}>🎯 Personalized</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureText}>📖 Track Progress</Text>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <RoundedButton
              text="Start Your Journey"
              fontSize={18}
              onPress={() => navigation.navigate('Main')}
              style={styles.startButton}
            />
          </View>
        </Animated.View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  appName: {
    fontSize: 48,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  titleNormal: {
    fontWeight: '300',
  },
  titleBold: {
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  featuresContainer: {
    marginBottom: 50,
  },
  feature: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    width: width * 0.7,
  },
  startButton: {
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
});

export default WelcomeScreen;