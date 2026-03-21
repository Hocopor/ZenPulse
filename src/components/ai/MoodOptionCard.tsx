import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, gradients } from '../../constants/colors';
import { radii } from '../../constants/radii';
import { shadows } from '../../constants/shadows';
import { spacing } from '../../constants/spacing';
import { fontWeights, typography } from '../../constants/typography';
import { MoodOption } from '../../types/app';

type Props = {
  option: MoodOption;
  selected: boolean;
  onPress: () => void;
};

export function MoodOptionCard({ option, selected, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrapper, pressed ? styles.pressed : null]}>
      <LinearGradient colors={selected ? gradients.premium : ['transparent', 'transparent']} style={styles.gradient}>
        <View style={[styles.card, selected ? styles.cardSelected : null]}>
          <Text style={styles.emoji}>{option.emoji}</Text>
          <View style={styles.textBlock}>
            <Text style={styles.title}>{option.title}</Text>
            <Text style={styles.subtitle}>{option.subtitle}</Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radii.lg,
    marginBottom: spacing.md,
    ...shadows.soft,
  },
  pressed: {
    opacity: 0.94,
  },
  gradient: {
    borderRadius: radii.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surfacePrimary,
    padding: spacing.lg,
  },
  cardSelected: {
    borderColor: colors.borderActive,
    backgroundColor: colors.surfaceStrong,
  },
  emoji: {
    fontSize: 28,
  },
  textBlock: {
    flex: 1,
    gap: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.title,
    fontWeight: fontWeights.semibold,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.bodySmall,
    lineHeight: 20,
  },
});
