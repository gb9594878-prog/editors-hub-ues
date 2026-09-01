import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppProvider } from '@/context/AppContext';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColors } from '@/hooks/useColors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: 'Back', contentStyle: { backgroundColor: '#101214' } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

function BrandSplash({ onFinished }: { onFinished: () => void }) {
  const colors = useColors();

  useEffect(() => {
    const timer = setTimeout(onFinished, 1350);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <View style={[styles.brandSplash, { backgroundColor: colors.splashBackground }]}>
      <Image
        source={require('../assets/ues-logo.png')}
        style={styles.brandSplashLogo}
        resizeMode="contain"
        accessibilityLabel="UES logo"
      />
      <Text style={[styles.brandSplashTitle, { color: colors.foreground }]}>Editors Hub</Text>
      <Text style={[styles.brandSplashSubtitle, { color: colors.mutedForeground }]}>
        Developed by IntroVert Editx
      </Text>
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [showBrandSplash, setShowBrandSplash] = React.useState(true);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <KeyboardProvider>
                <StatusBar style="light" />
                <RootLayoutNav />
                {showBrandSplash ? <BrandSplash onFinished={() => setShowBrandSplash(false)} /> : null}
              </KeyboardProvider>
            </GestureHandlerRootView>
          </AppProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  brandSplash: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10,
  },
  brandSplashLogo: {
    borderRadius: 100,
    height: 200,
    width: 200,
  },
  brandSplashTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 29,
    letterSpacing: -0.9,
    marginTop: 18,
  },
  brandSplashSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    marginTop: 7,
  },
});
