import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { backColorPriority, backColorStatus, CustomTask } from '@/constants/types';
import { getTasksByDate, saveTask } from '@/hooks/storage';
import { format } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

export default function CustomTaskScreen() {
	const {id, dayParam} = useLocalSearchParams();
	const router = useRouter();
	const [task, setTask] = useState<CustomTask>();
	const day = dayParam ? dayParam : new Date();

	useEffect(() => {
		const loadTasks = async () => {
		  	const data = await getTasksByDate(day as Date);
	
		  	if (data) {
				const taskItem = data.find((item) => item.id === Number(id))
				setTask(taskItem);
		  	}
		};
	
		loadTasks();
	}, [])

	const handelComplete = async () => {
		if (task) {
			const updatedTask: CustomTask = {
				...task,
				status: 'done'
			};
			setTask(updatedTask);
			await saveTask(updatedTask);
  		}
	}

	if(!task) {
		return (
			<SafeAreaProvider style={styles.container}>
				<SafeAreaView style={styles.safeContainer}>
					<TouchableOpacity onPress={() => {router.back()}}>
						<ArrowLeftIcon />
					</TouchableOpacity>
					<ThemedText style={{marginTop: 32}}>There is no task</ThemedText>
				</SafeAreaView>
			</SafeAreaProvider>
		)
	}

  	return (
		<SafeAreaProvider style={styles.container}>
			<SafeAreaView style={styles.safeContainer}>
				<TouchableOpacity style={styles.btnBack} onPress={() => { router.back() }}>
					<ThemedView style={styles.btnBackArrow}><ArrowLeftIcon /></ThemedView>
					<ThemedText type="defaultSemiBold" style={styles.btnBackText}>Task</ThemedText>
				</TouchableOpacity>
				<ThemedView style={styles.task}>
					<ThemedView style={styles.details}>
						<ThemedText
							style={[styles.priority, {backgroundColor: backColorPriority[task.priority]}]}
						>{task.priority} priority</ThemedText>
						<ThemedText
							style={[styles.status, {backgroundColor: backColorStatus[task.status]}]}
						>{task.status === 'to do' ? 'In progress' : 'Done'}</ThemedText>
					</ThemedView>
					<ThemedText type="title">{task.title}</ThemedText>
					<ThemedView style={styles.dateCover}>
						<CalendarIcon active={false} />
						<ThemedText>{format(task.date, 'd MMM').toUpperCase()} - {format(task.time, 'hh:mm a').toUpperCase()}</ThemedText>
					</ThemedView>
					<ThemedText numberOfLines={3} style={styles.taskDesc}>{task.description}</ThemedText>
				</ThemedView>
				
				<TouchableOpacity style={styles.btn} onPress={handelComplete}>
					<ThemedText style={styles.btnText}>Task complete</ThemedText>
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
	btnBack: {
		position: 'relative',
        alignItems: 'center',
        height: 44,
        justifyContent: 'center',
		marginBottom: 32
    },
	btnBackArrow: {
		left: 0,
        top: 0,
        position: 'absolute'
	},
	btnBackText: {
		textAlign: 'center',
	},

	btn: {
		paddingVertical: 16,
		backgroundColor: 'rgba(236, 95, 95, 1)',
		borderRadius: 8,
		marginBottom: 20
	},
	btnText: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: 500,
		fontFamily: 'PoppinsMedium',
		textAlign: 'center',
		color: '#FFF',
	},

	task: {
		flex: 1
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
		marginTop: 12
	},
	dateCover: {
		backgroundColor: 'transparent',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		marginTop: 4
	}
});
