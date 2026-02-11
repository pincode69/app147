import { ThemedText } from '@/components/ThemedText';
import { articleImages, articles } from '@/constants/data';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from '../../../components/icons/ArrowLeftIcon';

export default function ArticleScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const navigation = useNavigation();
    const article = articles.find((article) => article.id === Number(id))

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

    const renderContent = (content: any[]) => {
        return content.map((block, index) => {
            switch (block.type) {
            case 'paragraph':
                return (
                <ThemedText key={index} style={styles.paragraph}>
                    {block.text}
                </ThemedText>
                );
            case 'heading':
                return (
                <ThemedText key={index} type="subtitle" style={styles.heading}>
                    {block.text}
                </ThemedText>
                );
            case 'list':
                return block.items.map((item: string, idx: number) => (
                <ThemedText key={`${index}-${idx}`} style={styles.listItem}>
                    • {item}
                </ThemedText>
                ));
            default:
                return null;
            }
        });
    };

    if(!article) {
        return (
            <SafeAreaProvider style={styles.container}>
                <SafeAreaView style={styles.safeContainer}>
                    <TouchableOpacity onPress={() => {router.back()}}>
                        <ArrowLeftIcon />
                    </TouchableOpacity>
                   <ThemedText style={{marginTop: 32}}>There is no article</ThemedText>
                </SafeAreaView>
            </SafeAreaProvider>
        )
    }

    return (
        <SafeAreaProvider style={styles.container}>
            <SafeAreaView style={styles.safeContainer}>
                <TouchableOpacity onPress={() => {router.back()}}>
                    <ArrowLeftIcon />
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
                    <Image style={styles.image} source={articleImages[article.img]}/>
                    <ThemedText type="title" style={styles.title}>{article.title}</ThemedText>
                    {renderContent(article.content)}
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
        paddingBottom: 20,
        gap: 8,
    },
    image: {
        borderRadius: 8,
        width: 'auto',
        height: 300,
        resizeMode: 'cover',
        marginBottom: 12
    },
    title: {
        marginBottom: 8
    },

    paragraph: {
    },
    heading: {
    },
    listItem: {
        marginLeft: 12,
    }
});
