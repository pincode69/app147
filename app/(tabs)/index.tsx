import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { backColorPriority, backColorStatus, CustomTask } from '@/constants/types';
import { getTasksByDate } from '@/hooks/storage';
import { format } from 'date-fns';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function HomeScreen() {
  const router = useRouter();

  const today = new Date();
  const todayDayOfWeek = today.getDay();

  const weekDetails = week.map((_, index) => {
    const diff = index - todayDayOfWeek;
    const dayDate = new Date(today);
    dayDate.setDate(today.getDate() + diff);
    return dayDate;
  });

  const weekDates = week.map((_, index) => {
    const diff = index - todayDayOfWeek;
    const dayDate = new Date(today);
    dayDate.setDate(today.getDate() + diff);
    return dayDate.getDate();
  });

  const [tasks, setTasks] = useState<CustomTask[] | null>(null);
  const [activeDate, setActiveDate] = useState<Date>(today);

  useFocusEffect(
    useCallback(() => {
      loadTasks(today);
    }, [])
  );

  const loadTasks = async (date?: Date) => {
    setActiveDate(date || today);

    const data = await getTasksByDate(date || today);
    setTasks(data);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <ThemedText type="title">Manage</ThemedText>
        <ThemedText type="title">your tasks</ThemedText>
        <ThemedView style={styles.body}>
          <ThemedView style={styles.weekBody}>
            {week.map((dayName, index) => (
              <TouchableOpacity
                key={index}
                style={styles.weekDayCover}
                onPress={() => { loadTasks(weekDetails[index]) }}
              >
                <ThemedText style={styles.dayName}>{dayName}</ThemedText>
                <ThemedText style={[styles.dayNumber, activeDate.getDate() === weekDates[index] && styles.dayNumberActive]} type="defaultSemiBold">{weekDates[index]}</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>

          <ThemedText type="title">Today Tasks</ThemedText>
          <ThemedText style={styles.subTitle}>The tasks assigned to you for today</ThemedText>

          {(!tasks || tasks.length === 0) ? (
            <ThemedView style={styles.noTasksBlock}>
              <Image style={styles.img} source={require('@/assets/images/content/docs.png')} />
              <ThemedText type="defaultSemiBold">No tasks assigned</ThemedText>
              <ThemedText style={styles.desc}>It looks like you don’t have any tasks assigned to you right now. Don’t worry, this space will be updated as new tasks become available.</ThemedText>
            </ThemedView>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.tasks}
            >
              {tasks.map((task, index) => (
                <TouchableOpacity key={index} style={styles.task} onPress={() => {router.push({ pathname: "/customTask", params: { id: task.id, dayParam: activeDate.toISOString() } })}}>
                  <ThemedView style={styles.details}>
                    <ThemedText
                      style={[styles.priority, {backgroundColor: backColorPriority[task.priority]}]}
                    >{task.priority} priority</ThemedText>
                    <ThemedText
                      style={[styles.status, {backgroundColor: backColorStatus[task.status]}]}
                    >{task.status === 'to do' ? 'In progress' : 'Done'}</ThemedText>
                  </ThemedView>
                  <ThemedText type="defaultSemiBold">{task.title}</ThemedText>
                  <ThemedText numberOfLines={3} style={styles.taskDesc}>{task.description}</ThemedText>
                  <ThemedView style={styles.dateCover}>
                    <CalendarIcon active={false} />
                    <ThemedText>{format(task.date, 'd MMM').toUpperCase()} - {format(task.time, 'hh:mm a').toUpperCase()}</ThemedText>
                  </ThemedView>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

        </ThemedView>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/forms/newTaskForm')}>
          <ThemedText style={styles.btnText}>Add new task</ThemedText>
        </TouchableOpacity>
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
    marginBottom: 20,
    flex: 1
  },

  weekBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    marginBottom: 24
  },
  weekDayCover: {
    gap: 4,
    flex: 1,
  },
  dayName: {
    textAlign: 'center'
  },
  dayNumber: {
    borderRadius: 8,
    backgroundColor: 'rgba(246, 247, 250, 1)',
    paddingVertical: 11.5,
    color: 'rgba(157, 159, 160, 1)',
    textAlign: 'center'
  },
  dayNumberActive: {
    color: "#FFF",
    backgroundColor: "rgba(236, 95, 95, 1)"
  },

  subTitle: {
    marginBottom: 16
  },

  noTasksBlock: {
    backgroundColor: 'rgba(246, 247, 250, 1)',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  img: {
    marginBottom: 20
  },
  desc: {
    marginTop: 4,
    textAlign: 'center'
  },

  btn: {
    paddingVertical: 16,
    backgroundColor: 'rgba(236, 95, 95, 1)',
    borderRadius: 8,
    marginBottom: 80
  },
  btnText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
    fontFamily: 'PoppinsMedium',
    textAlign: 'center',
    color: '#FFF',
  },

  tasks: {
    gap: 8,
  },
  task: {
    backgroundColor: 'rgba(246, 247, 250, 1)',
    borderRadius: 12,
    padding: 16
  },
  details: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: 'transparent',
    marginBottom: 12
  },
  priority: {
    borderRadius: 2,
    paddingHorizontal: 4,
    color: '#FFF',
    fontSize: 10,
    height: 19,
    lineHeight: 19,
    fontWeight: 500,
    fontFamily: 'PoppinsMedium',
  },
  status: {
    borderRadius: 2,
    paddingHorizontal: 4,
    color: '#FFF',
    fontSize: 10,
    height: 19,
    lineHeight: 19,
    fontWeight: 500,
    fontFamily: 'PoppinsMedium',
  },
  taskDesc: {
    marginTop: 4,
    marginBottom: 12
  },
  dateCover: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  }
});
