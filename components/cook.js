import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, TouchableOpacity, FlatList, StatusBar, Image } from 'react-native';
import React from 'react'
import AppBar from './appBar';
import { useSelector } from 'react-redux';
import { popBold, popRegular } from '../helper/helper';

const Cook = ({ navigation }) => {
    let cooks = useSelector(i => i.reducerCook)

    const styles = {
        container: {
            height: '100%',
            width: '100%',
            backgroundColor: '#FAFCFE'
        },
        wrapper: {
            width: '93%',
            alignSelf: 'center'
        },
        cardWrap: {
            width: '100%',
            borderRadius: 5,
            borderColor: '#56BF6D',
            borderWidth: 1,
            padding: 5,
            marginVertical: 10,
            display: 'flex',
            alignItems: 'center'
        },
        headWrap: {
            width: '30%',
            display: 'flex',
            alignItems: 'center',
            marginBottom: 10
        },
        img: {
            width: 150,
            minHeight: 100,
            borderRadius: 10
        },
        textBelowImg: {
            display: 'flex',
            flexDirection: 'row'
        },
        textBelowImgStyle: {
            fontFamily: popRegular,
            fontSize: 12
        },
        titleWrap: {
            width: '75%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        titleText: {
            fontFamily: popRegular
        },
        stepWrap: {
            width: '100%',
            marginVertical: 10
        },
        stepStyle: {
            fontFamily: popBold,
            fontSize: 20
        },
        stepText: {
            fontFamily: popRegular
        },
        noFoodWrap: {
            height: 80,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        noFoodStyle: {
            fontFamily: popRegular,
            fontSize: 16
        }
    }

    return (
        <View style={styles.container}>
            <AppBar detail={'cook'} title='ON COOKING' />
            <ScrollView>
                <View style={styles.wrapper}>
                    {
                        cooks.length ?
                            cooks.map((i, id) => (
                                <TouchableOpacity key={id} activeOpacity={.8} style={styles.cardWrap} onPress={() => navigation.navigate('cookDetail', { data: i, fromTabCook: true })}>
                                    <View style={styles.headWrap}>
                                        <Image source={{ uri: i.thumb }} style={styles.img} resizeMode='contain' />
                                        <View style={styles.textBelowImg}>
                                            <Text style={styles.textBelowImgStyle}>{i.times} | </Text>
                                            <Text style={styles.textBelowImgStyle}>{i.dificulty}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.titleWrap}>
                                        <Text style={styles.titleText} numberOfLines={1}>{i.title}</Text>
                                    </View>
                                    <View style={styles.stepWrap}>
                                        <Text style={styles.stepStyle}>STEPS</Text>
                                    </View>
                                    <View>
                                        {
                                            i.step.map((i, id) => (
                                                id < 3 &&
                                                <Text key={id} style={styles.stepText} numberOfLines={id == 2 ? 2 : null}>{i}</Text>
                                            ))
                                        }
                                    </View>
                                </TouchableOpacity>
                            ))
                            :
                            <View style={styles.noFoodWrap}>
                                <Text style={styles.noFoodStyle}>No food is being made right now..</Text>
                            </View>
                    }
                </View>
            </ScrollView>
        </View>
    );
}

export default Cook;