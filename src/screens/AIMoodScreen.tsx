import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { AppBackground } from '../components/common/AppBackground';
import { ResultCard } from '../components/ai/ResultCard';
import { MoodOptionCard } from '../components/ai/MoodOptionCard';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { ScreenHeader } from '../components/common/ScreenHeader';
import { spacing } from '../constants/spacing';
import { moodOptions } from '../data/affirmations';
import { generateAffirmation } from '../services/affirmationService';
import { MoodKey } from '../types/app';

export function AIMoodScreen() {
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null);
  const [generatedAffirmation, setGeneratedAffirmation] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerate() {
    if (!selectedMood || isGenerating) {
      return;
    }

    setIsGenerating(true);
    setGeneratedAffirmation(null);

    try {
      const nextAffirmation = await generateAffirmation(selectedMood);
      setGeneratedAffirmation(nextAffirmation);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <AppBackground>
      <ScreenContainer>
        <ScreenHeader
          eyebrow="Настрой дня"
          title="Мягкий текст под ваше состояние"
          subtitle="Выберите настроение, и ZenPulse предложит короткую аффирмацию или спокойную практику в духе wellness."
        />

        {moodOptions.map((option) => (
          <MoodOptionCard
            key={option.key}
            onPress={() => setSelectedMood(option.key)}
            option={option}
            selected={selectedMood === option.key}
          />
        ))}

        <PrimaryButton
          disabled={!selectedMood}
          loading={isGenerating}
          onPress={handleGenerate}
          style={styles.button}
          title={generatedAffirmation ? 'Обновить текст' : 'Сгенерировать настрой'}
        />

        <ResultCard isGenerating={isGenerating} result={generatedAffirmation} />
      </ScreenContainer>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
});
