import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BookRating from './BookRating';
import { colors } from '../constants/colors';

const BookCard = ({ book, onPress, onFavoritePress, style, showProgress = false }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: book.image }} style={styles.bookImage} />
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={() => onFavoritePress && onFavoritePress(book.id)}
        >
          <Ionicons 
            name={book.isFavorite ? "heart" : "heart-outline"} 
            size={18} 
            color={book.isFavorite ? colors.error : colors.textSecondary} 
          />
        </TouchableOpacity>
        {book.isDownloaded && (
          <View style={styles.downloadBadge}>
            <Ionicons name="download" size={12} color={colors.white} />
          </View>
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.author} numberOfLines={1}>{book.author}</Text>
        
        <View style={styles.ratingContainer}>
          <BookRating score={book.rating} size="small" />
          {book.category && (
            <Text style={styles.category}>{book.category}</Text>
          )}
        </View>
        
        {showProgress && book.progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${book.progress * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(book.progress * 100)}%</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    width: 160,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  bookImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
    lineHeight: 18,
  },
  author: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  category: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});

export default BookCard;