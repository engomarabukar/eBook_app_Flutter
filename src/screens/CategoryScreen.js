import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BookCard from '../components/BookCard';
import { colors } from '../constants/colors';
import { featuredBooks } from '../data/booksData';

const { width } = Dimensions.get('window');

const CategoryScreen = ({ navigation, route }) => {
  const { category } = route.params;
  const [sortBy, setSortBy] = useState('Popular');
  
  const sortOptions = ['Popular', 'Rating', 'Recent', 'A-Z'];
  
  // Filter books by category (simplified for demo)
  const categoryBooks = featuredBooks;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[category.color, `${category.color}80`]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.categoryInfo}>
          <View style={styles.categoryIconContainer}>
            <Ionicons name={category.icon} size={32} color={colors.white} />
          </View>
          <Text style={styles.categoryTitle}>{category.name}</Text>
          <Text style={styles.categorySubtitle}>{category.count} books available</Text>
        </View>
      </LinearGradient>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortContent}
        >
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.sortOption,
                sortBy === option && styles.sortOptionActive
              ]}
              onPress={() => setSortBy(option)}
            >
              <Text style={[
                styles.sortText,
                sortBy === option && styles.sortTextActive
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Books Grid */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.booksGrid}>
          {categoryBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onPress={() => navigation.navigate('BookDetails', { book })}
              style={styles.bookCard}
            />
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
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  categorySubtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  sortContent: {
    paddingHorizontal: 20,
  },
  sortOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    marginRight: 12,
  },
  sortOptionActive: {
    backgroundColor: colors.primary,
  },
  sortText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  sortTextActive: {
    color: colors.white,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bookCard: {
    width: (width - 60) / 2,
    marginBottom: 20,
  },
  bottomPadding: {
    height: 100,
  },
});

export default CategoryScreen;