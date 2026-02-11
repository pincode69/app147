import { ThemedView } from '@/components/ThemedView';

import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { CalendarIcon } from './icons/CalendarIcon';
import { ThemedText } from './ThemedText';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (checked: boolean) => void;
};

export const CreateCheckModal = ({ visible, onClose, onSave }: Props) => {
  
  const handleCreate = (checked: boolean) => {
    if(checked) {
      onSave(checked)
    }
    onClose()
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <ThemedView style={styles.modal}>
          <ThemedView style={styles.element}></ThemedView>
          <ThemedView style={styles.img}>
            <CalendarIcon />
          </ThemedView>
          <ThemedText style={styles.title} type="defaultSemiBold">Create New Task</ThemedText>
          <ThemedText style={styles.desc}>Double-check your task details to ensure everything is correct. Do you want to proceed?</ThemedText>

          <TouchableOpacity style={styles.btn} onPress={() => handleCreate(true)}>
            <ThemedText style={styles.btnText}>Yes, proceed now</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => handleCreate(false)}>
            <ThemedText style={styles.btnText}>No, let me check</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modal: {
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  element: {
    width: 80,
    height: 8,
    backgroundColor: 'rgba(196, 196, 196, 1)',
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 24
  },
  img: {
    backgroundColor: 'rgba(246, 247, 250, 1)',
    borderRadius: 8,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24
  },

  title: {
    textAlign: 'center',
    marginBottom: 4
  },
  desc: {
    textAlign: 'center',
    marginBottom: 32
  },

  btn: {
		paddingVertical: 16,
		backgroundColor: 'rgba(236, 95, 95, 1)',
		borderRadius: 8,
		marginBottom: 16
	},
	btnText: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: 500,
		fontFamily: 'PoppinsMedium',
		textAlign: 'center',
		color: '#FFF',
	}
});
