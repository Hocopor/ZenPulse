import AsyncStorage from '@react-native-async-storage/async-storage';

const SUBSCRIPTION_KEY = 'zenpulse:is-subscribed';

export async function readSubscriptionState(): Promise<boolean> {
  const value = await AsyncStorage.getItem(SUBSCRIPTION_KEY);
  return value === 'true';
}

export async function writeSubscriptionState(isSubscribed: boolean): Promise<void> {
  await AsyncStorage.setItem(SUBSCRIPTION_KEY, String(isSubscribed));
}
