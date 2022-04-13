import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from '../components/home'
import TabNav from './components/tabs';
import Detail from './components/detail';
import Category from './components/category';
import Search from './components/search';
import * as Font from 'expo-font';
import CookDetail from './components/cookDetail';
import { combineReducers, createStore } from 'redux'
import { reducerFavorite, reducerCook, reducerCookSteps } from './redux/reducer';
import { Provider } from 'react-redux';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [loadFont, setLoadFont] = useState(false)
  const rootReducer = combineReducers({
    reducerFavorite,
    reducerCook,
    reducerCookSteps
  })
  let store = createStore(rootReducer)

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        // Load a font `Montserrat` from a static resource
        popRegular: require('./assets/fonts/Poppins-Regular.ttf'),
        popBold: require('./assets/fonts/Poppins-Bold.ttf'),
      });
      setLoadFont(true)
    }
    loadFonts()
  }, [])


  return (
    loadFont &&
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="tabs" component={TabNav} options={{ headerShown: false }} />
          <Stack.Screen name="search" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="cookDetail" component={CookDetail} options={{ headerShown: false }} />
          <Stack.Screen name="detail" component={Detail} options={{ headerShown: false }} />
          <Stack.Screen name="category" component={Category} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
