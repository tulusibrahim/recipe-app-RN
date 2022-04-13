import { StyleSheet, Text, View, TextInput, ImageBackground, Platform, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons'
import React, { useState, useEffect } from 'react/cjs/react.development';
import { fetchData, popBold, popRegular } from '../helper/helper';
import AppBar from './appBar';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = ({ navigation }) => {
    const [input, setInput] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState([])

    const search = async (second) => {
        if (input) {
            setLoading(true)
            const value = await AsyncStorage.getItem('searches')
            console.log(value)
            if (value == null) {
                let temp = []
                temp.push(input)
                await AsyncStorage.setItem('searches', JSON.stringify(temp))
            }
            else {
                let temp = JSON.parse(value)
                let newArray = Array.from(temp)
                if (newArray.length > 5) newArray.splice(0, 1)
                newArray.push(input)
                await AsyncStorage.setItem('searches', JSON.stringify(newArray))
            }
            let data = await fetchData('/api/search/?q=' + input)
            console.log(data)
            setLoading(false)
            setData(data.results)
        }
    }

    const getHistory = async (second) => {
        let val = await AsyncStorage.getItem('searches')
        let parse = JSON.parse(val)
        let newArray = Array.from(parse)
        setHistory(newArray)
    }

    const EmptyList = (second) => {
        // let datas = []
        // gethistory().then(data => datas = data)
        // console.log(datas)
        return (
            <View style={{ width: '100%', minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {
                    loading ?
                        <Text style={{ fontFamily: popBold, letterSpacing: .5 }}>Loading...</Text>
                        :
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: '90%', minHeight: 100 }}>
                            {
                                history.length ?
                                    <>
                                        <Text style={{ fontFamily: popBold }}>Recent history</Text>
                                        {
                                            history.map((i, id) => (
                                                <View key={id} style={{ elevation: 2, width: '100%', padding: 5, backgroundColor: 'white', marginVertical: 6, borderRadius: 5 }}>
                                                    <Text style={{ fontFamily: popRegular }}>{i}</Text>
                                                </View>
                                            ))
                                        }
                                    </>
                                    :
                                    <View style={{ width: '100%', display: 'flex', alignItems: 'center', }}>
                                        <Text style={{ fontFamily: popRegular }}>No search history</Text>
                                    </View>
                            }
                        </View>
                }
            </View>
        )
    }

    const ProductList = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={.9} style={{ margin: 5, width: '45%', borderRadius: 10, marginBottom: 20, }} onPress={() => navigation.navigate('detail', { data: item })}>
                <ImageBackground source={{ uri: item.thumb }} resizeMode='cover' style={{ width: '100%', height: 250, }} imageStyle={{ borderRadius: 20 }}>
                    <LinearGradient
                        // Background Linear Gradient
                        colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.8)']}
                        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 100, borderRadius: 20 }}
                    />
                </ImageBackground>
                <View style={{ bottom: 10, left: 10, position: 'absolute', width: '85%' }}>
                    <Text style={{ fontSize: 11, color: 'white', fontFamily: popRegular }}>{item.difficulty} | {item.times}</Text>
                    <Text numberOfLines={2} style={{ color: 'white', fontFamily: popRegular }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const HeaderSearch = (second) => {
        return (
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: popRegular }}>{data.length} search results</Text>
                <View>
                    <Icon name='filter-list' size={24} />
                </View>
            </View>
        )
    }

    useEffect(() => {
        if (!input) {
            // search()
            setData([])
        }
        // else {
        // }
    }, [input])

    useEffect(() => {
        getHistory()
    }, [])

    const styles = {
        wrapper: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FAFCFE'
        },
        inputWrap: {
            backgroundColor: 'white',
            elevation: 2,
            borderRadius: 12,
            padding: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '90%',
            marginBottom: 10
        },
        input: {
            marginLeft: 10,
            width: '100%',
            fontFamily: popRegular
        },
        resultWrap: {
            width: '100%',
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
        },
        flatlistStyle: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%'
        },
        resultHeader: {
            display: data.length ? 'flex' : 'none',
            alignSelf: 'flex-start',
            width: '90%',
            alignSelf: 'center'
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.wrapper}>
                <AppBar title={'Search'} like={false} back={navigation} detail='search' />
                <View activeOpacity={1} onPress={() => navigation.navigate('search')} style={styles.inputWrap}>
                    <Icon name='search' size={20} />
                    <TextInput placeholder='Search' style={styles.input} onChangeText={e => setInput(e)} onSubmitEditing={() => search()} />
                </View>
                <View style={styles.resultWrap}>
                    <FlatList
                        data={data}
                        numColumns={2}
                        ListEmptyComponent={<EmptyList />}
                        contentContainerStyle={styles.flatlistStyle}
                        ListHeaderComponent={<HeaderSearch />}
                        ListHeaderComponentStyle={styles.resultHeader}
                        renderItem={({ item }) => <ProductList item={item} />}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Search;