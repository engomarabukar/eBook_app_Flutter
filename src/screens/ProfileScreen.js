import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import { userStats } from '../data/booksData';

const ProfileScreen = ({ navigation }) => {
  const menuItems = [
    { icon: 'settings-outline', title: 'Settings', subtitle: 'App preferences' },
    { icon: 'download-outline', title: 'Downloads', subtitle: 'Manage offline books' },
    { icon: 'notifications-outline', title: 'Notifications', subtitle: 'Reading reminders' },
    { icon: 'help-circle-outline', title: 'Help & Support', subtitle: 'Get assistance' },
    { icon: 'information-circle-outline', title: 'About', subtitle: 'App information' },
  ];

  const achievements = [
    { icon: 'trophy', title: 'Bookworm', description: 'Read 50 books', unlocked: false },
    { icon: 'flame', title: 'Streak Master', description: '30 day reading streak', unlocked: false },
    { icon: 'star', title: 'Critic', description: 'Rate 25 books', unlocked: true },
    { icon: 'time', title: 'Speed Reader', description: 'Read 100 pages in a day', unlocked: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          style={styles.profileHeader}
        >
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' }}
              style={styles.avatar}
            />
            <Text style={styles.userName}>Sarah Johnson</Text>
            <Text style={styles.userEmail}>sarah.johnson@email.com</Text>
            <View style={styles.levelContainer}>
              <Ionicons name="star" size={16} color={colors.warning} />
              <Text style={styles.levelText}>Level 8 Reader</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Reading Goal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2024 Reading Goal</Text>
          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalTitle}>Annual Challenge</Text>
              <Text style={styles.goalProgress}>{userStats.currentProgress}/{userStats.readingGoal}</Text>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[
                  styles.progressFill, 
                  { width: `${(userStats.currentProgress / userStats.readingGoal) * 100}%` }
                ]} />
              </View>
              <Text style={styles.progressText}>
                {Math.round((userStats.currentProgress / userStats.readingGoal) * 100)}% Complete
              </Text>
            </View>
            <Text style={styles.goalSubtext}>
              {userStats.readingGoal - userStats.currentProgress} books to go!
            </Text>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reading Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Ionicons name="book" size={24} color={colors.primary} />
              <Text style={styles.statValue}>{userStats.booksRead}</Text>
              <Text style={styles.statLabel}>Books Read</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="flame" size={24} color={colors.error} />
              <Text style={styles.statValue}>{userStats.readingStreak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="document-text" size={24} color={colors.success} />
              <Text style={styles.statValue}>{userStats.totalPages.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Pages Read</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="star" size={24} color={colors.warning} />
              <Text style={styles.statValue}>{userStats.averageRating}</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement, index) => (
              <View key={index} style={[
                styles.achievementCard,
                !achievement.unlocked && styles.achievementLocked
              ]}>
                <View style={[
                  styles.achievementIcon,
                  { backgroundColor: achievement.unlocked ? colors.primary : colors.textLight }
                ]}>
                  <Ionicons 
                    name={achievement.icon} 
                    size={20} 
                    color={colors.white} 
                  />
                </View>
                <View style={styles.achievementText}>
                  <Text style={[
                    styles.achievementTitle,
                    !achievement.unlocked && styles.achievementTitleLocked
                  ]}>
                    {achievement.title}
                  </Text>
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                </View>
                {achievement.unlocked && (
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <Ionicons name={item.icon} size={20} color={colors.primary} />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: colors.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
    marginBottom: 12,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  levelText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
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
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  statsContainer: {
    marginTop: 20,
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
  goalCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  goalProgress: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  progressContainer: {
    marginBottom: 8,
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
  goalSubtext: {
    fontSize: 12,
    color: colors.textLight,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: (width - 60) / 2,
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  achievementsContainer: {
    marginBottom: 20,
  },
  achievementCard: {
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
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  achievementTitleLocked: {
    color: colors.textLight,
  },
  achievementDescription: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  bottomPadding: {
    height: 100,
  },
});

export default ProfileScreen;