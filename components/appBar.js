import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { popBold } from '../helper/helper';
import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

const AppBar = ({ data, back, detail, title }) => {
    let dispatch = useDispatch()
    let currentLikes = useSelector(i => i.reducerFavorite)

    const likeButton = async (second) => {
        if (currentLikes.includes(data)) {
            dispatch({ type: 'REMOVEFAV', payload: data })
        }
        else {
            dispatch({ type: 'ADDFAV', payload: data })
        }
    }

    const styles = {
        prodWrap: {
            width: '93%',
            alignSelf: 'center',
            height: '8%',
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        prodText: {
            width: '85%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        headerWrap: {
            width: '93%',
            alignSelf: 'center',
            height: '8%',
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        headerText: {
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start'
        },
        headerFont: {
            fontSize: 16,
            fontFamily: popBold
        }
    }

    return (
        detail == 'product' ?
            <View style={styles.prodWrap}>
                <Icon name='arrow-back' size={20} style={{ marginRight: 0 }} onPress={() => back.goBack()} />
                <View style={styles.prodText}>
                    <Text numberOfLines={1} style={styles.headerFont}>{data.title}</Text>
                </View>
                <Icon name={currentLikes.includes(data) ? 'favorite' : 'favorite-outline'} size={20} onPress={() => likeButton()} />
            </View>
            :
            detail == 'categories' ?
                <View style={styles.headerWrap}>
                    <Icon name='arrow-back' size={20} style={{ marginRight: 10 }} onPress={() => back.goBack()} />
                    <View style={styles.headerText}>
                        <Text numberOfLines={1} style={styles.headerFont}>{title}</Text>
                    </View>
                </View>
                :
                detail == 'search' ?
                    <View style={styles.headerWrap}>
                        <Icon name='arrow-back' size={20} style={{ marginRight: 10 }} onPress={() => back.goBack()} />
                        <View style={styles.headerText}>
                            <Text numberOfLines={1} style={styles.headerFont}>{title}</Text>
                        </View>
                    </View>
                    :
                    detail == 'likes' ?
                        <View style={styles.headerWrap}>
                            <View style={styles.headerText}>
                                <Text numberOfLines={1} style={styles.headerFont}>{title}</Text>
                            </View>
                        </View>
                        : detail == 'cook' ?
                            <View style={styles.headerWrap}>
                                <View style={styles.headerText}>
                                    <Text numberOfLines={1} style={styles.headerFont}>{title}</Text>
                                </View>
                            </View>
                            :
                            detail == 'cookDetail' ?
                                <View style={styles.headerWrap}>
                                    <View style={styles.headerText}>
                                        <Text numberOfLines={1} style={styles.headerFont}>{title}</Text>
                                    </View>
                                </View>
                                : null
    );
}

export default AppBar;