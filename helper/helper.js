import { TouchableOpacity, ImageBackground, View, Text } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';

export const baseURL = 'https://masak-apa.tomorisakura.vercel.app'
export const popRegular = 'popRegular'
export const popBold = 'popBold'

export const fetchData = async (key) => {
    let data = await fetch(baseURL + key)
    let json = await data.json()
    return json
}

export const ProductCard = ({ item }) => {
    return <TouchableOpacity activeOpacity={.9} style={{ margin: 5, width: '45%', borderRadius: 10, marginBottom: 20, }} onPress={() => navigation.navigate('detail', { data: i })}>
        <ImageBackground source={{ uri: item.thumb }} resizeMode='cover' style={{ width: '100%', height: 250, }} imageStyle={{ borderRadius: 20 }}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.8)']}
                style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 100, borderRadius: 20 }}
            />
        </ImageBackground>
        <View style={{ bottom: 10, left: 10, position: 'absolute', width: '85%' }}>
            <Text style={{ fontSize: 12, color: 'white', fontFamily: popRegular }}>{item.dificulty} | {item.times}</Text>
            <Text numberOfLines={2} style={{ fontSize: 16, color: 'white', fontFamily: popRegular }}>{item.title}</Text>
        </View>
    </TouchableOpacity>
}