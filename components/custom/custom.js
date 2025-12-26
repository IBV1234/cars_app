import { carsLocation } from "@/constants/carsPositions";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const Buttons = ({ text, fonction, userouter = false, carData = null }) => {
    const router = useRouter();


    return (

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Pressable
                style={{ marginTop: 10 }}
                onPress={() => {
                    return userouter && carData
                        ? router.push({ pathname: '/carsMap', params: { item: JSON.stringify(carData) } })
                        : fonction();
                }}
            >
                <LinearGradient
                    style={styles.boutton}
                    colors={['rgba(218, 5, 5, 0.8)', 'rgba(0, 0, 0, 0.5)']} // Rouge en haut, noir en bas
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.1, y: 1.2 }}>
                    <Text style={styles.text}>{text}</Text>

                </LinearGradient>
            </Pressable>


        </View>
    )
}
const getLocationUserCar = (id) => {
    return carsLocation.find((data) => data.id === id);


};
export const ShowCars = ({ item, styles, mix, loading, setLoading }) => {
    const [car, setCar] = useState(item);
    const router = useRouter();
    // console.log('item dans AffciherImage', item);
    useEffect(() => {
        let itemWithLocation = getLocationUserCar(item.id);
        if (itemWithLocation) {
            setCar(oldData => ({ ...oldData, ...itemWithLocation }));
        }
    }, [item]);
    // console.log('item dans fonction AffciherImage ', itemWithLocation);
    let images = [];
    if (item.lien) images.push(item.lien);
    if (item.image) images.push(item.image);
    if (item.image2) images.push(item.image2);
    images = images.filter((value, index, self) => self.indexOf(value) === index) // self: le tableau au complet self.indexOf(value): l'index de value dans self || retire les doublons
    return (
        <Pressable style={mix ? styles.imgCar2 : styles.imgCar}

            onPress={() => {
                router.push(
                    {
                        pathname: '/details',
                        params: { item: JSON.stringify(car) }
                    })
            }}>

            {loading ?
                (<Image source={require('@/assets/images/loading-gif.webp')} style={styles.iconCarsImage}


                />)
                : <View >
                    {images.map((imSrc, index) => (
                        <Image key={index}
                            source={imSrc}
                            style={styles.iconCarsImage}
                            onLoadEnd={() => setLoading(false)}
                            resizeMethod='cover'
                        />

                    ))}

                </View>

            }
        </Pressable>
    )
}

export const AnimatadeBoutton = ({ text, fonction, style }) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                onPressIn={() => { scale.value = withSpring(0.9); }}
                onPressOut={() => {
                    scale.value = withSpring(1); // withSpring(1, { damping: 10, stiffness: 200 }stiffness pour un retour plus rapide damping pour réduire les sauts
                    ; fonction();
                }}
                style={style ? style : [styles.boutton, { backgroundColor: 'rgba(218, 5, 5, 0.8)', alignSelf: 'center' }]}
            >
                <Text style={{ color: 'white', fontSize: 15, alignSelf: 'center' }}>{text}</Text>
            </Pressable>
        </Animated.View>
    )
}


export const DisplayRandomImage = ({ linkImage, styles }) => {

    return (
        <View >
            <Image
                source={linkImage}
                style={styles.motorImage}
                resizeMethod='cover'
            />

        </View>


    )
}

const styles = StyleSheet.create({
    boutton: {
        borderRadius: 20,
        width: 230,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,

    },
    text: {
        alignContent: 'center',
        fontSize: 15,
        color: 'white',
    }

});




