import { SubscriptionPlan } from '../types/app';

export const plans: SubscriptionPlan[] = [
  {
    key: 'monthly',
    title: 'Месячный',
    price: '349 ₽ / месяц',
    note: 'Гибкий доступ ко всем практикам',
  },
  {
    key: 'yearly',
    title: 'Годовой',
    price: '2 490 ₽ / год',
    note: 'Лучший выбор для спокойной рутины',
    isHighlighted: true,
  },
];
