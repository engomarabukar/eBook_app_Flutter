import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const ReadingScreen = ({ navigation, route }) => {
  const { book } = route.params;
  const [fontSize, setFontSize] = useState(16);
  const [brightness, setBrightness] = useState(1);
  const [showControls, setShowControls] = useState(false);

  const sampleText = `Chapter 1: The Beginning

In the quiet town of Millbrook, where the morning mist danced through ancient oak trees and the cobblestone streets echoed with the footsteps of early risers, Sarah found herself standing at the threshold of an extraordinary adventure.

The old library had always been her sanctuary, a place where time seemed to stand still and stories came alive. But today was different. Today, she would discover that some books held more than just words on pages—they held entire worlds waiting to be explored.

As she pushed open the heavy wooden doors, the familiar scent of aged paper and leather bindings welcomed her like an old friend. The morning light filtered through tall windows, casting dancing shadows across rows upon rows of books that stretched toward the vaulted ceiling.

Sarah had been the town librarian for three years now, but she had never noticed the peculiar book that sat alone on the restricted shelf behind the main desk. Its cover was neither old nor new, neither beautiful nor plain. It simply was, as if it had always existed and always would.

The book seemed to call to her, its presence growing stronger with each passing moment. Against her better judgment, she found herself reaching for it, her fingers trembling as they made contact with the smooth, cool surface of its cover.

The moment she opened the book, the world around her began to shift and blur. The library walls seemed to breathe, expanding and contracting like living things. The air itself shimmered with possibility, and Sarah realized that her ordinary life was about to become anything but ordinary.

Words began to lift from the pages, swirling around her in a dance of letters and meaning. She watched in wonder as they formed shapes and images in the air, telling stories that had never been told and revealing truths that had long been hidden.

This was no ordinary book. This was a gateway to infinite possibilities, a key to unlock the mysteries of the universe itself. And Sarah, the quiet librarian from Millbrook, was about to become the hero of the greatest story ever told.`;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.chapterTitle}>Chapter 1</Text>
          <Text style={styles.bookTitle}>{book.title}</Text>
        </View>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setShowControls(!showControls)}
        >
          <Ionicons name="settings-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Reading Controls */}
      {showControls && (
        <View style={styles.controlsPanel}>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Font Size</Text>
            <View style={styles.fontControls}>
              <TouchableOpacity 
                style={styles.fontButton}
                onPress={() => setFontSize(Math.max(12, fontSize - 2))}
              >
                <Text style={styles.fontButtonText}>A-</Text>
              </TouchableOpacity>
              <Text style={styles.fontSizeText}>{fontSize}px</Text>
              <TouchableOpacity 
                style={styles.fontButton}
                onPress={() => setFontSize(Math.min(24, fontSize + 2))}
              >
                <Text style={styles.fontButtonText}>A+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Brightness</Text>
            <View style={styles.brightnessControls}>
              <TouchableOpacity onPress={() => setBrightness(0.5)}>
                <Ionicons name="moon" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              <View style={styles.brightnessSlider}>
                <View style={[styles.brightnessTrack, { width: `${brightness * 100}%` }]} />
              </View>
              <TouchableOpacity onPress={() => setBrightness(1)}>
                <Ionicons name="sunny" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Reading Content */}
      <ScrollView 
        style={[styles.readingArea, { opacity: brightness }]}
        showsVerticalScrollIndicator={false}
        onPress={() => setShowControls(false)}
      >
        <Text style={[styles.readingText, { fontSize }]}>
          {sampleText}
        </Text>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color={colors.textSecondary} />
          <Text style={styles.navText}>Previous</Text>
        </TouchableOpacity>
        
        <View style={styles.pageIndicator}>
          <Text style={styles.pageText}>Page 24 of 288</Text>
        </View>
        
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Next</Text>
          <Ionicons name="chevron-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundSecondary,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  chapterTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  controlsPanel: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundSecondary,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  fontControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  fontSizeText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginHorizontal: 16,
  },
  brightnessControls: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    maxWidth: 150,
  },
  brightnessSlider: {
    flex: 1,
    height: 4,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 2,
    marginHorizontal: 12,
  },
  brightnessTrack: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  readingArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  readingText: {
    lineHeight: 28,
    color: colors.textPrimary,
    textAlign: 'justify',
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.backgroundSecondary,
    backgroundColor: colors.background,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
    marginHorizontal: 4,
  },
  pageIndicator: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  pageText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});

export default ReadingScreen;