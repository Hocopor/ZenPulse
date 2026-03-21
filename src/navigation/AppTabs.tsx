import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { colors, gradients } from '../constants/colors';
import { radii } from '../constants/radii';
import { shadows } from '../constants/shadows';
import { spacing } from '../constants/spacing';
import { fontWeights, typography } from '../constants/typography';
import { useSubscription } from '../hooks/useSubscription';
import { AIMoodScreen } from '../screens/AIMoodScreen';
import { MeditationsScreen } from '../screens/MeditationsScreen';
import { PaywallScreen } from '../screens/PaywallScreen';
import { RootTabParamList } from '../types/app';

const Tab = createBottomTabNavigator<RootTabParamList>();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'transparent',
    card: 'transparent',
    primary: colors.accentMint,
    text: colors.textPrimary,
    border: 'transparent',
  },
};

function TabIcon({
  focused,
  iconName,
  label,
}: {
  focused: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  if (focused) {
    return (
      <LinearGradient colors={gradients.tabActive} style={styles.activeTab}>
        <Ionicons color={colors.accentMint} name={iconName} size={18} />
        <Text style={styles.activeLabel}>{label}</Text>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.inactiveTab}>
      <Ionicons color={colors.textMuted} name={iconName} size={18} />
      <Text style={styles.inactiveLabel}>{label}</Text>
    </View>
  );
}

export function AppTabs() {
  const { isSubscribed } = useSubscription();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        initialRouteName="Meditations"
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          component={MeditationsScreen}
          name="Meditations"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} iconName={focused ? 'leaf' : 'leaf-outline'} label="Медитации" />
            ),
          }}
        />
        <Tab.Screen
          component={AIMoodScreen}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              if (!isSubscribed) {
                event.preventDefault();
                navigation.navigate('Premium');
              }
            },
          })}
          name="AIMood"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} iconName={focused ? 'sparkles' : 'sparkles-outline'} label="Настрой дня" />
            ),
          }}
        />
        <Tab.Screen
          component={PaywallScreen}
          name="Premium"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} iconName={focused ? 'diamond' : 'diamond-outline'} label="Premium" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 78,
    backgroundColor: 'rgba(15,23,32,0.92)',
    borderTopWidth: 0,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    ...shadows.soft,
  },
  activeTab: {
    minWidth: 110,
    minHeight: 44,
    borderRadius: radii.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  inactiveTab: {
    minWidth: 96,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  activeLabel: {
    color: colors.textPrimary,
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
  },
  inactiveLabel: {
    color: colors.textMuted,
    fontSize: typography.caption,
    fontWeight: fontWeights.medium,
  },
});
