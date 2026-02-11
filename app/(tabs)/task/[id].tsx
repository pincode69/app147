import RadioButton from '@/components/RadioButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DefaultSubTask, DefaultTask, Status } from '@/constants/types';
import { getDefaultTasks, saveDefaultTasks } from '@/hooks/storage';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from '../../../components/icons/ArrowLeftIcon';

export default function TaskScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const navigation = useNavigation();
    const [checklistItem, setChecklistItem] = useState<DefaultSubTask | undefined>();
    const isCompleteDisabled = checklistItem?.tasks.some(task => task.status !== 'done');


    useEffect(() => {
        const parent = navigation.getParent();
        parent?.setOptions({
            tabBarStyle: { display: 'none' },
        });

        return () => {
            parent?.setOptions({
                tabBarStyle: { display: 'flex' },
            });
        };
    }, []);

    useEffect(() => {
      const loadTasks = async () => {
        const allTasks = await getDefaultTasks();
        const subTasksItem = allTasks?.subChecklist.find((item) => item.id === Number(id))

        if (subTasksItem) setChecklistItem(subTasksItem)

      };
  
      if (id) loadTasks();
    }, [id]);

    const setTaskComplete = async () => {
        if (!checklistItem) return;

        const existingData = await getDefaultTasks();
        if (!existingData) return;

        const updatedChecklist = existingData.checklist.map(item =>
            item.id === checklistItem.id ? { ...item, status: 'done' as Status } : item
        );

        await saveDefaultTasks({
            ...existingData,
            checklist: updatedChecklist
        });

        router.back();
    }

    const toggleTaskStatus = async (taskId: number) => {
        if (!checklistItem) return;

        const updatedTasks = checklistItem.tasks.map(task => 
            task.id === taskId
            ? { ...task, status: task.status === 'done' ? 'to do' as Status : 'done'  as Status}
            : task
        );

        const updatedChecklistItem = { ...checklistItem, tasks: updatedTasks };
        setChecklistItem(updatedChecklistItem);

        const existingData = await getDefaultTasks();
        if (!existingData) return;

        const allSubTasksAreDone = updatedChecklistItem.tasks.every(task => task.status === 'done');

        const updatedChecklist: DefaultTask[] = existingData.checklist.map(item =>
            item.id === Number(id)
            ? { ...item, status: allSubTasksAreDone ? 'done' : 'to do' }
            : item
        );

        const updatedSubChecklist = existingData.subChecklist.map(sub =>
            sub.id === updatedChecklistItem.id ? updatedChecklistItem : sub
        );

        await saveDefaultTasks({
            ...existingData,
            checklist: updatedChecklist,
            subChecklist: updatedSubChecklist,
        });
    };

    if(!checklistItem) {
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
                <TouchableOpacity style={styles.header} onPress={() => {router.back()}}>
                    <ThemedView style={styles.btnBack}><ArrowLeftIcon /></ThemedView>
                    <ThemedText type="defaultSemiBold" style={styles.headerText}>{checklistItem?.title}</ThemedText>
                    
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
                    {
                        checklistItem.tasks.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.itemCover}
                                onPress={() => toggleTaskStatus(item.id)}
                            >
                                <ThemedText style={styles.title}>{item.title}</ThemedText>
                                <RadioButton done={item.status as Status === 'done'} />
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                <TouchableOpacity
                    style={[styles.btn, isCompleteDisabled && styles.btnDisabled]}
                    onPress={setTaskComplete}
                    disabled={isCompleteDisabled}
                >
                    <ThemedText style={styles.btnText}>Complete</ThemedText>
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
    header: {
        position: 'relative',
        alignItems: 'center',
        height: 44,
        justifyContent: 'center'
    },
    headerText: {
        textAlign: 'center'
    },
    btnBack: {
        left: 0,
        top: 0,
        position: 'absolute'
    },
    body: {
        marginTop: 32,
        paddingBottom: 20,
        gap: 8,
    },
    itemCover: {
        backgroundColor: 'rgba(246, 247, 250, 1)',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        gap: 21,
        alignItems: 'center'
    },
    title: {
        flex: 1,
        flexWrap: 'wrap',
    },

    btn: {
        paddingVertical: 16,
        backgroundColor: 'rgba(236, 95, 95, 1)',
        borderRadius: 8,
        marginBottom: 20
    },
    btnDisabled: {
        backgroundColor: 'rgba(236, 95, 95, 0.4)'
    },
    btnText: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: 500,
        fontFamily: 'PoppinsMedium',
        textAlign: 'center',
        color: '#FFF',
    },
});
