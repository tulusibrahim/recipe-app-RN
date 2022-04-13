import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconI from 'react-native-vector-icons/MaterialIcons'
import Iconn from 'react-native-vector-icons/Fontisto'
import Home from './home';
import Search from './search';
import React from 'react'
import Article from './article';
import Likes from './likes';
import Cook from './cook';
import { useSelector } from 'react-redux';
const TabNav = () => {
    const Tab = createBottomTabNavigator();
    let likes = useSelector(i => i.reducerFavorite)
    let cooks = useSelector(i => i.reducerCook)
    return (
        // <NavigationContainer>
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }} >
            <Tab.Screen name="home" component={Home} options={{ tabBarIcon: () => <Icon name='home-variant-outline' size={28} /> }} />
            <Tab.Screen name="cook" component={Cook} options={{ tabBarIcon: () => <IconI name='local-fire-department' size={24} />, tabBarBadge: cooks.length ? cooks.length : null }} />
            <Tab.Screen name="likes" component={Likes} options={{ tabBarIcon: () => <IconI name='favorite' size={24} />, tabBarBadge: likes.length ? likes.length : null }} />
            {/* <Tab.Screen name="article" component={Article} options={{ tabBarIcon: () => <IconI name='article' size={24} /> }} /> */}
        </Tab.Navigator>
        // </NavigationContainer>
    );
}

export default TabNav;