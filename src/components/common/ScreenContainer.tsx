import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { spacing } from '../../constants/spacing';

type Props = {
  children: React.ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: object;
};

export function ScreenContainer({ children, scrollable = true, contentContainerStyle }: Props) {
  if (!scrollable) {
    return (
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={[styles.content, contentContainerStyle]}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.content, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: 110,
  },
});
