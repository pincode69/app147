import { format } from 'date-fns';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ClockIcon } from './icons/ClockIcon';
import { ThemedText } from './ThemedText';

interface TimeFramePickerProps {
    time: Date;
    setTime: (date: Date) => void;
}

export default function TimeFramePicker({ time, setTime }: TimeFramePickerProps) {
    const [pickerVisible, setPickerVisible] = useState(false);

    const showPicker = () => {
        setPickerVisible(true);
    };

    const handleConfirm = (date: Date) => {
        setPickerVisible(false);
        setTime(date);
    };

    return (
        <View style={styles.cover}>
            <TouchableOpacity style={styles.time} onPress={() => showPicker()}>
                <ThemedText style={{color: 'rgba(157, 159, 160, 1)'}}>{format(time, 'H:mm')}</ThemedText>
                <ClockIcon />
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={pickerVisible}
                mode="time"
                date={time}
                onConfirm={handleConfirm}
                onCancel={() => setPickerVisible(false)}
                is24Hour={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    cover: {
    },
    time: {
        borderRadius: 8,
		padding: 16,
		color: 'rgba(157, 159, 160, 1)',
		backgroundColor: 'rgba(246, 247, 250, 1)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})