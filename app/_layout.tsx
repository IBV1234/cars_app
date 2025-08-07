import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { UserContex, RememberMeContext } from './(tabs)/connection';
import { LikeContext} from './(tabs)/acceuil';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [user, setUser] = useState({ google_id: '', name: '', email: '', password: '', picture: '', admin: 0 });
  const [isSelected, setSelection] = useState(false);
  const [likeIds, setLikeIds] = useState(new Set);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }


  return (
    <UserContex.Provider value={{ user, setUser }}>
      <LikeContext.Provider value= {{ likeIds, setLikeIds }}>
      <RememberMeContext.Provider value={{ isSelected, setSelection }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </RememberMeContext.Provider>
    </LikeContext.Provider>
    </UserContex.Provider >

  );
}
