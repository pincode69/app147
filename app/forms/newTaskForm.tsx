import { CreateCheckModal } from '@/components/CreateCheckModal';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TimeFramePicker from '@/components/TimeFramePicker';
import { CustomTask } from '@/constants/types';
import { saveTask } from '@/hooks/storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
	Platform,
	StyleSheet,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from '../../components/icons/ArrowLeftIcon';

export default function NewTaskFormScreen() {
	const router = useRouter();
	const [taskForm, setTaskForm] = useState<Omit<CustomTask, 'id'>>({
		title: '',
		description: '',
		priority: 'low',
		status: 'to do',
		date: new Date(),
		time: new Date(0, 0, 0, 9, 0)
	});
	const [showPicker, setShowPicker] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);

	const handleCreateNewTask = async (checked: boolean) => {
		if(checked) {
			await saveTask(taskForm);

			router.push('/(tabs)');
		}
	}

	const handleDateChange = (event: any, selectedDate?: Date) => {
    
        setShowPicker(false);
        if (selectedDate) {
            setTaskForm(prev => ({
                ...prev,
                date: selectedDate
            }));
        }
    };
	
  	return (
		<SafeAreaProvider style={styles.container}>
			<SafeAreaView style={styles.safeContainer}>
				<TouchableOpacity style={styles.btnBack} onPress={() => { router.back() }}>
					<ThemedView style={styles.btnBackArrow}><ArrowLeftIcon /></ThemedView>
					<ThemedText type="defaultSemiBold" style={styles.btnBackText}>Create new task</ThemedText>
				</TouchableOpacity>
					
				<ThemedView style={styles.formCover}>
					<ThemedView style={styles.field}>
						<ThemedText style={styles.label}>Task title</ThemedText>
						<TextInput
							style={styles.input}
							value={taskForm.title}
							onChangeText={(title) => setTaskForm(prev => ({...prev, title: title}))}
							placeholder="Enter task title"
						/>
					</ThemedView>

					<ThemedView style={styles.field}>
						<ThemedText style={styles.label}>Task description</ThemedText>
						<TextInput
							multiline
							numberOfLines={5}
							maxLength={50}
							style={[styles.input, styles.inputBig]}
							value={taskForm.description}
							onChangeText={(description) => setTaskForm(prev => ({...prev, description: description}))}
							placeholder="Enter task description"
						/>
					</ThemedView>

					<ThemedView style={styles.fieldRow}>
						<ThemedView style={[styles.field, {flex: 1}]}>
							<ThemedText style={styles.label}>Date</ThemedText>
							<TouchableOpacity style={styles.date} onPress={() => setShowPicker(true)}>
								<ThemedText style={{color: 'rgba(157, 159, 160, 1)'}}>
									{taskForm.date ? format(taskForm.date, 'd MMM').toLowerCase() : 'Select date'}
								</ThemedText>
								<CalendarIcon />
							</TouchableOpacity>
						</ThemedView>

						<ThemedView style={[styles.field, {flex: 1}]}>
							<ThemedText style={styles.label}>Time</ThemedText>
							<TimeFramePicker time={taskForm.time} setTime={(date: Date) => setTaskForm({...taskForm, time: date})}/>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.field}>
						<ThemedText style={styles.label}>Priority</ThemedText>
						<ThemedView style={styles.priorities}>
							<TouchableOpacity
								onPress={() => {setTaskForm({...taskForm, priority: 'low'})}}
								style={[styles.priority, taskForm.priority === 'low' && styles.activePriority]}
							>
								<ThemedText style={[styles.priorityText, taskForm.priority === 'low' && styles.activePriorityText]}>Low</ThemedText>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {setTaskForm({...taskForm, priority: 'medium'})}}
								style={[styles.priority, taskForm.priority === 'medium' && styles.activePriority]}
							>
								<ThemedText style={[styles.priorityText, taskForm.priority === 'medium' && styles.activePriorityText]}>Medium</ThemedText>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {setTaskForm({...taskForm, priority: 'high'})}}
								style={[styles.priority, taskForm.priority === 'high' && styles.activePriority]}
							>
								<ThemedText style={[styles.priorityText, taskForm.priority === 'high' && styles.activePriorityText]}>High</ThemedText>
							</TouchableOpacity>
						</ThemedView>
					</ThemedView>

					{showPicker && (
						<DateTimePicker
							value={taskForm.date.getDate() ? taskForm.date : new Date()}
							mode="date"
							display={Platform.OS === 'ios' ? 'spinner' : 'default'}
							onChange={handleDateChange}
						/>
					)}
					
				</ThemedView>
				<TouchableOpacity style={styles.btn} onPress={() => setModalVisible(true)}>
					<ThemedText style={styles.btnText}>Add new task</ThemedText>
				</TouchableOpacity>


				{taskForm && <CreateCheckModal
					visible={isModalVisible}
					onClose={() => setModalVisible(false)}
					onSave={(checked) => handleCreateNewTask(checked)}
				/>}
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

	formCover: {
		gap: 16,
		flex: 1
	},
	fieldRow: {
		flexDirection: 'row',
		gap: 8
	},
	field: {
		gap: 8,
	},
	label: {
		lineHeight: 21,
		fontSize: 14,
		color: 'rgba(48, 48, 48, 1)',
		fontWeight: 600,
		fontFamily: 'PoppinsSemiBold'
	},
	date:{
		borderRadius: 8,
		padding: 16,
		color: 'rgba(157, 159, 160, 1)',
		backgroundColor: 'rgba(246, 247, 250, 1)',
        flexDirection: 'row',
        justifyContent: 'space-between',
		alignItems: 'center'
	},
	input: {
		borderRadius: 8,
		padding: 16,
		color: 'rgba(157, 159, 160, 1)',
		backgroundColor: 'rgba(246, 247, 250, 1)',
	},
	inputBig: {
		height: 132
	},
	priorities: {
		padding: 4,
		backgroundColor: 'rgba(246, 247, 250, 1)',
		borderRadius: 12,
		flexDirection: 'row',
		gap: 4
	},
	priority: {
		flex: 1,
		paddingVertical: 12,
		borderRadius: 6,
	},
	priorityText: {
		color: 'rgba(157, 159, 160, 1)',
		textAlign: 'center',
	},
	activePriority: {
		backgroundColor: 'rgba(236, 95, 95, 1)',
	},
	activePriorityText: {
		color: '#FFF'
	}
});
