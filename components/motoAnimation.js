import React, { useEffect } from 'react';
import { View, Image, Dimensions } from 'react-native';

import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, cancelAnimation, Easing } from 'react-native-reanimated';
const { height, width } = Dimensions.get('window');

export default function MotorAnimation({ height, left, widthImage, heightImage, startRotation, finishAnimation = false }) {

    const TIME = 1500;
    const shakingValue = useSharedValue(0);
    const linearMouvement = useSharedValue(0);


    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: shakingValue.value },
        { rotate: `${shakingValue.value}deg` }
        ],
    }));
    const animatedStylesDisseapeared = useAnimatedStyle(() => ({
        transform: [{ translateX: linearMouvement.value }],
    }));

    useEffect(() => {

        if (startRotation && !finishAnimation) {
            shakingValue.value = withRepeat(
                withTiming(10, { // vas à + 10 px
                    duration: 50,
                    // easing:Easing.inOut(Easing.quad) 
                }),
                -1, // -1 = répéter à l'infinie /1 = une fois / 2 = deux fois
                true, // revien à -10 px
            )

            const timer = setTimeout(() => {
                cancelAnimation(shakingValue);
                shakingValue.value = withTiming(0, { // revient au centre
                    duration: TIME,
                });
            }, 6000);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [startRotation,finishAnimation])

    useEffect(() => {
        console.log("finishAnimation", finishAnimation)
        if (finishAnimation && !startRotation) {
            linearMouvement.value = withTiming(-width, {
                    duration: 1000,
                    easing: Easing.linear ,
                   
                },//(finished) =>{
                //     if(finished){
                //         reposiTionsAnim();
                //     }
                // }
            )

        }

    }, [finishAnimation,startRotation])

    const reposiTionsAnim = () => {
        cancelAnimation(linearMouvement);
        linearMouvement.value = withTiming(0, { // revient au centre
            duration: 800,
            easing: Easing.out(Easing.ease)
        });
    }


    return (


        <View style={{ alignSelf: 'center', position: 'relative', }}>
            <Animated.View style={[finishAnimation ? animatedStylesDisseapeared : animatedStyles, { position: 'absolute', top: height, left: left }]}>

                <Image source={require("../app/(tabs)/games/images/hellcat_motot.png")} style={{
                    width: widthImage ? widthImage : 100,
                    height: heightImage ? heightImage : 100,
                }} resizeMode="cover" />
            </Animated.View>

        </View>

    )
}
