export type RootTabParamList = {
  Meditations: undefined;
  AIMood: undefined;
  Premium: undefined;
};

export type SubscriptionPlanKey = 'monthly' | 'yearly';

export type MoodKey = 'calm' | 'focus' | 'anxious';

export interface MeditationItem {
  id: string;
  title: string;
  duration: string;
  isPremium: boolean;
  image: number;
}

export interface SubscriptionPlan {
  key: SubscriptionPlanKey;
  title: string;
  price: string;
  note: string;
  isHighlighted?: boolean;
}

export interface MoodOption {
  key: MoodKey;
  emoji: string;
  title: string;
  subtitle: string;
}
