import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { carsLocation } from "@/constants/carsPositions";

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
export const AffciherImage = ({ item, styles, mix, loading, setLoading }) => {
    const [car, setCar] = useState(item);
    const router = useRouter();
    // console.log('item dans AffciherImage', item);
    useEffect(() => {
        let itemWithLocation = getLocationUserCar(item.id);
        if (itemWithLocation) {
            setCar(prev => ({ ...prev, ...itemWithLocation }));
        }
    }, [item]);
    // console.log('item dans fonction AffciherImage ', itemWithLocation);
    return (
        <Pressable style={mix ? styles.imgCar2 : styles.imgCar} onPress={() => { router.push({ pathname: '/details', params: { item: JSON.stringify(car) } }) }}>
            {loading ?
                (<Image source={require('@/assets/images/loading-gif.webp')} style={styles.iconCarsImage}


                />)
                : <Image source={item.lien} style={mix ? styles.iconCarsImage2 : styles.iconCarsImage} onLoadEnd={() => setLoading(false)}

                />}
        </Pressable>
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

