import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Image, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';
import { IconButton, LogoMark } from '@/components/EditorUI';

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { favorites } = useApp();
  const topInset = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;
  const [creatorMode, setCreatorMode] = React.useState(true);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingTop: topInset + 10, paddingBottom: 112 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <LogoMark small />
            <View>
              <Text style={[styles.brandName, { color: colors.foreground }]}>Editors Hub</Text>
              <Text style={[styles.developerName, { color: colors.mutedForeground }]}>Developed by IntroVert Editx</Text>
            </View>
          </View>
          <IconButton icon="more-horizontal" label="More profile options" onPress={() => Alert.alert('Profile', 'Your profile is looking good.')} />
        </View>

        <View style={styles.uesIdentity}>
          <Image
            source={require('../../assets/ues-logo.png')}
            style={styles.uesImage}
            resizeMode="contain"
            accessibilityLabel="Ultimate Editors Society logo"
          />
          <Text style={[styles.uesLabel, { color: colors.mutedForeground }]}>ULTIMATE EDITORS SOCIETY</Text>
        </View>

        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.avatar, { backgroundColor: colors.softCoral }]}>
            <Text style={[styles.avatarText, { color: colors.coral }]}>AE</Text>
          </View>
          <View style={styles.profileCopy}>
            <Text style={[styles.name, { color: colors.foreground }]}>Alex Editor</Text>
            <Text style={[styles.handle, { color: colors.mutedForeground }]}>@alex.creates</Text>
            <View style={styles.levelRow}>
              <View style={[styles.levelDot, { backgroundColor: colors.lime }]} />
              <Text style={[styles.level, { color: colors.lime }]}>Level 04 · Motion maker</Text>
            </View>
          </View>
          <Pressable
            onPress={() => Alert.alert('Edit profile', 'Your profile editor is ready for your next update.')}
            testID="edit-profile"
            style={({ pressed }) => [styles.editButton, { backgroundColor: colors.surfaceElevated }, pressed && styles.pressed]}
          >
            <Feather name="edit-2" size={15} color={colors.foreground} />
          </Pressable>
        </View>

        <View style={[styles.stats, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Stat value="12" label="Edits saved" colors={colors} />
          <View style={[styles.statDivider, { backgroundColor: colors.line }]} />
          <Stat value={String(favorites.length).padStart(2, '0')} label="Favorites" colors={colors} />
          <View style={[styles.statDivider, { backgroundColor: colors.line }]} />
          <Stat value="08" label="Collections" colors={colors} />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Your space</Text>
        <Pressable
          onPress={() => router.push('/(tabs)/guides?favorites=1')}
          testID="my-favorites"
          style={({ pressed }) => [styles.actionRow, { backgroundColor: colors.card, borderColor: colors.border }, pressed && styles.pressed]}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.softLime }]}>
            <Feather name="bookmark" size={19} color={colors.lime} />
          </View>
          <View style={styles.actionCopy}>
            <Text style={[styles.actionTitle, { color: colors.foreground }]}>My Favorites</Text>
            <Text style={[styles.actionBody, { color: colors.mutedForeground }]}>Your saved guides in one place</Text>
          </View>
          <View style={styles.actionEnd}>
            <Text style={[styles.actionCount, { color: colors.lime }]}>{favorites.length}</Text>
            <Feather name="chevron-right" size={17} color={colors.mutedForeground} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => Alert.alert('Settings', 'Notifications, appearance, and download preferences are ready to customize.')}
          testID="settings"
          style={({ pressed }) => [styles.actionRow, { backgroundColor: colors.card, borderColor: colors.border }, pressed && styles.pressed]}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.softSky }]}>
            <Feather name="sliders" size={19} color={colors.sky} />
          </View>
          <View style={styles.actionCopy}>
            <Text style={[styles.actionTitle, { color: colors.foreground }]}>Settings</Text>
            <Text style={[styles.actionBody, { color: colors.mutedForeground }]}>Tune your Editors Hub experience</Text>
          </View>
          <Feather name="chevron-right" size={17} color={colors.mutedForeground} />
        </Pressable>

        <View style={[styles.preference, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.actionIcon, { backgroundColor: colors.softViolet }]}>
            <Feather name="aperture" size={19} color={colors.violet} />
          </View>
          <View style={styles.actionCopy}>
            <Text style={[styles.actionTitle, { color: colors.foreground }]}>Creator mode</Text>
            <Text style={[styles.actionBody, { color: colors.mutedForeground }]}>Personalize your learning feed</Text>
          </View>
          <Switch
            value={creatorMode}
            onValueChange={setCreatorMode}
            trackColor={{ false: colors.secondary, true: colors.softLime }}
            thumbColor={creatorMode ? colors.lime : colors.mutedForeground}
            testID="creator-mode"
          />
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.mutedForeground }]}>Developed by IntroVert Editx | IntroVert Editx</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({ value, label, colors }: { value: string; label: string; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color: colors.foreground }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 23, paddingHorizontal: 18 },
  brandRow: { alignItems: 'center', flexDirection: 'row', gap: 11 },
  brandName: { fontFamily: 'Inter_700Bold', fontSize: 17, letterSpacing: -0.3 },
  developerName: { fontFamily: 'Inter_400Regular', fontSize: 9, marginTop: 3 },
  uesIdentity: { alignItems: 'center', marginBottom: 18, marginTop: 7 },
  uesImage: { borderRadius: 75, height: 150, width: 150 },
  uesLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 1.2, marginTop: 10 },
  profileCard: { alignItems: 'center', borderRadius: 22, borderWidth: 1, flexDirection: 'row', marginHorizontal: 18, padding: 16 },
  avatar: { alignItems: 'center', borderRadius: 22, height: 70, justifyContent: 'center', width: 70 },
  avatarText: { fontFamily: 'Inter_700Bold', fontSize: 20, letterSpacing: -0.4 },
  profileCopy: { flex: 1, marginLeft: 13 },
  name: { fontFamily: 'Inter_700Bold', fontSize: 18 },
  handle: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 4 },
  levelRow: { alignItems: 'center', flexDirection: 'row', gap: 6, marginTop: 9 },
  levelDot: { borderRadius: 4, height: 7, width: 7 },
  level: { fontFamily: 'Inter_500Medium', fontSize: 10 },
  editButton: { alignItems: 'center', borderRadius: 11, height: 36, justifyContent: 'center', width: 36 },
  stats: { alignItems: 'center', borderRadius: 18, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 18, marginTop: 12, paddingVertical: 15 },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { fontFamily: 'Inter_700Bold', fontSize: 20 },
  statLabel: { fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 4 },
  statDivider: { height: 30, width: 1 },
  sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 18, marginBottom: 13, marginHorizontal: 18, marginTop: 30 },
  actionRow: { alignItems: 'center', borderRadius: 17, borderWidth: 1, flexDirection: 'row', gap: 12, marginBottom: 10, marginHorizontal: 18, minHeight: 72, paddingHorizontal: 12 },
  actionIcon: { alignItems: 'center', borderRadius: 12, height: 44, justifyContent: 'center', width: 44 },
  actionCopy: { flex: 1 },
  actionTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  actionBody: { fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 5 },
  actionEnd: { alignItems: 'center', flexDirection: 'row', gap: 9 },
  actionCount: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  preference: { alignItems: 'center', borderRadius: 17, borderWidth: 1, flexDirection: 'row', gap: 12, marginHorizontal: 18, marginTop: 2, minHeight: 72, paddingHorizontal: 12 },
  footer: { alignItems: 'center', justifyContent: 'center', marginHorizontal: 22, marginTop: 29 },
  footerText: { fontFamily: 'Inter_500Medium', fontSize: 10, textAlign: 'center' },
  pressed: { opacity: 0.68 },
});