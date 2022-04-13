import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react/cjs/react.development';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from './appBar';
import { fetchData, popRegular, ProductCard } from '../helper/helper';
import { LinearGradient } from 'expo-linear-gradient';

const Category = ({ navigation, route }) => {
    const [categories, setCategories] = useState([])
    const [loadPage, setLoadPage] = useState(0)

    const fetchCategories = async (key) => {
        setLoadPage(loadPage + 1)
        let data = await fetchData('/api/categorys/recipes/' + key + `/${loadPage}`)
        console.log(data)
        if (loadPage > 1) {
            setCategories(e => [...e, ...data.results])
            return
        }
        setCategories(data.results)
    }

    useEffect(() => {
        fetchCategories(route.params.data.key)
    }, [])

    const ProductCard = ({ item }) => {
        return <TouchableOpacity activeOpacity={.9} style={{ margin: 5, width: '45%', borderRadius: 10, marginBottom: 20, }} onPress={() => navigation.navigate('detail', { data: item })}>
            <ImageBackground source={{ uri: item.thumb }} resizeMode='cover' style={{ width: '100%', height: 250, }} imageStyle={{ borderRadius: 20 }}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.8)']}
                    style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 100, borderRadius: 20 }}
                />
            </ImageBackground>
            <View style={{ bottom: 10, left: 10, position: 'absolute', width: '85%' }}>
                <Text style={{ fontSize: 12, color: 'white' }}>{item.dificulty} | {item.times}</Text>
                <Text numberOfLines={2} style={{ fontSize: 16, color: 'white' }}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    }

    const styles = {
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#FAFCFE'
        },
        wrapper: {
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
        cardWrap: {
            margin: 5,
            width: '45%',
            borderRadius: 10,
            marginBottom: 20,
        },
        img: {
            width: '100%',
            height: 250,
        },
        gradationBg: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 100,
            borderRadius: 20
        },
        textWrap: {
            bottom: 10,
            left: 10,
            position: 'absolute',
            width: '85%'
        },
        text: {
            color: 'white',
            fontFamily: popRegular
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <AppBar title={route.params.data.category} detail='categories' back={navigation} />
                <View style={styles.wrapper}>
                    <FlatList
                        data={categories}
                        numColumns={2}
                        contentContainerStyle={styles.flatlistStyle}
                        renderItem={({ item }) => (
                            <TouchableOpacity activeOpacity={.9} style={styles.cardWrap} onPress={() => navigation.navigate('detail', { data: item })}>
                                <ImageBackground source={{ uri: item.thumb }} resizeMode='cover' style={styles.img} imageStyle={{ borderRadius: 20 }}>
                                    <LinearGradient
                                        // Background Linear Gradient
                                        colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.8)']}
                                        style={styles.gradationBg}
                                    />
                                </ImageBackground>
                                <View style={styles.textWrap}>
                                    <Text style={[{ fontSize: 11 }, styles.text]}>{item.dificulty} | {item.times}</Text>
                                    <Text numberOfLines={2} style={styles.text}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        onEndReachedThreshold={0.2}
                        onEndReached={() => fetchCategories(route.params.data.key)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Category;