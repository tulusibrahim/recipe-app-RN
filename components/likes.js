import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, TouchableOpacity, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import AppBar from "./appBar";
import { popRegular } from '../helper/helper';

const Likes = ({ navigation }) => {
    let likes = useSelector(i => i.reducerFavorite)

    const style = {
        wrapper: {
            width: '100%',
            height: '100%',
            backgroundColor: '#FAFCFE',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
        },
        cardWrap: {
            padding: 5,
            width: '93%',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#56BF6D',
            marginVertical: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        img: {
            width: 100,
            height: 100,
            marginRight: 10,
            borderRadius: 10
        },
        textWrap: {
            width: '65%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        emptyList: {
            height: '10%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        emptyText: {
            fontFamily: popRegular,
            fontSize: 20
        }
    }

    return (
        <SafeAreaView>
            <View style={style.wrapper}>
                <AppBar detail={'likes'} title={'LIKES'} />
                <View style={style.wrapper}>
                    {
                        likes.length ?
                            likes.map((i, id) => (
                                <TouchableOpacity key={id} activeOpacity={.9} style={style.cardWrap} onPress={() => navigation.navigate('detail', { data: i })}>
                                    <>
                                        <View style={{ width: '30%', }}>
                                            <Image source={{ uri: i.thumb }} style={style.img} resizeMode='contain' />
                                        </View>
                                        <View style={style.textWrap}>
                                            <Text style={{ fontFamily: popRegular }}>{i.title}</Text>
                                        </View>
                                    </>
                                </TouchableOpacity>
                            ))
                            :
                            <View style={style.emptyList}>
                                <Text style={style.emptyText}>No Liked recipe so far..</Text>
                            </View>
                    }
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Likes;