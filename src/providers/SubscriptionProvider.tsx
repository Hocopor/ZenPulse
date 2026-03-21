import React, { createContext, useEffect, useMemo, useState } from 'react';

import { readSubscriptionState, writeSubscriptionState } from '../storage/subscriptionStorage';

type SubscriptionContextValue = {
  isSubscribed: boolean;
  isSubscriptionHydrated: boolean;
  activateSubscription: () => Promise<void>;
};

export const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export function SubscriptionProvider({ children }: Props) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscriptionHydrated, setIsSubscriptionHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function hydrateSubscription() {
      try {
        const nextValue = await readSubscriptionState();
        if (isMounted) {
          setIsSubscribed(nextValue);
        }
      } finally {
        if (isMounted) {
          setIsSubscriptionHydrated(true);
        }
      }
    }

    hydrateSubscription();

    return () => {
      isMounted = false;
    };
  }, []);

  async function activateSubscription() {
    setIsSubscribed(true);
    await writeSubscriptionState(true);
  }

  const value = useMemo(
    () => ({
      isSubscribed,
      isSubscriptionHydrated,
      activateSubscription,
    }),
    [isSubscribed, isSubscriptionHydrated],
  );

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}
