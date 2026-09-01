import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { IconButton, LogoMark, TinyTag } from '@/components/EditorUI';

const RESOURCE_DATA = [
  ['Green Screen', '4K clips', 'video', 'softLime'],
  ['Overlays', '32 textures', 'layers', 'softCoral'],
  ['Shake Presets', '18 presets', 'activity', 'softSky'],
  ['Speed Ramp Presets', '12 presets', 'fast-forward', 'softViolet'],
  ['SFX Pack', '86 sounds', 'volume-2', 'softCoral'],
  ['Color Presets', '24 looks', 'droplet', 'softLime'],
  ['Effects', '15 packs', 'zap', 'softSky'],
  ['XML Files', '9 project files', 'file-text', 'softViolet'],
  ['Fonts', '40 typefaces', 'type', 'softCoral'],
  ['Transition Pack', '28 transitions', 'shuffle', 'softLime'],
] as const;

export default function ResourcesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [opened, setOpened] = useState<string[]>([]);
  const topInset = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  const openResource = (name: string) => {
    setOpened((current) => (current.includes(name) ? current : [...current, name]));
    Alert.alert(name, 'This resource is ready in your Editors Hub library.', [{ text: 'Done' }]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingTop: topInset + 10, paddingBottom: 112 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <LogoMark small />
            <View>
              <Text style={[styles.brandName, { color: colors.foreground }]}>Editors Hub</Text>
              <Text style={[styles.developerName, { color: colors.mutedForeground }]}>Developed by IntroVert Editx</Text>
            </View>
          </View>
          <IconButton icon="download-cloud" label="Downloads" onPress={() => Alert.alert('Your library', `${opened.length} resource${opened.length === 1 ? '' : 's'} opened.`)} />
        </View>

        <View style={[styles.hero, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
          <View style={[styles.heroOrb, { backgroundColor: colors.softLime }]} />
          <View style={styles.heroContent}>
            <TinyTag label="CURATED FOR YOU" color={colors.softLime} />
            <Text style={[styles.heroTitle, { color: colors.foreground }]}>Build your next edit faster.</Text>
            <Text style={[styles.heroBody, { color: colors.mutedForeground }]}>
              Hand-picked assets for sharper cuts, better rhythm, and more room to experiment.
            </Text>
          </View>
          <View style={[styles.heroIcon, { backgroundColor: colors.lime }]}>
            <Feather name="arrow-up-right" size={20} color={colors.primaryForeground} />
          </View>
        </View>

        <View style={styles.sectionRow}>
          <View>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Resource library</Text>
            <Text style={[styles.sectionSubtitle, { color: colors.mutedForeground }]}>Tap open to add it to your workflow.</Text>
          </View>
          <Text style={[styles.counter, { color: colors.lime }]}>{opened.length}/10</Text>
        </View>

        {RESOURCE_DATA.map(([name, detail, icon, tone]) => {
          const isOpened = opened.includes(name);
          const background = colors[tone as keyof typeof colors] as string;
          return (
            <Pressable
              key={name}
              onPress={() => openResource(name)}
              testID={`resource-${name}`}
              style={({ pressed }) => [
                styles.resourceRow,
                { backgroundColor: colors.card, borderColor: colors.border },
                pressed && styles.pressed,
              ]}
            >
              <View style={[styles.resourceIcon, { backgroundColor: background }]}>
                <Feather name={icon} size={19} color={colors.foreground} />
              </View>
              <View style={styles.resourceCopy}>
                <Text style={[styles.resourceName, { color: colors.foreground }]}>{name}</Text>
                <Text style={[styles.resourceDetail, { color: colors.mutedForeground }]}>{detail}</Text>
              </View>
              <Pressable
                onPress={() => openResource(name)}
                testID={`open-${name}`}
                style={({ pressed }) => [
                  styles.openButton,
                  { backgroundColor: isOpened ? colors.softLime : colors.surfaceElevated },
                  pressed && styles.pressed,
                ]}
              >
                <Text style={[styles.openText, { color: isOpened ? colors.lime : colors.foreground }]}>
                  {isOpened ? 'Opened' : 'Open'}
                </Text>
                <Feather name={isOpened ? 'check' : 'arrow-up-right'} size={14} color={isOpened ? colors.lime : colors.foreground} />
              </Pressable>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 23, paddingHorizontal: 18 },
  brandRow: { alignItems: 'center', flexDirection: 'row', gap: 11 },
  brandName: { fontFamily: 'Inter_700Bold', fontSize: 17, letterSpacing: -0.3 },
  developerName: { fontFamily: 'Inter_400Regular', fontSize: 9, marginTop: 3 },
  hero: { borderRadius: 22, borderWidth: 1, marginHorizontal: 18, minHeight: 166, overflow: 'hidden', padding: 19, position: 'relative' },
  heroOrb: { borderRadius: 100, height: 210, opacity: 0.65, position: 'absolute', right: -82, top: -86, width: 210 },
  heroContent: { maxWidth: '80%' },
  heroTitle: { fontFamily: 'Inter_700Bold', fontSize: 22, letterSpacing: -0.6, lineHeight: 27, marginTop: 15 },
  heroBody: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18, marginTop: 8 },
  heroIcon: { alignItems: 'center', borderRadius: 13, bottom: 18, height: 42, justifyContent: 'center', position: 'absolute', right: 18, width: 42 },
  sectionRow: { alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 13, marginTop: 29, paddingHorizontal: 18 },
  sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 18 },
  sectionSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 4 },
  counter: { fontFamily: 'Inter_700Bold', fontSize: 14 },
  resourceRow: { alignItems: 'center', borderRadius: 17, borderWidth: 1, flexDirection: 'row', gap: 12, marginBottom: 10, marginHorizontal: 18, minHeight: 76, paddingHorizontal: 11 },
  resourceIcon: { alignItems: 'center', borderRadius: 12, height: 48, justifyContent: 'center', width: 48 },
  resourceCopy: { flex: 1 },
  resourceName: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  resourceDetail: { fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 5 },
  openButton: { alignItems: 'center', borderRadius: 10, flexDirection: 'row', gap: 5, paddingHorizontal: 10, paddingVertical: 9 },
  openText: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  pressed: { opacity: 0.68 },
});