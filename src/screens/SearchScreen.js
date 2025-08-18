import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  FlatList 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { colors } from '../constants/colors';
import { featuredBooks, categories } from '../data/booksData';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchResults, setSearchResults] = useState([]);

  const filters = ['All', 'Fiction', 'Science', 'History', 'Biography', 'Technology'];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const results = featuredBooks.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const recentSearches = ['Atomic Habits', 'Science Fiction', 'Psychology', 'Business'];
  const popularSearches = ['Self Help', 'Mystery', 'Romance', 'Thriller', 'Fantasy'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={styles.placeholder} />
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        onFilterPress={() => {}}
      />

      {/* Filter Tags */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTag,
              selectedFilter === filter && styles.filterTagActive
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter && styles.filterTextActive
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {searchQuery.length > 0 ? (
          // Search Results
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Results for "{searchQuery}" ({searchResults.length})
            </Text>
            <View style={styles.resultsGrid}>
              {searchResults.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onPress={() => navigation.navigate('BookDetails', { book })}
                  style={styles.resultCard}
                />
              ))}
            </View>
            {searchResults.length === 0 && (
              <View style={styles.noResults}>
                <Ionicons name="search" size={48} color={colors.textLight} />
                <Text style={styles.noResultsText}>No books found</Text>
                <Text style={styles.noResultsSubtext}>Try searching with different keywords</Text>
              </View>
            )}
          </View>
        ) : (
          // Default Search Content
          <>
            {/* Recent Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <View style={styles.searchTagsContainer}>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.searchTag}
                    onPress={() => handleSearch(search)}
                  >
                    <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                    <Text style={styles.searchTagText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Popular Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Searches</Text>
              <View style={styles.searchTagsContainer}>
                {popularSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.searchTag}
                    onPress={() => handleSearch(search)}
                  >
                    <Ionicons name="trending-up" size={16} color={colors.primary} />
                    <Text style={styles.searchTagText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Browse by Category */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Browse by Category</Text>
              <View style={styles.categoriesGrid}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={styles.categoryItem}
                    onPress={() => handleCategoryPress(category)}
                  >
                    <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                      <Ionicons name={category.icon} size={20} color={colors.white} />
                    </View>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryCount}>{category.count} books</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    marginRight: 12,
  },
  filterTagActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: colors.white,
  },
  content: {
    flex: 1,
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
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resultCard: {
    width: (width - 60) / 2,
    marginBottom: 16,
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 8,
  },
  searchTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
    marginBottom: 12,
  },
  searchTagText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: (width - 60) / 2,
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default SearchScreen;