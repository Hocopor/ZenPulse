import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, gradients } from '../../constants/colors';
import { radii } from '../../constants/radii';
import { shadows } from '../../constants/shadows';
import { spacing } from '../../constants/spacing';
import { fontWeights, typography } from '../../constants/typography';

type Props = {
  isGenerating: boolean;
  result: string | null;
};

export function ResultCard({ isGenerating, result }: Props) {
  return (
    <LinearGradient colors={gradients.resultCard} style={styles.gradient}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>AI-настрой</Text>
        {isGenerating ? (
          <View style={styles.loadingBlock}>
            <ActivityIndicator color={colors.accentMint} />
            <Text style={styles.loadingText}>Подбираем настрой...</Text>
          </View>
        ) : result ? (
          <Text style={styles.resultText}>{result}</Text>
        ) : (
          <Text style={styles.placeholder}>
            Выберите настроение, и ZenPulse предложит мягкий текст для вашего состояния.
          </Text>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: radii.xl,
  },
  card: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surfacePrimary,
    padding: spacing.xl,
    gap: spacing.md,
    ...shadows.soft,
  },
  eyebrow: {
    color: colors.accentMint,
    fontSize: typography.caption,
    fontWeight: fontWeights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  placeholder: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 24,
  },
  resultText: {
    color: colors.textPrimary,
    fontSize: typography.body,
    lineHeight: 25,
  },
  loadingBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
});
