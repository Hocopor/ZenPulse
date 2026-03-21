import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { fontWeights, typography } from '../../constants/typography';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle: string;
};

export function ScreenHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  eyebrow: {
    color: colors.accentMint,
    fontSize: typography.caption,
    fontWeight: fontWeights.medium,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h1,
    fontWeight: fontWeights.semibold,
    lineHeight: 34,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.bodySmall,
    lineHeight: 21,
    maxWidth: 340,
  },
});
