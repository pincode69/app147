import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { DocumentsIcon } from '@/components/icons/DocumentsIcon';
import { EmergencyIcon } from '@/components/icons/EmergencyIcon';
import { EngineIcon } from '@/components/icons/EngineIcon';
import { FuelIcon } from '@/components/icons/FuelIcon';
import { InstrumentsIcon } from '@/components/icons/InstrumentsIcon';
import { PlaneIcon } from '@/components/icons/PlaneIcon';
import RadioButton from '@/components/RadioButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DefaultTask } from '@/constants/types';
import { getDefaultTasks } from '@/hooks/storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { JSX, useCallback, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from '../../../components/icons/ArrowLeftIcon';

export default function TasksScreen() {
  const router = useRouter();
  const [checklist, setChecklist] = useState<DefaultTask[] | undefined>();

  useFocusEffect(
  useCallback(() => {
    const loadTasks = async () => {
      const allTasks = await getDefaultTasks();

      if (allTasks?.checklist) {
        setChecklist(allTasks.checklist);
      }
    };

    loadTasks();
  }, [])
);

  const defaultTaskIcon: Record<number, JSX.Element> = {
    1: <PlaneIcon />,
    2: <FuelIcon />,
    3: <InstrumentsIcon />,
    4: <EngineIcon />,
    5: <EmergencyIcon />,
    6: <DocumentsIcon  />
  }

  if(!checklist) {
    return (
      <SafeAreaProvider style={styles.container}>
        <SafeAreaView style={styles.safeContainer}>
          <TouchableOpacity onPress={() => {router.back()}}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <ThemedText style={{marginTop: 32}}>There is no tasks</ThemedText>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }
  
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <ThemedText type="title">Universal {'\n'}Pre-Flight Checklist</ThemedText>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
          {
            checklist.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.itemCover}
                onPress={() => {router.push(`/(tabs)/task/${item.id}`)}}
              >
                <ThemedView style={styles.image}>{defaultTaskIcon[item.icon]}</ThemedView>
                <ThemedText type="defaultSemiBold" style={styles.title}>{item.title}</ThemedText>
                {item.status === 'done' ? <RadioButton done={true} /> : <ArrowRightIcon />}
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
		flex: 1,
  },
  safeContainer: {
    flex: 1,
		paddingHorizontal: 16,
  },
  body: {
    marginTop: 32,
    gap: 8,
    paddingBottom: 80
  },

  itemCover: {
    backgroundColor: 'rgba(246, 247, 250, 1)',
    borderRadius: 12,
    padding: 8,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center'
  },
  image: {
    borderRadius: 8,
    backgroundColor: 'rgba(236, 95, 95, 0.4)',
    paddingVertical: 18,
    paddingHorizontal: 26,
  },
  title: {
    marginBottom: 4,
    flex: 1
  }
});
