import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { AppBackground } from '../components/common/AppBackground';
import { InfoSurface } from '../components/common/InfoSurface';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { ScreenHeader } from '../components/common/ScreenHeader';
import { MeditationCard } from '../components/meditation/MeditationCard';
import { meditations } from '../data/meditations';
import { useSubscription } from '../hooks/useSubscription';
import { RootTabParamList } from '../types/app';

type Props = BottomTabScreenProps<RootTabParamList, 'Meditations'>;

export function MeditationsScreen({ navigation }: Props) {
  const { isSubscribed } = useSubscription();

  return (
    <AppBackground>
      <ScreenContainer>
        <ScreenHeader
          eyebrow="ZenPulse"
          title="Медитации для мягкого ритма дня"
          subtitle="Выберите практику на сейчас: две сессии доступны сразу, остальные открываются с Premium."
        />

        <InfoSurface
          description={
            isSubscribed
              ? 'Premium уже активен: весь каталог открыт, и вы можете свободно переключаться между практиками и AI-настроем.'
              : 'Часть каталога доступна только в Premium. Открывайте понравившиеся практики и переходите к подписке без лишних шагов.'
          }
          title={isSubscribed ? 'Доступ открыт' : 'Часть практик в Premium'}
          variant={isSubscribed ? 'success' : 'default'}
        />

        {meditations.map((item) => {
          const isLocked = item.isPremium && !isSubscribed;

          return (
            <MeditationCard
              isLocked={isLocked}
              item={item}
              key={item.id}
              onPress={() => {
                if (isLocked) {
                  navigation.navigate('Premium');
                }
              }}
            />
          );
        })}
      </ScreenContainer>
    </AppBackground>
  );
}
