import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkState = async () => {
      const wasOnLaunch = await AsyncStorage.getItem('wasOnLaunch');
      
      if (wasOnLaunch !== 'true') {
        router.push('/launch');
        return;
      }

      router.push(`/(tabs)`);
    };

    checkState();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
