import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';

type FeatherName = React.ComponentProps<typeof Feather>['name'];

export function LogoMark({ small = false }: { small?: boolean }) {
  return (
    <Image
      source={require('../assets/ues-app-icon.png')}
      style={[styles.logo, small && styles.logoSmall]}
      accessibilityLabel="UES logo"
      resizeMode="contain"
    />
  );
}

export function IconButton({
  icon,
  onPress,
  label,
  active = false,
}: {
  icon: FeatherName;
  onPress: () => void;
  label: string;
  active?: boolean;
}) {
  const colors = useColors();
  return (
    <Pressable
      accessibilityLabel={label}
      testID={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconButton,
        { backgroundColor: active ? colors.softLime : colors.surfaceElevated },
        pressed && styles.pressed,
      ]}
    >
      <Feather name={icon} size={18} color={active ? colors.lime : colors.foreground} />
    </Pressable>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  action,
  onAction,
}: {
  eyebrow?: string;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  const colors = useColors();
  return (
    <View style={styles.sectionTitleRow}>
      <View>
        {eyebrow ? <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>{eyebrow}</Text> : null}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{title}</Text>
      </View>
      {action && onAction ? (
        <Pressable onPress={onAction} testID={action} style={({ pressed }) => pressed && styles.pressed}>
          <Text style={[styles.actionText, { color: colors.lime }]}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function TinyTag({ label, color }: { label: string; color: string }) {
  const colors = useColors();
  return (
    <View style={[styles.tinyTag, { backgroundColor: color }]}>
      <Text style={[styles.tinyTagText, { color: colors.foreground }]}>{label}</Text>
    </View>
  );
}

export function Divider() {
  const colors = useColors();
  return <View style={[styles.divider, { backgroundColor: colors.line }]} />;
}

const styles = StyleSheet.create({
  logo: {
    borderRadius: 12,
    height: 36,
    overflow: 'hidden',
    width: 36,
  },
  logoSmall: {
    borderRadius: 18,
    height: 36,
    width: 36,
  },
  iconButton: {
    alignItems: 'center',
    borderRadius: 14,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  pressed: {
    opacity: 0.7,
  },
  sectionTitleRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  eyebrow: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    letterSpacing: 1.4,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    letterSpacing: -0.4,
  },
  actionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    marginBottom: 3,
  },
  tinyTag: {
    alignSelf: 'flex-start',
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  tinyTagText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    width: '100%',
  },
});