import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ImageBackground, 
  Image,
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BookRating from '../components/BookRating';
import RoundedButton from '../components/RoundedButton';
import { colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const ChapterCard = ({ name, chapterNumber, tag, onPress }) => {
  return (
    <TouchableOpacity style={styles.chapterCard} onPress={onPress}>
      <View style={styles.chapterContent}>
        <Text style={styles.chapterTitle}>
          Chapter {chapterNumber}: {name}
        </Text>
        <Text style={styles.chapterTag}>{tag}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.kLightBlackColor} />
    </TouchableOpacity>
  );
};

const DetailsScreen = ({ navigation }) => {
  const chapters = [
    { name: 'Money', chapterNumber: 1, tag: 'Life is about change' },
    { name: 'Power', chapterNumber: 2, tag: 'Everything loves power' },
    { name: 'Influence', chapterNumber: 3, tag: 'Influence easily like never before' },
    { name: 'Win', chapterNumber: 4, tag: 'Winning is what matters' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerSection}>
        <ImageBackground 
          source={{ uri: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg' }}
          style={styles.headerBackground}
        >
          <View style={styles.bookInfoContainer}>
            <View style={styles.bookTextSection}>
              <Text style={styles.bookTitle}>Crushing &</Text>
              <Text style={styles.bookSubtitle}>Influence</Text>
              <View style={styles.bookDetailsRow}>
                <View style={styles.bookDescription}>
                  <Text style={styles.descriptionText}>
                    When the earth was flat and everyone wanted to win the game of the best and people and winning with an A game with all the things you have.
                  </Text>
                  <RoundedButton 
                    text="Read" 
                    style={styles.readButton}
                    verticalPadding={8}
                    horizontalPadding={20}
                  />
                </View>
                <View style={styles.bookActions}>
                  <TouchableOpacity style={styles.favoriteButton}>
                    <Ionicons name="heart-outline" size={20} color={colors.kLightBlackColor} />
                  </TouchableOpacity>
                  <BookRating score={4.9} />
                </View>
              </View>
            </View>
            <View style={styles.bookImageSection}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg' }}
                style={styles.bookImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </ImageBackground>
        
        <View style={styles.chaptersContainer}>
          {chapters.map((chapter, index) => (
            <ChapterCard
              key={index}
              name={chapter.name}
              chapterNumber={chapter.chapterNumber}
              tag={chapter.tag}
              onPress={() => {}}
            />
          ))}
        </View>
      </View>

      <View style={styles.recommendationSection}>
        <Text style={styles.recommendationTitle}>
          <Text>You might also </Text>
          <Text style={styles.recommendationTitleBold}>like….</Text>
        </Text>
        
        <View style={styles.recommendationCard}>
          <View style={styles.recommendationContent}>
            <Text style={styles.recommendationBookTitle}>
              How To Win {'\n'}Friends & Influence
            </Text>
            <Text style={styles.recommendationAuthor}>Gary Venchuk</Text>
            <View style={styles.recommendationBottom}>
              <BookRating score={4.9} />
              <View style={styles.recommendationReadButton}>
                <RoundedButton 
                  text="Read" 
                  verticalPadding={10}
                  horizontalPadding={20}
                />
              </View>
            </View>
          </View>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg' }}
            style={styles.recommendationImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerSection: {
    position: 'relative',
  },
  headerBackground: {
    height: height * 0.48,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden',
  },
  bookInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: height * 0.12,
    paddingLeft: width * 0.1,
    paddingRight: width * 0.02,
  },
  bookTextSection: {
    flex: 1,
    paddingRight: 20,
  },
  bookTitle: {
    fontSize: 28,
    color: colors.white,
    fontWeight: 'normal',
  },
  bookSubtitle: {
    fontSize: 25,
    color: colors.white,
    fontWeight: 'bold',
    marginTop: 5,
  },
  bookDetailsRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  bookDescription: {
    flex: 1,
    paddingRight: 10,
  },
  descriptionText: {
    fontSize: 10,
    color: colors.white,
    lineHeight: 14,
    marginBottom: 15,
  },
  readButton: {
    marginVertical: 0,
  },
  bookActions: {
    alignItems: 'center',
  },
  favoriteButton: {
    marginBottom: 10,
  },
  bookImageSection: {
    flex: 1,
  },
  bookImage: {
    width: '100%',
    height: '100%',
  },
  chaptersContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  chapterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 38.5,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 16,
    shadowColor: colors.kShadowColor,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 33,
    elevation: 8,
  },
  chapterContent: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.kBlackColor,
    marginBottom: 4,
  },
  chapterTag: {
    color: colors.kLightBlackColor,
    fontSize: 12,
  },
  recommendationSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  recommendationTitle: {
    fontSize: 20,
    color: colors.kBlackColor,
    marginBottom: 20,
  },
  recommendationTitleBold: {
    fontWeight: 'bold',
  },
  recommendationCard: {
    height: 180,
    position: 'relative',
  },
  recommendationContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 150,
    height: 160,
    backgroundColor: colors.cardBackground,
    borderRadius: 29,
    padding: 24,
  },
  recommendationBookTitle: {
    fontSize: 15,
    color: colors.kBlackColor,
    marginBottom: 5,
  },
  recommendationAuthor: {
    color: colors.kLightBlackColor,
    fontSize: 12,
    marginBottom: 15,
  },
  recommendationBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationReadButton: {
    flex: 1,
    marginLeft: 10,
  },
  recommendationImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    height: 180,
  },
});

export default DetailsScreen;