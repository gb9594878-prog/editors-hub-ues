import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';
import { IconButton, LogoMark, TinyTag } from '@/components/EditorUI';

const GUIDE_DATA = [
  ['editing-guide', 'Editing Guide', 'Start here', 'book-open'],
  ['green-screen', 'Green Screen', 'Clean keying', 'layers'],
  ['overlays', 'Overlays', 'Depth & texture', 'copy'],
  ['shake-effects', 'Shake Effects', 'Add impact', 'activity'],
  ['speed-ramp', 'Speed Ramp', 'Time control', 'fast-forward'],
  ['effects', 'Effects', 'Build a look', 'zap'],
  ['sfx', 'SFX', 'Sound design', 'volume-2'],
  ['alight-motion', 'Alight Motion', 'Mobile workflow', 'smartphone'],
  ['capcut', 'CapCut', 'Fast edits', 'scissors'],
  ['transitions', 'Transitions', 'Smooth cuts', 'shuffle'],
  ['color-grading', 'Color Grading', 'Find the mood', 'droplet'],
  ['text-animation', 'Text Animation', 'Type that moves', 'type'],
  ['beat-sync', 'Beat Sync', 'Cut on time', 'music'],
  ['velocity', 'Velocity', 'Flow & rhythm', 'trending-up'],
  ['masking', 'Masking', 'Layer control', 'edit-3'],
] as const;

const GUIDE_SUMMARIES: Record<string, string> = {
  'Editing Guide': 'A practical tour of the editing workflow, from timeline setup to your final export.',
  'Green Screen': 'Learn clean keying, edge cleanup, and color matching for believable composites.',
  Overlays: 'Use light leaks, film grain, and texture layers to give footage more dimension.',
  'Shake Effects': 'Create controlled camera movement that adds energy without distracting from the cut.',
  'Speed Ramp': 'Shape time with smooth ramps that land on the beat and keep motion feeling intentional.',
  Effects: 'Build a focused effect stack that supports the story instead of overwhelming the frame.',
  SFX: 'Layer hits, risers, ambience, and whooshes to make every visual cut feel physical.',
  'Alight Motion': 'A mobile-first workflow for keyframes, easing curves, and clean exports.',
  CapCut: 'Move fast in CapCut with a repeatable process for short-form edits.',
  Transitions: 'Choose transitions that connect ideas, not just clips, with clean timing.',
  'Color Grading': 'Balance exposure, establish a palette, and create a consistent visual mood.',
  'Text Animation': 'Make titles feel designed with rhythm, hierarchy, and purposeful movement.',
  'Beat Sync': 'Map your cut points to music so the edit feels locked into the track.',
  Velocity: 'Blend speed, blur, and timing to create the signature velocity-edit feel.',
  Masking: 'Reveal, hide, and combine layers with masks that stay precise through movement.',
};

export default function GuidesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { favorites, toggleFavorite, isFavorite } = useApp();
  const params = useLocalSearchParams<{ favorites?: string }>();
  const [query, setQuery] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(params.favorites === '1');

  const filteredGuides = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return GUIDE_DATA.filter(([, title, subtitle]) => {
      const matchesQuery =
        !normalized || `${title} ${subtitle}`.toLowerCase().includes(normalized);
      const matchesFavorites = !favoritesOnly || isFavorite(title);
      return matchesQuery && matchesFavorites;
    });
  }, [favoritesOnly, isFavorite, query]);

  const openGuide = (title: string) => {
    Alert.alert(title, GUIDE_SUMMARIES[title] ?? 'A focused guide for your next edit.', [
      { text: 'Close', style: 'cancel' },
      { text: 'Start learning', onPress: () => undefined },
    ]);
  };

  const topInset = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filteredGuides}
        keyExtractor={([id]) => id}
        contentContainerStyle={[styles.content, { paddingTop: topInset + 10, paddingBottom: 112 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View style={styles.brandRow}>
                <LogoMark small />
                <View>
                  <Text style={[styles.brandName, { color: colors.foreground }]}>Editors Hub</Text>
                  <Text style={[styles.developerName, { color: colors.mutedForeground }]}>Developed by IntroVert Editx</Text>
                </View>
              </View>
              <IconButton
                icon="bookmark"
                label="Favorites"
                active={favoritesOnly}
                onPress={() => setFavoritesOnly((current) => !current)}
              />
            </View>
            <View style={[styles.searchBox, { backgroundColor: colors.input, borderColor: colors.border }]}>
              <Feather name="search" size={18} color={colors.mutedForeground} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search editing guides"
                placeholderTextColor={colors.mutedForeground}
                style={[styles.searchInput, { color: colors.foreground }]}
                testID="guide-search"
                returnKeyType="search"
              />
              {query ? (
                <Pressable onPress={() => setQuery('')} accessibilityLabel="Clear search" testID="clear-search">
                  <Feather name="x-circle" size={17} color={colors.mutedForeground} />
                </Pressable>
              ) : null}
            </View>
            <View style={styles.listIntro}>
              <View>
                <Text style={[styles.resultTitle, { color: colors.foreground }]}>
                  {favoritesOnly ? 'Saved guides' : 'All guides'}
                </Text>
                <Text style={[styles.resultCount, { color: colors.mutedForeground }]}>
                  {filteredGuides.length} of {GUIDE_DATA.length} lessons
                </Text>
              </View>
              <TinyTag label={`${favorites.length} saved`} color={colors.softLime} />
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={[styles.empty, { borderColor: colors.border }]}>
            <Feather name="search" size={24} color={colors.lime} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>No guides found</Text>
            <Text style={[styles.emptyBody, { color: colors.mutedForeground }]}>
              Try another keyword or save a guide to see it here.
            </Text>
          </View>
        }
        renderItem={({ item, index }) => {
          const [id, title, subtitle, icon] = item;
          const saved = isFavorite(title);
          return (
            <Pressable
              onPress={() => openGuide(title)}
              testID={`guide-${id}`}
              style={({ pressed }) => [
                styles.guideRow,
                { backgroundColor: colors.card, borderColor: colors.border },
                pressed && styles.pressed,
              ]}
            >
              <View style={[styles.number, { backgroundColor: index % 2 === 0 ? colors.softLime : colors.softSky }]}>
                <Text style={[styles.numberText, { color: index % 2 === 0 ? colors.lime : colors.sky }]}>
                  {String(index + 1).padStart(2, '0')}
                </Text>
              </View>
              <View style={[styles.guideIcon, { backgroundColor: colors.surfaceElevated }]}>
                <Feather name={icon} size={18} color={colors.foreground} />
              </View>
              <View style={styles.guideCopy}>
                <Text style={[styles.guideTitle, { color: colors.foreground }]}>{title}</Text>
                <Text style={[styles.guideSubtitle, { color: colors.mutedForeground }]}>{subtitle}</Text>
              </View>
              <Pressable
                onPress={() => toggleFavorite(title)}
                testID={`favorite-${id}`}
                accessibilityLabel={saved ? `Remove ${title} from favorites` : `Save ${title} to favorites`}
                hitSlop={10}
                style={({ pressed }) => [styles.favoriteButton, pressed && styles.pressed]}
              >
                <Feather name={saved ? 'bookmark' : 'bookmark'} size={18} color={saved ? colors.lime : colors.mutedForeground} />
              </Pressable>
              <Feather name="chevron-right" size={17} color={colors.mutedForeground} />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 18 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22 },
  brandRow: { alignItems: 'center', flexDirection: 'row', gap: 11 },
  brandName: { fontFamily: 'Inter_700Bold', fontSize: 17, letterSpacing: -0.3 },
  developerName: { fontFamily: 'Inter_400Regular', fontSize: 9, marginTop: 3 },
  searchBox: { alignItems: 'center', borderRadius: 15, borderWidth: 1, flexDirection: 'row', gap: 10, minHeight: 52, paddingHorizontal: 15 },
  searchInput: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 14, paddingVertical: 13 },
  listIntro: { alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, marginTop: 27 },
  resultTitle: { fontFamily: 'Inter_700Bold', fontSize: 17 },
  resultCount: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 3 },
  guideRow: { alignItems: 'center', borderRadius: 17, borderWidth: 1, flexDirection: 'row', gap: 11, marginBottom: 10, minHeight: 74, paddingHorizontal: 11 },
  number: { alignItems: 'center', borderRadius: 11, height: 46, justifyContent: 'center', width: 46 },
  numberText: { fontFamily: 'Inter_700Bold', fontSize: 12 },
  guideIcon: { alignItems: 'center', borderRadius: 11, height: 38, justifyContent: 'center', width: 38 },
  guideCopy: { flex: 1 },
  guideTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  guideSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 5 },
  favoriteButton: { alignItems: 'center', justifyContent: 'center', padding: 5 },
  pressed: { opacity: 0.65 },
  empty: { alignItems: 'center', borderRadius: 18, borderStyle: 'dashed', borderWidth: 1, marginTop: 18, paddingHorizontal: 24, paddingVertical: 36 },
  emptyTitle: { fontFamily: 'Inter_700Bold', fontSize: 17, marginTop: 13 },
  emptyBody: { fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19, marginTop: 7, textAlign: 'center' },
});