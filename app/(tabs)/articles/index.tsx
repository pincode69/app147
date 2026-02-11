import { ThemedText } from '@/components/ThemedText';
import { articleImages, articles } from '@/constants/data';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ArticlesScreen() {
  const router = useRouter();

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <ThemedText type="title">Aircraft Signals: complete guide to communication and safety indicators</ThemedText>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
          {
            articles.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.itemCover}
                onPress={() => {router.push(`/(tabs)/articles/${item.id}`)}}
              >
                <Image style={styles.image} source={articleImages[item.img]}/>
                <ThemedText type="defaultSemiBold" style={styles.title}>{item.title}</ThemedText>
                <ThemedText numberOfLines={2}>{item.shortDesc}</ThemedText>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
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
    gap: 8,
    paddingBottom: 80
  },

  itemCover: {
    backgroundColor: 'rgba(246, 247, 250, 1)',
    borderRadius: 12,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 20
  },
  image: {
    borderRadius: 8,
    width: 'auto',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 12
  },
  title: {
    marginBottom: 4
  }
});
