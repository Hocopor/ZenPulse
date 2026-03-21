import 'react-native-gesture-handler';
import 'react-native-reanimated';

import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppBackground } from './components/common/AppBackground';
import { colors } from './constants/colors';
import { spacing } from './constants/spacing';
import { fontWeights, typography } from './constants/typography';
import { useSubscription } from './hooks/useSubscription';
import { AppTabs } from './navigation/AppTabs';
import { SubscriptionProvider } from './providers/SubscriptionProvider';

function HydrationGate() {
  const { isSubscriptionHydrated } = useSubscription();

  if (!isSubscriptionHydrated) {
    return (
      <AppBackground>
        <View style={styles.hydrationContainer}>
          <ActivityIndicator color={colors.accentMint} />
          <Text style={styles.hydrationTitle}>Готовим пространство...</Text>
          <Text style={styles.hydrationSubtitle}>
            ZenPulse мягко восстанавливает ваш доступ, чтобы интерфейс сразу открылся в корректном состоянии.
          </Text>
        </View>
      </AppBackground>
    );
  }

  return <AppTabs />;
}

export function App() {
  return (
    <SafeAreaProvider>
      <SubscriptionProvider>
        <StatusBar style="light" />
        <HydrationGate />
      </SubscriptionProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  hydrationContainer: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
  },
  hydrationTitle: {
    color: colors.textPrimary,
    fontSize: typography.h3,
    fontWeight: fontWeights.semibold,
  },
  hydrationSubtitle: {
    maxWidth: 300,
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 24,
    textAlign: 'center',
  },
});
