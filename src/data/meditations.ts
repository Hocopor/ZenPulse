import { MeditationItem } from '../types/app';

export const meditations: MeditationItem[] = [
  {
    id: 'calm-harbor',
    title: 'Тихая гавань',
    duration: '8 мин',
    isPremium: false,
    image: require('../assets/meditations/calm-harbor.png'),
  },
  {
    id: 'soft-breath',
    title: 'Мягкое дыхание',
    duration: '10 мин',
    isPremium: false,
    image: require('../assets/meditations/soft-breath.png'),
  },
  {
    id: 'deep-focus',
    title: 'Глубокий фокус',
    duration: '12 мин',
    isPremium: true,
    image: require('../assets/meditations/deep-focus.png'),
  },
  {
    id: 'evening-reset',
    title: 'Вечерний перезапуск',
    duration: '14 мин',
    isPremium: true,
    image: require('../assets/meditations/evening-reset.png'),
  },
  {
    id: 'rain-release',
    title: 'Отпустить тревогу',
    duration: '9 мин',
    isPremium: true,
    image: require('../assets/meditations/rain-release.png'),
  },
  {
    id: 'night-stillness',
    title: 'Ночная тишина',
    duration: '16 мин',
    isPremium: true,
    image: require('../assets/meditations/night-stillness.png'),
  },
];
