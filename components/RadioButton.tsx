import { StyleSheet } from "react-native";
import { Path, Svg } from 'react-native-svg';
import { ThemedView } from "./ThemedView";


type A = {
  done: boolean
}

export default function RadioButton({ done }: A) {
  return (
    <ThemedView style={styles.radioContainer}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        { done ? (
          <>
            <Path opacity="0.4" d="M17.208 0H6.804C2.736 0 0 2.856 0 7.104V16.908C0 21.144 2.736 24 6.804 24H17.208C21.276 24 24 21.144 24 16.908V7.104C24 2.856 21.276 0 17.208 0Z" fill="#EC5F5F"/>
            <Path d="M10.5759 15.8977C10.3071 15.8977 10.0383 15.7957 9.83313 15.5905L6.98553 12.7429C6.57513 12.3325 6.57513 11.6677 6.98553 11.2585C7.39593 10.8481 8.05953 10.8469 8.46993 11.2573L10.5759 13.3633L15.5295 8.4097C15.9399 7.9993 16.6035 7.9993 17.0139 8.4097C17.4243 8.8201 17.4243 9.4849 17.0139 9.8953L11.3187 15.5905C11.1135 15.7957 10.8447 15.8977 10.5759 15.8977Z" fill="#EC5F5F"/>
          </>
        ) : (
          <Path opacity="0.4" d="M17.208 0H6.804C2.736 0 0 2.856 0 7.104V16.908C0 21.144 2.736 24 6.804 24H17.208C21.276 24 24 21.144 24 16.908V7.104C24 2.856 21.276 0 17.208 0Z" fill="#C7C9D9"/>
        )}
      </Svg>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
