import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { AppBackground } from '../components/common/AppBackground';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { ScreenHeader } from '../components/common/ScreenHeader';
import { PlanCard } from '../components/paywall/PlanCard';
import { colors } from '../constants/colors';
import { radii } from '../constants/radii';
import { shadows } from '../constants/shadows';
import { spacing } from '../constants/spacing';
import { fontWeights, typography } from '../constants/typography';
import { plans } from '../data/plans';
import { useSubscription } from '../hooks/useSubscription';
import { RootTabParamList, SubscriptionPlanKey } from '../types/app';

type Props = BottomTabScreenProps<RootTabParamList, 'Premium'>;

const benefits = [
  'Открытый каталог всех медитаций',
  'AI-фича «Настрой дня» без блокировок',
  'Мягкий premium-опыт без лишних шагов',
  'Состояние подписки сохраняется между запусками',
];

export function PaywallScreen({ navigation }: Props) {
  const { activateSubscription, isSubscribed } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanKey>('yearly');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleActivation() {
    if (isSubscribed || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await activateSubscription();
      navigation.navigate('Meditations');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AppBackground>
      <ScreenContainer>
        <ScreenHeader
          eyebrow="Premium"
          title={isSubscribed ? 'Доступ уже открыт' : 'Откройте весь ритм ZenPulse'}
          subtitle={
            isSubscribed
              ? 'Ваш Premium уже активен: каталог открыт, AI-настрой доступен, а приложение остаётся в спокойном и цельном режиме.'
              : 'Premium открывает весь каталог, делает «Настрой дня» доступным и сохраняет ощущение цельного wellness-продукта.'
          }
        />

        <View style={[styles.heroCard, isSubscribed ? styles.heroCardActive : null]}>
          <Text style={styles.heroTitle}>{isSubscribed ? 'Premium активен' : 'Спокойный доступ без барьеров'}</Text>
          <Text style={styles.heroDescription}>
            {isSubscribed
              ? 'Вы можете сразу вернуться к медитациям или открыть AI-настрой дня без дополнительных ограничений.'
              : 'Выберите комфортный тариф, сохраните доступ локально и продолжите путь без лишних экранов и сложного billing flow.'}
          </Text>
        </View>

        <View style={styles.benefitsCard}>
          {benefits.map((benefit) => (
            <View key={benefit} style={styles.benefitRow}>
              <Ionicons color={colors.accentMint} name="checkmark-circle" size={18} />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        <View style={styles.planSection}>
          {plans.map((plan) => (
            <PlanCard
              key={plan.key}
              onPress={() => setSelectedPlan(plan.key)}
              plan={plan}
              selected={selectedPlan === plan.key}
            />
          ))}
        </View>

        {isSubscribed ? (
          <PrimaryButton
            onPress={() => navigation.navigate('Meditations')}
            title="Вернуться к медитациям"
            variant="secondary"
          />
        ) : (
          <PrimaryButton loading={isSubmitting} onPress={handleActivation} title="Активировать Premium" />
        )}

        <Text style={styles.caption}>
          {isSubscribed
            ? 'Premium сохранён локально на этом устройстве и доступен сразу после запуска приложения.'
            : 'Демо-активация работает локально внутри приложения и открывает весь Premium-контент без реальной оплаты.'}
        </Text>
      </ScreenContainer>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: radii.xl,
    padding: spacing.xl,
    gap: spacing.md,
    marginBottom: spacing.xl,
    ...shadows.soft,
  },
  heroCardActive: {
    borderColor: 'rgba(159,227,178,0.35)',
    backgroundColor: 'rgba(159,227,178,0.10)',
  },
  heroTitle: {
    color: colors.textPrimary,
    fontSize: typography.h2,
    fontWeight: fontWeights.semibold,
    lineHeight: 30,
  },
  heroDescription: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 24,
  },
  benefitsCard: {
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  benefitText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: typography.bodySmall,
    lineHeight: 20,
  },
  planSection: {
    marginBottom: spacing.xl,
  },
  caption: {
    color: colors.textMuted,
    fontSize: typography.caption,
    lineHeight: 18,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
});
