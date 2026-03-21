import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, gradients } from '../../constants/colors';
import { radii } from '../../constants/radii';
import { spacing } from '../../constants/spacing';
import { fontWeights, typography } from '../../constants/typography';

type Props = {
  title: string;
  description: string;
  variant?: 'default' | 'success';
};

export function InfoSurface({ title, description, variant = 'default' }: Props) {
  return (
    <LinearGradient
      colors={variant === 'success' ? gradients.resultCard : gradients.accessCard}
      style={styles.gradient}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: radii.lg,
    marginBottom: spacing.xxl,
  },
  card: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.title,
    fontWeight: fontWeights.semibold,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.bodySmall,
    lineHeight: 20,
  },
});
