import React, {useEffect } from 'react';
import { View,Image } from 'react-native';

import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';
// const { height, width } = Dimensions.get('window');

export default function CarAnimation({height}) {

    const DURATION = 1500;

    const startX = 100;   // position à droite
    const left = -106.5;    // position à gauche
    
    
    const inOutAnim = useSharedValue(startX);


    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: inOutAnim.value }],
    }));

    useEffect(() => {
        inOutAnim.value = withRepeat(
            withTiming(left, {
                duration: DURATION,
                //easing:Easing.inOut(Easing.quad) //commence l’animation lentement, puis accélérer un peu et ralentir à nouveau vers la fin.
            }),
            -1, // -1 = répéter à l'infinie /1 = une fois / 2 = deux fois
            true ,
            "never"// true =indique si l’animation doit revenir en arrière après chaque répétition/ false = joue l’animation puis recommence depuis le début
        )
    }, [])



    return (


            <View style={{ alignSelf: 'center', position: 'relative', }}>
                <Animated.View style={ [animatedStyles,{  position: 'absolute',top: height}]}>

                    <Image source={ require("../gifs/animation-car.gif")} style={{
                        width: 200,
                        height: 100,
                    }} resizeMode="cover" />
                </Animated.View>

            </View>
            
    )
}
