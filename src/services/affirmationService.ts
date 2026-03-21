import { affirmationsByMood, fallbackAffirmation } from '../data/affirmations';
import { MoodKey } from '../types/app';

function getDelay() {
  return 700 + Math.floor(Math.random() * 501);
}

export async function generateAffirmation(mood: MoodKey): Promise<string> {
  const delay = getDelay();
  await new Promise((resolve) => setTimeout(resolve, delay));

  const variants = affirmationsByMood[mood];

  if (!variants?.length) {
    return fallbackAffirmation;
  }

  const nextIndex = Math.floor(Math.random() * variants.length);
  return variants[nextIndex] ?? fallbackAffirmation;
}
