import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, gradients } from '../../constants/colors';
import { radii } from '../../constants/radii';
import { shadows } from '../../constants/shadows';
import { spacing } from '../../constants/spacing';
import { fontWeights, typography } from '../../constants/typography';
import { SubscriptionPlan } from '../../types/app';

type Props = {
  plan: SubscriptionPlan;
  selected: boolean;
  onPress: () => void;
};

export function PlanCard({ plan, selected, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrapper, pressed ? styles.pressed : null]}>
      <LinearGradient colors={selected ? gradients.premium : ['transparent', 'transparent']} style={styles.gradient}>
        <View style={[styles.card, selected ? styles.cardSelected : null]}>
          <View style={styles.headerRow}>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>{plan.title}</Text>
              <Text style={styles.note}>{plan.note}</Text>
            </View>
            {plan.isHighlighted ? <Text style={styles.badge}>Выгодно</Text> : null}
          </View>
          <Text style={styles.price}>{plan.price}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
    borderRadius: radii.lg,
    ...shadows.soft,
  },
  pressed: {
    opacity: 0.94,
  },
  gradient: {
    borderRadius: radii.lg,
  },
  card: {
    borderRadius: radii.lg,
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    padding: spacing.lg,
    gap: spacing.md,
  },
  cardSelected: {
    borderColor: colors.borderActive,
    backgroundColor: colors.surfaceStrong,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  titleBlock: {
    flex: 1,
    gap: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.title,
    fontWeight: fontWeights.semibold,
  },
  note: {
    color: colors.textSecondary,
    fontSize: typography.bodySmall,
    lineHeight: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    color: colors.textOnAccent,
    backgroundColor: colors.accentGoldSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
  },
  price: {
    color: colors.textPrimary,
    fontSize: typography.h3,
    fontWeight: fontWeights.semibold,
  },
});
