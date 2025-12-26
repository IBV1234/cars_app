import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, cancelAnimation } from 'react-native-reanimated';
// const { height, width } = Dimensions.get('window');

export default function MotorAnimation({ height, left, widthImage,heightImage,startRotation }) {

    const TIME = 1500;
    const shakingValue = useSharedValue(0);


    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: shakingValue.value },
            {rotate: `${shakingValue.value}deg`}
        ],
    }));

    useEffect(() => {

        if(startRotation){
          shakingValue.value = withRepeat(
            withTiming(10, { // vas à + 10 px
                duration: 50,
                //easing:Easing.inOut(Easing.quad) //commence l’animation lentement, puis accélérer un peu et ralentir à nouveau vers la fin.
            }),
            -1, // -1 = répéter à l'infinie /1 = une fois / 2 = deux fois
            true, // revien à -10 px
        )

        const timer = setTimeout(() => {
            cancelAnimation(shakingValue);
            shakingValue.value  = withTiming(0, { // revient au centre
                duration: TIME,
            });
        }, 6000);

        return () => {
            clearTimeout(timer);
        }
      }
    }, [startRotation])



    return (


        <View style={{ alignSelf: 'center', position: 'relative', }}>
            <Animated.View style={[animatedStyles, { position: 'absolute', top: height ,left:left}]}>

                <Image source={require("../app/(tabs)/games/images/hellcat_motot.png")} style={{
                    width: widthImage ? widthImage : 100,
                    height: heightImage ? heightImage : 100,
                }} resizeMode="cover" />
            </Animated.View>

        </View>

    )
}
