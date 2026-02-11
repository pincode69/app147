import { useFonts } from 'expo-font';
import 'react-native-reanimated';
import AppNavigator from './AppNavigator';

export default function RootLayout() {
  const [loaded] = useFonts({
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AppNavigator/>
    // <ANDROID_PINUP_MANAGER/>
  );
}
