import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, TouchableOpacity, FlatList, StatusBar, Image } from 'react-native';
import React, { useEffect, useState } from 'react'
import { popBold, popRegular } from '../helper/helper';
// import CollapsibleView from "@eliav2/react-native-collapsible-view";
import IconAnt from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux';
import AppBar from './appBar';

const CookDetail = ({ navigation, route }) => {
    const [stepsDone, setStepsDone] = useState(false)
    let steps = useSelector(i => i.reducerCookSteps)
    let dispatch = useDispatch()

    const checkStep = (params) => {
        if (steps.includes(params)) {
            dispatch({ type: 'REMOVESTEP', payload: params })
            // let copy = stepsDone.filter(i => i !== params)
            // setStepsDone(copy)
        }
        else {
            dispatch({ type: 'ADDSTEP', payload: params })
            // stepsDone ? setStepsDone(e => [...e, params]) : setStepsDone(params)
        }
    }

    const finishCook = (second) => {
        dispatch({ type: 'FINISHCOOK', payload: route.params.data })
        navigation.navigate('tabs', { screen: 'cook' })
    }

    useEffect(() => {
        for (let i of route.params.data.step) {
            if (!steps.includes(i)) {
                setStepsDone(false)
                return
            }
        }
        setStepsDone(true)
    }, [steps])

    const styles = {
        container: {
            backgroundColor: '#FAFCFE',
            height: '100%'
        },
        wrapper: {
            height: '100%'
        },
        headerWrap: {
            width: '90%',
            alignSelf: 'center',
            paddingVertical: 20,
            height: 'auto',
        },
        img: {
            height: 100,
            borderRadius: 5,
            marginBottom: 10
        },
        stepWrap: {
            width: '90%',
            height: 'auto',
            alignSelf: 'center',
        },
        stepText: {
            fontFamily: popBold,
            fontSize: 20,
            letterSpacing: 1
        },
        listWrap: {
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start'
        },
        listCard: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderRadius: 5,
            paddingHorizontal: 5,
            paddingVertical: 5,
            marginBottom: 10,
        },
        listText: {
            width: '90%',
            fontFamily: popRegular,
        },
        finishWrap: {
            width: '100%',
            height: 70,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 5
        },
        finishBtn: {
            width: '60%',
            backgroundColor: '#0E0E0E',
            paddingHorizontal: 20,
            paddingVertical: 10,
            elevation: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20
        },
        finishText: {
            color: 'white',
            fontFamily: popBold,
            fontSize: 20
        }
    }

    return (
        <View style={styles.container}>
            {/* <AppBar title='COOKING STEPS' detail={'cookDetail'} /> */}
            <View style={styles.wrapper}>
                <ScrollView>
                    <View style={styles.headerWrap}>
                        <Image source={{ uri: route.params.fromTabCook ? route.params.data.thumb : route.params.img }} style={styles.img} resizeMode='contain' />
                        <Text numberOfLines={1} style={{ fontFamily: popRegular, }}>{route.params.data.title}</Text>
                    </View>
                    <View style={styles.stepWrap}>
                        <View >
                            <Text style={styles.stepText}>STEPS</Text>
                        </View>
                        <View style={styles.listWrap}>
                            {
                                route.params.data.step.map((i, idx) => (
                                    <TouchableOpacity activeOpacity={.8} key={idx} onPress={() => checkStep(i)} style={[styles.listCard, { backgroundColor: steps.includes(i) ? '#4fc26c' : 'transparent', borderWidth: steps.includes(i) ? 0 : 1, borderColor: '#56BF6D' }]}>
                                        <Text style={[styles.listText, { color: steps.includes(i) ? 'white' : 'black' }]}>{idx + 1}. {i.substr(2)}</Text>
                                        <IconAnt name='checkcircleo' color={steps.includes(i) ? '#00ff16' : 'black'} size={16} style={{ paddingTop: 5 }} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                    {
                        stepsDone &&
                        <View style={styles.finishWrap}>
                            <TouchableOpacity activeOpacity={.8} onPress={() => finishCook()} style={styles.finishBtn}>
                                <Text style={styles.finishText}>Finish!</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </ScrollView>
            </View>
        </View>
    );
}

export default CookDetail;