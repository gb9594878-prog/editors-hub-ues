import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AppContextValue = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FAVORITES_KEY = '@editor-hub/favorites';
const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY).then((saved) => {
      if (!saved) return;
      try {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
          setFavorites(parsed);
        }
      } catch {
        // Ignore a corrupted local preference and start clean.
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)).catch(() => undefined);
  }, [favorites]);

  const value = useMemo<AppContextValue>(
    () => ({
      favorites,
      toggleFavorite: (id) => {
        setFavorites((current) =>
          current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
        );
      },
      isFavorite: (id) => favorites.includes(id),
    }),
    [favorites],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}