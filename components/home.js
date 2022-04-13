import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import React, { useEffect, useState } from 'react/cjs/react.development';
import { baseURL, popBold, popRegular } from '../helper/helper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Home = ({ navigation }) => {
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])
    const [loadPage, setLoadPage] = useState(0)
    const [loadPageState, setLoadPageState] = useState(false)
    // console.log(tes)

    const fetchRecipes = async (second) => {
        setLoadPage(loadPage + 1)
        if (loadPage > 1) setLoadPageState(true)
        let data = await fetch(baseURL + '/api/recipes/' + loadPage)
        let json = await data.json()
        console.log(json)
        if (loadPage > 1) {
            setLoadPageState(false)
            setData(e => [...e, ...json.results])
            return
        }
        setData(json.results)
    }

    const fetchCategories = async (second) => {
        let data = await fetch(baseURL + '/api/categorys/recipes')
        let json = await data.json()
        console.log(json)
        setCategories(json.results)
    }

    useEffect(async () => {
        // await AsyncStorage.removeItem('likes')
        fetchRecipes()
        fetchCategories()
    }, [])

    const CardRecipe = ({ i }) => {
        return (
            <TouchableOpacity activeOpacity={.9} style={{ width: '100%', borderRadius: 10, marginBottom: 20, }} onPress={() => navigation.navigate('detail', { data: i })}>
                <ImageBackground source={{ uri: i.thumb }} resizeMode='cover' style={{ width: '100%', height: 250, }} imageStyle={{ borderRadius: 20 }}>
                    <LinearGradient
                        // Background Linear Gradient
                        colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.8)']}
                        style={styles.background}
                    />
                </ImageBackground>
                <View style={{ bottom: 10, left: 10, position: 'absolute', width: '85%' }}>
                    <Text style={{ fontSize: 12, color: 'white', fontFamily: popRegular }}>{i.dificulty} | {i.times}</Text>
                    <Text style={{ fontSize: 16, color: 'white', fontFamily: popBold }} numberOfLines={2}>{i.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const UpperSide = (second) => {
        return (
            <>
                <View style={{ paddingVertical: 20, width: '80%' }}>
                    <Text style={{ fontSize: 24, fontFamily: popBold }}>
                        Find best recipe for cooking
                    </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('search')} style={{ backgroundColor: 'white', elevation: 2, borderRadius: 12, padding: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', width: '85%' }}>
                        <Icon name='search' size={20} />
                        <TextInput placeholder='Search' editable={false} style={{ marginLeft: 10, width: '100%', fontFamily: popRegular }} onPressIn={() => navigation.navigate('search')} />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: '#E9F5EF', padding: 7, borderRadius: 10, elevation: 2 }}>
                        <Icon name='filter-list' size={24} color='#27BE6D' />
                    </View>
                </View>
                <FlatList
                    horizontal
                    style={{ marginVertical: 20, }}
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={.8} style={{ padding: 10, marginVertical: 5, borderRadius: 8, elevation: 2, backgroundColor: '#56BF6D', marginRight: 15, paddingHorizontal: 20 }} onPress={() => navigation.navigate('category', { data: item })}>
                            <Text style={{ color: 'white', fontFamily: popRegular }}>{item.category}</Text>
                        </TouchableOpacity>

                    )}
                />
            </>
        )
    }

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={'#FAFCFE'} barStyle={'dark-content'} />
            <View style={styles.container}>
                <FlatList
                    data={data}
                    style={{ paddingHorizontal: 20 }}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={() => <UpperSide />}
                    renderItem={({ item }) => <CardRecipe i={item} />}
                    ListFooterComponent={loadPageState && <Text style={{ fontFamily: popRegular, textAlign: 'center' }}>Loading...</Text>}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => fetchRecipes()}
                />
            </View>
        </SafeAreaView>
    );
}

export default Home

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FAFCFE',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 100,
        borderRadius: 20
    },
});