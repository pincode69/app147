import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { initializeDefaultTasks } from "@/hooks/initialDefaultTasks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function LaunchScreen() {
  const router = useRouter();

  const handleApp = async () => {
    await AsyncStorage.setItem("wasOnLaunch", "true");
    await initializeDefaultTasks();

    router.push(`/(tabs)`);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <ThemedView style={styles.info}>
          <Image
            style={styles.logo}
            source={require("@/assets/images/content/onboarding.png")}
          />
          <ThemedView>
            <ThemedText type="title">Simple Avia Tracker</ThemedText>
          </ThemedView>
          <ThemedText style={styles.desc}>
            A lightweight and fast to-do list to help you stay focused.
          </ThemedText>
        </ThemedView>

        <TouchableOpacity style={styles.btn} onPress={handleApp}>
          <ThemedText type="defaultSemiBold" style={styles.btnText}>
            Get started
          </ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  safeContainer: {
    flex: 1,
    flexDirection: "column",
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  btn: {
    paddingVertical: 16,
    backgroundColor: "rgba(236, 95, 95, 1)",
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
    fontFamily: "PoppinsMedium",
    textAlign: "center",
    color: "#FFF",
  },
  logo: {
    marginBottom: 40,
  },
  desc: {
    textAlign: "center",
  },
});
