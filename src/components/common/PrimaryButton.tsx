import React, { useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, gradients } from '../../constants/colors';
import { radii } from '../../constants/radii';
import { shadows } from '../../constants/shadows';
import { spacing } from '../../constants/spacing';
import { fontWeights, typography } from '../../constants/typography';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
};

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  function animateTo(value: number) {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 24,
      bounciness: 4,
    }).start();
  }

  const isInteractive = !disabled && !loading;

  return (
    <Animated.View style={[style, { transform: [{ scale }] }]}>
      <Pressable
        accessibilityRole="button"
        disabled={!isInteractive}
        onPress={onPress}
        onPressIn={() => animateTo(0.98)}
        onPressOut={() => animateTo(1)}
        style={({ pressed }) => [
          styles.base,
          variant === 'secondary' ? styles.secondaryBase : null,
          !isInteractive ? styles.disabled : null,
          pressed && isInteractive ? styles.pressed : null,
        ]}
      >
        {variant === 'primary' ? (
          <LinearGradient colors={gradients.primaryButton} style={styles.gradient}>
            {loading ? (
              <ActivityIndicator color={colors.textOnAccent} />
            ) : (
              <Text style={styles.primaryText}>{title}</Text>
            )}
          </LinearGradient>
        ) : loading ? (
          <ActivityIndicator color={colors.textPrimary} />
        ) : (
          <Text style={styles.secondaryText}>{title}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    borderRadius: radii.md,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: '100%',
    minHeight: 54,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  secondaryBase: {
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    paddingHorizontal: spacing.xl,
    ...shadows.soft,
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.92,
  },
  primaryText: {
    color: colors.textOnAccent,
    fontSize: typography.button,
    fontWeight: fontWeights.semibold,
  },
  secondaryText: {
    color: colors.textPrimary,
    fontSize: typography.button,
    fontWeight: fontWeights.semibold,
  },
});
