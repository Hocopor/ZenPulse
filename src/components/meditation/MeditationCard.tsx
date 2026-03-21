import React, { useRef } from 'react';
import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../constants/colors';
import { radii } from '../../constants/radii';
import { shadows } from '../../constants/shadows';
import { spacing } from '../../constants/spacing';
import { fontWeights, typography } from '../../constants/typography';
import { MeditationItem } from '../../types/app';

type Props = {
  item: MeditationItem;
  isLocked: boolean;
  onPress: () => void;
};

export function MeditationCard({ item, isLocked, onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  function animateTo(value: number) {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 25,
      bounciness: 4,
    }).start();
  }

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale }] }]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => animateTo(0.985)}
        onPressOut={() => animateTo(1)}
        style={styles.pressable}
      >
        <ImageBackground source={item.image} style={styles.image} imageStyle={styles.imageStyle}>
          <LinearGradient
            colors={[
              'rgba(8,11,15,0.05)',
              isLocked ? colors.lockedOverlay : 'rgba(8,11,15,0.60)',
            ]}
            style={styles.overlay}
          >
            {isLocked ? (
              <View style={styles.badge}>
                <Ionicons name="lock-closed" size={12} color={colors.textPrimary} />
                <Text style={styles.badgeText}>Premium</Text>
              </View>
            ) : null}

            <View style={styles.footer}>
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>
              <View style={styles.metaRow}>
                <View style={styles.durationPill}>
                  <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>
                <Text style={styles.statusText}>{isLocked ? 'Открывается с Premium' : 'Доступно сейчас'}</Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.lg,
    borderRadius: radii.lg,
    ...shadows.soft,
  },
  pressable: {
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  image: {
    minHeight: 184,
    justifyContent: 'space-between',
  },
  imageStyle: {
    borderRadius: radii.lg,
  },
  overlay: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(15,23,32,0.52)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: typography.caption,
    fontWeight: fontWeights.medium,
  },
  footer: {
    gap: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h3,
    fontWeight: fontWeights.semibold,
    lineHeight: 27,
    maxWidth: 260,
  },
  metaRow: {
    gap: spacing.sm,
  },
  durationPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(15,23,32,0.56)',
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  durationText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    fontWeight: fontWeights.medium,
  },
  statusText: {
    color: colors.textSecondary,
    fontSize: typography.bodySmall,
  },
});
