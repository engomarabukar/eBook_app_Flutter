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
import BookCard from '../components/BookCard';
import { colors } from '../constants/colors';
import { featuredBooks } from '../data/booksData';

const { width } = Dimensions.get('window');

const LibraryScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('All');
  
  const tabs = ['All', 'Downloaded', 'Favorites', 'Reading'];
  
  const getFilteredBooks = () => {
    switch (selectedTab) {
      case 'Downloaded':
        return featuredBooks.filter(book => book.isDownloaded);
      case 'Favorites':
        return featuredBooks.filter(book => book.isFavorite);
      case 'Reading':
        return featuredBooks.filter(book => book.progress > 0 && book.progress < 1);
      default:
        return featuredBooks;
    }
  };

  const filteredBooks = getFilteredBooks();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Library</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="filter" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.statsContainer}
        contentContainerStyle={styles.statsContent}
      >
        <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
          <Ionicons name="book" size={24} color={colors.white} />
          <Text style={styles.statNumber}>47</Text>
          <Text style={styles.statLabel}>Books Read</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.success }]}>
          <Ionicons name="flame" size={24} color={colors.white} />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.warning }]}>
          <Ionicons name="time" size={24} color={colors.white} />
          <Text style={styles.statNumber}>156h</Text>
          <Text style={styles.statLabel}>Reading Time</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.accent }]}>
          <Ionicons name="star" size={24} color={colors.white} />
          <Text style={styles.statNumber}>4.3</Text>
          <Text style={styles.statLabel}>Avg Rating</Text>
        </View>
      </ScrollView>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.tabActive
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab && styles.tabTextActive
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Books Grid */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.booksGrid}>
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onPress={() => navigation.navigate('BookDetails', { book })}
              showProgress={selectedTab === 'Reading'}
              style={styles.bookCard}
            />
          ))}
        </View>
        
        {filteredBooks.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="library-outline" size={64} color={colors.textLight} />
            <Text style={styles.emptyTitle}>No books found</Text>
            <Text style={styles.emptySubtitle}>
              {selectedTab === 'Downloaded' && 'Download some books to read offline'}
              {selectedTab === 'Favorites' && 'Add books to your favorites'}
              {selectedTab === 'Reading' && 'Start reading some books'}
              {selectedTab === 'All' && 'Your library is empty'}
            </Text>
          </View>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  sortButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsContent: {
    paddingHorizontal: 20,
  },
  statCard: {
    width: 100,
    height: 100,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 10,
    color: colors.white,
    opacity: 0.8,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 100,
  },
  bookCard: {
    width: (width - 60) / 2,
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
});

export default LibraryScreen;