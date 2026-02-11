import { CustomTask, InitialDefaultTasks } from '@/constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const DEFAULT_TASKS = 'default_tasks';
const TASKS = 'tasks_by_date';

export const getDefaultTasks = async (): Promise<InitialDefaultTasks | null> => {
  try {
    const json = await AsyncStorage.getItem(DEFAULT_TASKS);
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error('Error loading default tasks:', error);
    return null;
  }
};

export const saveDefaultTasks = async (tasks: InitialDefaultTasks): Promise<void> => {
  try {
    await AsyncStorage.setItem(DEFAULT_TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving default tasks:', error);
  }
};

export const saveTask = async (task: CustomTask): Promise<void> => {
  try {
    const key = format(task.date, 'yyyy-MM-dd');
    const existing = await AsyncStorage.getItem(TASKS);
    const tasksByDate = existing ? JSON.parse(existing) : {};

    if (!tasksByDate[key]) {
      tasksByDate[key] = [];
    }

    if(!task.id) {
      tasksByDate[key].push({...task, id: Date.now()});
    } else {
      const index = tasksByDate[key].findIndex((item: CustomTask) => item.id === task.id);
      if (index !== -1) {
        tasksByDate[key][index] = { ...tasksByDate[key][index], ...task };
      }
    }

    // tasksByDate[key].push(!task.id ? {...task, id: Date.now()} : task);

    await AsyncStorage.setItem(TASKS, JSON.stringify(tasksByDate));
  } catch (error) {
    console.error('Error saving task by date:', error);
  }
};

export const getTasksByDate = async (date: Date): Promise<CustomTask[]> => {
  try {
    const key = format(date, 'yyyy-MM-dd');
    const json = await AsyncStorage.getItem(TASKS);
    const tasksByDate = json ? JSON.parse(json) : {};
    return tasksByDate[key] || [];
  } catch (error) {
    console.error('Error getting tasks by date:', error);
    return [];
  }
};
