import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { IconButton, LogoMark, SectionTitle, TinyTag } from '@/components/EditorUI';
import { useColors } from '@/hooks/useColors';

type FeatureCardProps = {
  title: string;
  detail: string;
  icon: React.ComponentProps<typeof Feather>['name'];
  tone: string;
  onPress: () => void;
};

const FEATURE_CARDS: FeatureCardProps[] = [
  { title: 'Editing Guides', detail: '15 lessons', icon: 'book-open', tone: 'softLime', onPress: () => router.push('/(tabs)/guides') },
  { title: 'Editing Resources', detail: '10 packs', icon: 'download', tone: 'softCoral', onPress: () => router.push('/(tabs)/resources') },
  { title: 'Trending', detail: 'What creators save', icon: 'trending-up', tone: 'softSky', onPress: () => Alert.alert('Trending now', 'Velocity edits and beat sync are having a moment. Explore the guides to try them next.') },
  { title: 'Tutorials', detail: 'Learn by doing', icon: 'play-circle', tone: 'softViolet', onPress: () => Alert.alert('Tutorials', 'Short, focused tutorials are being curated for your next session.') },
];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { favorites } = useApp();
  const topInset = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingTop: topInset + 10, paddingBottom: 112 }]}
      >
        <View style={styles.topBar}>
          <View style={styles.brandRow}>
            <LogoMark small />
            <View>
              <Text style={[styles.brandName, { color: colors.foreground }]}>Editors Hub</Text>
              <Text style={[styles.developerName, { color: colors.mutedForeground }]}>Developed by IntroVert Editx</Text>
            </View>
          </View>
          <IconButton icon="bell" label="Notifications" onPress={() => Alert.alert('All caught up', 'No new creator updates right now.')} />
        </View>

        <View style={styles.greeting}>
          <Text style={[styles.kicker, { color: colors.mutedForeground }]}>TUESDAY, SEPTEMBER 01</Text>
          <Text style={[styles.welcome, { color: colors.foreground }]}>Welcome, Editor.</Text>
          <Text style={[styles.subWelcome, { color: colors.mutedForeground }]}>Make something worth watching.</Text>
        </View>

        <LinearGradient
          colors={[colors.lime, colors.orange]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.featured}
        >
          <View style={styles.featuredTop}>
            <TinyTag label="EDITOR'S PICK" color="rgba(16,18,20,0.16)" />
            <Feather name="arrow-up-right" size={19} color={colors.primaryForeground} />
          </View>
          <View style={styles.featuredBottom}>
            <View style={styles.featuredCopy}>
              <Text style={[styles.featuredTitle, { color: colors.primaryForeground }]}>Find your flow.</Text>
              <Text style={[styles.featuredBody, { color: colors.primaryForeground }]}>A quick guide to velocity edits that land every beat.</Text>
            </View>
            <Pressable
              onPress={() => router.push('/(tabs)/guides')}
              testID="featured-guide"
              style={({ pressed }) => [styles.playButton, { backgroundColor: colors.primaryForeground }, pressed && styles.pressed]}
            >
              <Feather name="play" size={16} color={colors.lime} />
            </Pressable>
          </View>
        </LinearGradient>

        <SectionTitle
          eyebrow="EXPLORE"
          title="Your editing toolkit"
          action="See all"
          onAction={() => router.push('/(tabs)/guides')}
        />
        <View style={styles.grid}>
          {FEATURE_CARDS.map((card) => {
            const tone = colors[card.tone as keyof typeof colors] as string;
            return (
              <Pressable
                key={card.title}
                onPress={card.onPress}
                testID={card.title}
                style={({ pressed }) => [
                  styles.featureCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  pressed && styles.pressed,
                ]}
              >
                <View style={[styles.cardIcon, { backgroundColor: tone }]}>
                  <Feather name={card.icon} size={19} color={colors.foreground} />
                </View>
                <Text style={[styles.cardTitle, { color: colors.foreground }]}>{card.title}</Text>
                <View style={styles.cardFooter}>
                  <Text style={[styles.cardDetail, { color: colors.mutedForeground }]}>{card.detail}</Text>
                  <Feather name="arrow-up-right" size={14} color={colors.mutedForeground} />
                </View>
              </Pressable>
            );
          })}
        </View>

        <SectionTitle eyebrow="AT A GLANCE" title="Your progress" action="View profile" onAction={() => router.push('/(tabs)/profile')} />
        <View style={[styles.progressCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.progressIcon, { backgroundColor: colors.softLime }]}>
            <Feather name="bar-chart-2" size={20} color={colors.lime} />
          </View>
          <View style={styles.progressCopy}>
            <Text style={[styles.progressTitle, { color: colors.foreground }]}>Keep your creative streak</Text>
            <Text style={[styles.progressBody, { color: colors.mutedForeground }]}>
              {favorites.length ? `You have ${favorites.length} saved guide${favorites.length === 1 ? '' : 's'} ready to revisit.` : 'Save a guide to build your personal learning path.'}
            </Text>
          </View>
          <Text style={[styles.progressValue, { color: colors.lime }]}>04</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 18 },
  topBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  brandRow: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  brandName: { fontFamily: 'Inter_700Bold', fontSize: 17, letterSpacing: -0.3 },
  developerName: { fontFamily: 'Inter_400Regular', fontSize: 9, marginTop: 3 },
  greeting: { marginBottom: 21, marginTop: 31 },
  kicker: { fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 1.8 },
  welcome: { fontFamily: 'Inter_700Bold', fontSize: 30, letterSpacing: -1, marginTop: 9 },
  subWelcome: { fontFamily: 'Inter_400Regular', fontSize: 14, marginTop: 6 },
  featured: { borderRadius: 22, minHeight: 195, overflow: 'hidden', padding: 18 },
  featuredTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  featuredBottom: { alignItems: 'flex-end', flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  featuredCopy: { maxWidth: '74%' },
  featuredTitle: { fontFamily: 'Inter_700Bold', fontSize: 27, letterSpacing: -1, marginBottom: 7 },
  featuredBody: { fontFamily: 'Inter_500Medium', fontSize: 12, lineHeight: 17 },
  playButton: { alignItems: 'center', borderRadius: 15, height: 48, justifyContent: 'center', width: 48 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 29 },
  featureCard: { borderRadius: 18, borderWidth: 1, minHeight: 145, padding: 13, width: '48.3%' },
  cardIcon: { alignItems: 'center', borderRadius: 11, height: 39, justifyContent: 'center', marginBottom: 21, width: 39 },
  cardTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 13, lineHeight: 17 },
  cardFooter: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 9 },
  cardDetail: { fontFamily: 'Inter_400Regular', fontSize: 10 },
  progressCard: { alignItems: 'center', borderRadius: 18, borderWidth: 1, flexDirection: 'row', gap: 12, padding: 13 },
  progressIcon: { alignItems: 'center', borderRadius: 12, height: 45, justifyContent: 'center', width: 45 },
  progressCopy: { flex: 1 },
  progressTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  progressBody: { fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, marginTop: 5 },
  progressValue: { fontFamily: 'Inter_700Bold', fontSize: 20 },
  pressed: { opacity: 0.68 },
});
