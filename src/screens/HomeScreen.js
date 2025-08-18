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
import ReadingListCard from '../components/ReadingListCard';
import BookRating from '../components/BookRating';
import TwoSideRoundedButton from '../components/TwoSideRoundedButton';
import { colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const bookData = [
    {
      id: 1,
      image: { uri: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg' },
      title: 'Crushing & Influence',
      author: 'Gary Venchuk',
      rating: 4.9,
    },
    {
      id: 2,
      image: { uri: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg' },
      title: 'Top Ten Business Hacks',
      author: 'Herman Joel',
      rating: 4.8,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground 
        source={{ uri: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg' }}
        style={styles.headerBackground}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleSection}>
            <Text style={styles.headerTitle}>
              <Text>What are you {'\n'}reading </Text>
              <Text style={styles.headerTitleBold}>today?</Text>
            </Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.booksScrollView}
          >
            {bookData.map((book) => (
              <ReadingListCard
                key={book.id}
                image={book.image}
                title={book.title}
                author={book.author}
                rating={book.rating}
                onPressDetails={() => navigation.navigate('Details')}
                onPressRead={() => {}}
              />
            ))}
            <View style={{ width: 30 }} />
          </ScrollView>
        </View>
      </ImageBackground>

      <View style={styles.mainContent}>
        <Text style={styles.sectionTitle}>
          <Text>Best of the </Text>
          <Text style={styles.sectionTitleBold}>day</Text>
        </Text>
        
        {/* Best of the day card */}
        <View style={styles.bestOfDayCard}>
          <View style={styles.bestOfDayContent}>
            <Text style={styles.bestOfDaySubtitle}>
              New York Time Best For 11th March 2020
            </Text>
            <Text style={styles.bestOfDayTitle}>
              How To Win {'\n'}Friends & Influence
            </Text>
            <Text style={styles.bestOfDayAuthor}>Gary Venchuk</Text>
            <View style={styles.bestOfDayBottom}>
              <BookRating score={4.9} />
              <Text style={styles.bestOfDayDescription}>
                When the earth was flat and everyone wanted to win the game of the best and people….
              </Text>
            </View>
          </View>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg' }}
            style={styles.bestOfDayImage}
            resizeMode="cover"
          />
          <View style={styles.bestOfDayButton}>
            <TwoSideRoundedButton text="Read" onPress={() => {}} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          <Text>Continue </Text>
          <Text style={styles.sectionTitleBold}>reading...</Text>
        </Text>

        {/* Continue reading card */}
        <View style={styles.continueReadingCard}>
          <View style={styles.continueReadingContent}>
            <View style={styles.continueReadingText}>
              <Text style={styles.continueReadingTitle}>Crushing & Influence</Text>
              <Text style={styles.continueReadingAuthor}>Gary Venchuk</Text>
              <Text style={styles.continueReadingChapter}>Chapter 7 of 10</Text>
            </View>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg' }}
              style={styles.continueReadingImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.progressBar} />
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
  headerBackground: {
    width: '100%',
    paddingTop: height * 0.1,
  },
  headerContent: {
    paddingBottom: 40,
  },
  titleSection: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    color: colors.white,
    lineHeight: 36,
  },
  headerTitleBold: {
    fontWeight: 'bold',
  },
  booksScrollView: {
    marginBottom: 20,
  },
  mainContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    color: colors.kBlackColor,
    marginVertical: 20,
  },
  sectionTitleBold: {
    fontWeight: 'bold',
  },
  bestOfDayCard: {
    width: '100%',
    height: 245,
    marginBottom: 20,
    position: 'relative',
  },
  bestOfDayContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: width * 0.35,
    height: 230,
    backgroundColor: `${colors.lightGray}73`,
    borderRadius: 29,
    padding: 24,
    paddingRight: 0,
  },
  bestOfDaySubtitle: {
    fontSize: 9,
    color: colors.kLightBlackColor,
    marginBottom: 10,
  },
  bestOfDayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.kBlackColor,
    marginBottom: 5,
  },
  bestOfDayAuthor: {
    color: colors.kLightBlackColor,
    marginBottom: 10,
  },
  bestOfDayBottom: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bestOfDayDescription: {
    fontSize: 10,
    color: colors.kLightBlackColor,
    flex: 1,
    marginLeft: 10,
    lineHeight: 14,
  },
  bestOfDayImage: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: width * 0.37,
    height: 200,
    borderRadius: 15,
  },
  bestOfDayButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 40,
    width: width * 0.3,
  },
  continueReadingCard: {
    height: 80,
    backgroundColor: colors.white,
    borderRadius: 38.5,
    shadowColor: colors.kShadowColor,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 33,
    elevation: 8,
    overflow: 'hidden',
    marginBottom: 40,
  },
  continueReadingContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  continueReadingText: {
    flex: 1,
    justifyContent: 'center',
  },
  continueReadingTitle: {
    fontWeight: 'bold',
    color: colors.kBlackColor,
    fontSize: 14,
  },
  continueReadingAuthor: {
    color: colors.kLightBlackColor,
    fontSize: 12,
    marginTop: 2,
  },
  continueReadingChapter: {
    fontSize: 10,
    color: colors.kLightBlackColor,
    textAlign: 'right',
    marginTop: 5,
  },
  continueReadingImage: {
    width: 55,
    height: 60,
  },
  progressBar: {
    height: 7,
    width: width * 0.65,
    backgroundColor: colors.kProgressIndicator,
    borderRadius: 7,
  },
});

export default HomeScreen;