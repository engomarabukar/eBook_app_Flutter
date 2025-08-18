import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  SafeAreaView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import BookCard from '../components/BookCard';
import CategoryCard from '../components/CategoryCard';
import SearchBar from '../components/SearchBar';
import { colors } from '../constants/colors';
import { featuredBooks, categories, recentBooks, trendingBooks } from '../data/booksData';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleBookPress = (book) => {
    navigation.navigate('BookDetails', { book });
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('Category', { category });
  };

  const toggleFavorite = (bookId) => {
    // Handle favorite toggle logic here
    console.log('Toggle favorite for book:', bookId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <View>
                <Text style={styles.greeting}>Good Morning</Text>
                <Text style={styles.userName}>Sarah</Text>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <Ionicons name="notifications-outline" size={24} color={colors.white} />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
            </View>
            
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFilterPress={() => navigation.navigate('Search')}
            />
          </View>
        </LinearGradient>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategoryPress(category)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured Books */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Books</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.booksContainer}
          >
            {featuredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onPress={() => handleBookPress(book)}
                onFavoritePress={toggleFavorite}
                showProgress={true}
                style={styles.bookCard}
              />
            ))}
          </ScrollView>
        </View>

        {/* Continue Reading */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Reading</Text>
          {recentBooks.map((book) => (
            <TouchableOpacity 
              key={book.id}
              style={styles.continueReadingCard}
              onPress={() => handleBookPress(book)}
            >
              <View style={styles.continueReadingContent}>
                <View style={styles.continueReadingText}>
                  <Text style={styles.continueReadingTitle}>{book.title}</Text>
                  <Text style={styles.continueReadingAuthor}>{book.author}</Text>
                  <Text style={styles.lastRead}>Last read: {book.lastRead}</Text>
                </View>
                <View style={styles.continueReadingRight}>
                  <BookCard
                    book={book}
                    onPress={() => handleBookPress(book)}
                    style={styles.miniBookCard}
                  />
                </View>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${book.progress * 100}%` }]} />
                </View>
                <Text style={styles.progressText}>{Math.round(book.progress * 100)}% complete</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trending Now */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.booksContainer}
          >
            {trendingBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onPress={() => handleBookPress(book)}
                onFavoritePress={toggleFavorite}
                style={styles.bookCard}
              />
            ))}
          </ScrollView>
        </View>
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
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  lastSection: {
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingRight: 20,
  },
  booksContainer: {
    paddingRight: 20,
  },
  bookCard: {
    marginRight: 16,
  },
  continueReadingCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  continueReadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  continueReadingText: {
    flex: 1,
  },
  continueReadingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  continueReadingAuthor: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  lastRead: {
    fontSize: 12,
    color: colors.textLight,
  },
  continueReadingRight: {
    width: 60,
    height: 80,
  },
  miniBookCard: {
    width: 60,
    height: 80,
    padding: 0,
    margin: 0,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.lightGray,
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});

export default WelcomeScreen;