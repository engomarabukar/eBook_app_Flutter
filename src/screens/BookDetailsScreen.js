import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BookRating from '../components/BookRating';
import RoundedButton from '../components/RoundedButton';
import { colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const BookDetailsScreen = ({ navigation, route }) => {
  const { book } = route.params;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadPress = () => {
    navigation.navigate('Reading', { book });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Book Info */}
        <View style={styles.bookInfoSection}>
          <Image source={{ uri: book.image }} style={styles.bookCover} />
          <View style={styles.bookDetails}>
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text style={styles.bookAuthor}>by {book.author}</Text>
            
            <View style={styles.ratingRow}>
              <BookRating score={book.rating} />
              <TouchableOpacity style={styles.favoriteButton}>
                <Ionicons 
                  name={book.isFavorite ? "heart" : "heart-outline"} 
                  size={24} 
                  color={book.isFavorite ? colors.error : colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.bookMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="document-text-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.metaText}>{book.pages} pages</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.metaText}>{book.publishYear}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="language-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.metaText}>{book.language}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <RoundedButton
            text={book.progress > 0 ? "Continue Reading" : "Start Reading"}
            onPress={handleReadPress}
            style={styles.readButton}
          />
          <TouchableOpacity style={styles.downloadButton}>
            <Ionicons 
              name={book.isDownloaded ? "checkmark-circle" : "download-outline"} 
              size={20} 
              color={book.isDownloaded ? colors.success : colors.primary} 
            />
            <Text style={[
              styles.downloadText,
              { color: book.isDownloaded ? colors.success : colors.primary }
            ]}>
              {book.isDownloaded ? "Downloaded" : "Download"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress */}
        {book.progress > 0 && (
          <View style={styles.progressSection}>
            <Text style={styles.progressTitle}>Reading Progress</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${book.progress * 100}%` }]} />
              </View>
              <Text style={styles.progressText}>{Math.round(book.progress * 100)}% Complete</Text>
            </View>
          </View>
        )}

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this book</Text>
          <Text style={styles.description} numberOfLines={isExpanded ? undefined : 4}>
            {book.description}
          </Text>
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={styles.readMore}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Chapters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chapters</Text>
          {book.chapters.map((chapter, index) => (
            <TouchableOpacity key={index} style={styles.chapterCard}>
              <View style={styles.chapterNumber}>
                <Text style={styles.chapterNumberText}>{chapter.number}</Text>
              </View>
              <View style={styles.chapterInfo}>
                <Text style={styles.chapterTitle}>{chapter.title}</Text>
                <Text style={styles.chapterPages}>{chapter.pages} pages</Text>
              </View>
              <Ionicons name="play-circle-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookInfoSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  bookCover: {
    width: 120,
    height: 180,
    borderRadius: 16,
    marginRight: 20,
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
    lineHeight: 28,
  },
  bookAuthor: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookMeta: {
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  readButton: {
    flex: 1,
    marginVertical: 0,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 20,
    minWidth: 120,
  },
  downloadText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  progressContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  readMore: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  chapterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  chapterNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  chapterNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  chapterInfo: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  chapterPages: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  bottomPadding: {
    height: 100,
  },
});

export default BookDetailsScreen;