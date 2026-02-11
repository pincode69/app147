import { CustomTheme } from '@/constants/CustomTheme';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


export default function AppNavigator() {
  return (
    <ActionSheetProvider>
      <ThemeProvider value={CustomTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="launch" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="forms" options={{ headerShown: false }} />
          <Stack.Screen name="customTask" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar hidden />
      </ThemeProvider>
    </ActionSheetProvider>
  )
}
