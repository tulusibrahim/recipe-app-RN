import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchData, popBold, popRegular } from '../helper/helper';

const Article = ({ navigation, route }) => {
    const [articleCategory, setArticleCategory] = useState([])
    const [articles, setArticles] = useState([])
    const [loadPage, setLoadPage] = useState(0)
    const [loadPageState, setLoadPageState] = useState(false)

    const fetchArticleCategory = async (key) => {
        // setLoadPage(loadPage + 1)
        let data = await fetchData('/api/categorys/article')
        console.log(data)
        // if (loadPage > 1) {
        //     setArticle(e => [...e, ...data.results])
        //     return
        // }
        setArticleCategory(data.results)
    }

    const fetchArticle = async (key) => {
        // setLoadPage(loadPage + 1)
        let data = await fetchData('/api/articles/new')
        console.log(data)
        // if (loadPage > 1) {
        //     setArticle(e => [...e, ...data.results])
        //     return
        // }
        setArticles(data.results)
    }

    useEffect(() => {
        fetchArticleCategory()
        fetchArticle()
    }, [])


    return (
        <SafeAreaView>
            <View style={{ height: '100%', width: '100%', backgroundColor: '#FAFCFE' }}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10, width: '80%' }}>
                    <Text style={{ fontSize: 24, fontFamily: popBold }}>
                        Articles
                    </Text>
                </View>
                <FlatList
                    horizontal
                    keyExtractor={e => e.key}
                    style={{ marginVertical: 10, marginLeft: 20 }}
                    showsHorizontalScrollIndicator={false}
                    data={articleCategory}
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={.8} style={{ padding: 10, borderRadius: 8, backgroundColor: '#56BF6D', marginRight: 10, paddingHorizontal: 20 }} >
                            <Text style={{ color: 'white', fontFamily: popRegular }}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />
                <FlatList
                    data={articles}
                    keyExtractor={e => e.key}
                    style={{ marginVertical: 10, marginLeft: 20 }}
                    renderItem={({ item }) => <Text>{item.title}</Text>}
                />
            </View>
        </SafeAreaView>
    );
}

export default Article;