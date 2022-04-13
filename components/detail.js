import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from "react/cjs/react.development";
import { baseURL, fetchData, popBold, popRegular } from "../helper/helper";
import AppBar from "./appBar";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ReadMore from '@fawazahmed/react-native-read-more';
import { useDispatch, useSelector } from "react-redux";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

const Detail = ({ navigation, route }) => {
    const [recipe, setRecipe] = useState({})
    let dispatch = useDispatch()
    let currentCook = useSelector(i => i.reducerCook)

    const getData = async (key) => {
        let data = await fetchData('/api/recipe/' + key)
        console.log(data)
        setRecipe(data.results)
    }

    const cookFood = (second) => {
        let check = currentCook.map(i => {
            if (i.title == recipe.title) {
                console.log('udah adaaa!!')
                return false
            }
        })
        if (check[0] == false) {
            SheetManager.show("alert_sheet");
            return
        }

        let obj = {
            author: recipe.author,
            desc: recipe.desc,
            dificulty: recipe.dificulty,
            ingredient: recipe.ingredient,
            needItem: recipe.needItem,
            servings: recipe.servings,
            step: recipe.step,
            title: recipe.title,
            thumb: route.params.data.thumb,
            times: route.params.data.times,
        }
        dispatch({ type: 'ADDCOOK', payload: obj })
        navigation.navigate('cookDetail', { data: recipe, img: route.params.data.thumb })
    }

    useEffect(() => {
        console.log(route)
        getData(route.params.data.key)
    }, [])

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
            height: '92%'
        },
        scrlView: {
            width: '100%',
            height: '100%'
        },
        scrlViewCont: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        img: {
            width: '90%',
            height: 250,
            borderRadius: 10,
            marginVertical: 10
        },
        detailWrap: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        detailText: {
            fontFamily: popRegular,
            letterSpacing: .7,
            color: 'white'
        },
        lvl: {
            backgroundColor: recipe.dificulty == 'Mudah' ? '#4ed44e' : recipe.dificulty == 'Cukup rumit' ? '#d0d44e' : '#d44e4e',
            minWidth: '25%',
            paddingHorizontal: 6,
            paddingVertical: 3,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 5,
            marginRight: 10,
            marginBottom: 10
        },
        timeAndServe: {
            backgroundColor: '#4ed44e',
            minWidth: '25%',
            paddingHorizontal: 6,
            paddingVertical: 3,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 5,
            marginRight: 10,
            marginBottom: 10
        },
        detailHeaderWrap: {
            width: '100%',
            height: 50,
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'flex-start'
        },
        descTitle: {
            fontSize: 18,
            fontFamily: popBold
        },
        descText: {
            fontFamily: popRegular,
            fontSize: 16,
            color: 'black',
        },
        ingreListText: {
            fontSize: 15,
            fontFamily: popRegular
        },
        recipeWrap: {
            display: 'flex',
            flexDirection: 'row'
        },
        recipeList: {
            width: 100,
            height: 150,
            backgroundColor: 'white',
            elevation: 4,
            padding: 5,
            borderRadius: 7,
            marginRight: 20
        },
        recipeImg: {
            width: '90%',
            height: '50%',
            borderRadius: 2,
            marginVertical: 10
        },
        needItemText: {
            color: 'black',
            fontFamily: popRegular
        },
        startWrap: {
            width: '100%',
            height: 80,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 5,
        },
        startBtn: {
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
        btnText: {
            color: 'white',
            fontFamily: popBold,
            fontSize: 20
        },
        alertWrap: {
            height: 150,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <AppBar data={route.params.data} like={true} back={navigation} detail='product' />
                <View style={styles.wrapper}>
                    <ScrollView style={styles.scrlView} contentContainerStyle={styles.scrlViewCont}>
                        <Image source={{ uri: route.params.data.thumb }} style={styles.img} />
                        <View style={{ width: '90%' }}>
                            {
                                recipe.ingredient &&
                                <>
                                    <Text style={{ fontFamily: popBold, fontSize: 20 }}>{recipe.title}</Text>
                                    <View style={styles.detailWrap}>
                                        <View style={styles.lvl}>
                                            <Text style={styles.detailText}><Icon name="fire" size={16} />{recipe.dificulty}</Text>
                                        </View>
                                        <View style={styles.timeAndServe}>
                                            <Text style={styles.detailText}><Icon name="clock-time-four-outline" size={16} /> {recipe.times}</Text>
                                        </View>
                                        <View style={styles.timeAndServe}>
                                            <Text style={styles.detailText}><Icon name="silverware-fork-knife" size={16} /> {recipe.servings}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.detailHeaderWrap}>
                                        <Text style={styles.descTitle}>
                                            Description
                                        </Text>
                                    </View>
                                    <ReadMore numberOfLines={4} style={styles.descText} seeLessStyle={{ color: '#56BF6D' }} seeMoreStyle={{ color: '#56BF6D' }}>
                                        {recipe.desc}
                                    </ReadMore>
                                    <View style={styles.detailHeaderWrap}>
                                        <Text style={styles.descTitle} onPress={() => navigation.goBack()}>
                                            Ingredients ({recipe.ingredient.length})
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%', }}>
                                        {
                                            recipe.ingredient.map((i, id) => (
                                                <Text key={id} style={styles.ingreListText}>- {i}</Text>
                                            ))
                                        }
                                    </View>
                                </>
                            }
                            {
                                recipe.needItem &&
                                <>
                                    <View style={styles.detailHeaderWrap}>
                                        <Text style={{ fontSize: 18, fontFamily: popBold }}>
                                            Item needed
                                        </Text>
                                    </View>
                                    <View style={styles.recipeWrap}>
                                        {
                                            recipe.needItem.map((i, id) => (
                                                <View key={id} style={styles.recipeList}>
                                                    <Image source={{ uri: i.thumb_item }} resizeMode='contain' style={styles.recipeImg} />
                                                    <Text numberOfLines={2} style={styles.needItemText}>{i.item_name}</Text>
                                                </View>
                                            ))
                                        }
                                    </View>
                                    <View style={{ width: '90%', }}>
                                        <View style={styles.detailHeaderWrap}>
                                            <Text style={{ fontSize: 18, fontFamily: popBold }}>
                                                Steps needed ({recipe.step.length})
                                            </Text>
                                        </View>
                                        <View style={{ display: 'flex', }}>
                                            {
                                                recipe.step.map((i, id) => (
                                                    id < 3 &&
                                                    <Text key={id} style={styles.needItemText} numberOfLines={id == 2 ? 2 : null}>{i}</Text>
                                                ))
                                            }
                                        </View>
                                    </View>
                                    <View style={styles.startWrap}>
                                        <TouchableOpacity onPress={() => cookFood()} activeOpacity={.8} style={styles.startBtn}>
                                            <Text style={styles.btnText}>Start Cook! <Icon name="arrow-right" size={20} /></Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
            <ActionSheet id="alert_sheet" gestureEnabled={true}>
                <View style={styles.alertWrap}>
                    <Text style={{ fontFamily: popBold, fontSize: 16, textAlign: 'center' }}>You already have this food on progress.</Text>
                    <Text style={{ fontFamily: popRegular, fontSize: 14, textAlign: 'center' }}>Finish it first or delete it from cooking tab.</Text>
                </View>
            </ActionSheet>
        </SafeAreaView>
    );
}

export default Detail;