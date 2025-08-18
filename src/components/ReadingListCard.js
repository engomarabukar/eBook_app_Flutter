import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BookRating from './BookRating';
import TwoSideRoundedButton from './TwoSideRoundedButton';
import { colors } from '../constants/colors';

const ReadingListCard = ({ 
  image, 
  title, 
  author, 
  rating, 
  onPressDetails, 
  onPressRead 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={image} style={styles.bookImage} resizeMode="contain" />
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={20} color={colors.kLightBlackColor} />
          </TouchableOpacity>
          <BookRating score={rating} />
        </View>
        <View style={styles.bottomSection}>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            <Text style={styles.author}>{author}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.detailsButton} onPress={onPressDetails}>
              <Text style={styles.detailsText}>Details</Text>
            </TouchableOpacity>
            <View style={styles.readButton}>
              <TwoSideRoundedButton text="Read" onPress={onPressRead} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 24,
    marginBottom: 40,
    height: 245,
    width: 202,
  },
  card: {
    height: 221,
    backgroundColor: colors.white,
    borderRadius: 29,
    shadowColor: colors.kShadowColor,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 33,
    elevation: 10,
    position: 'relative',
  },
  bookImage: {
    width: 150,
    height: 180,
    position: 'absolute',
    top: -24,
    left: 0,
  },
  rightSection: {
    position: 'absolute',
    top: 35,
    right: 10,
    alignItems: 'center',
  },
  favoriteButton: {
    marginBottom: 10,
  },
  bottomSection: {
    position: 'absolute',
    top: 160,
    left: 0,
    right: 0,
    height: 85,
  },
  textContainer: {
    paddingLeft: 24,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    color: colors.kBlackColor,
    fontSize: 14,
    lineHeight: 18,
  },
  author: {
    color: colors.kLightBlackColor,
    fontSize: 12,
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  detailsButton: {
    width: 101,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsText: {
    color: colors.kBlackColor,
  },
  readButton: {
    flex: 1,
  },
});

export default ReadingListCard;