import { checklist, subChecklist } from '@/constants/data';
import { InitialDefaultTasks } from '@/constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_TASKS = 'default_tasks';

export const initializeDefaultTasks = async (): Promise<void> => {
  try {
    const existing = await AsyncStorage.getItem(DEFAULT_TASKS);

    if (!existing) {
      const initialDefaultTasks: InitialDefaultTasks = {
        checklist,
        subChecklist,
      };

      await AsyncStorage.setItem(DEFAULT_TASKS, JSON.stringify(initialDefaultTasks));
    }
  } catch (error) {
    console.error('Error initializing default tasks:', error);
  }
};
