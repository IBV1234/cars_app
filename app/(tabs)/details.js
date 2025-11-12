import React, { useContext, useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Link, useLocalSearchParams ,useRouter} from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Dimensions, Pressable, Image, ScrollView } from "react-native";


import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedText } from '@/components/ThemedText';
import { Collapsible } from '@/components/Collapsible';
import { Buttons } from '@/components/custom/custom';

import { UserContex } from './connection';
import { LikeContext } from './acceuil';

import { toogleLike, addLink, formatNumberWithThousandsSeparator } from '@/fonctions/fonctions';
import { carsLocation } from "@/constants/carsPositions";

import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { db } from "./index";


const { height, width } = Dimensions.get("window");

export default function Details() {
    const { item } = useLocalSearchParams();
    const car = item ? JSON.parse(item) : null;

    const { user, setUser } = useContext(UserContex);
    const { likeIds, setLikeIds } = useContext(LikeContext)
    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState(carsLocation);
    

    
    useEffect(() => {
    }, [item]);

      useEffect(() => {
        console.log('Car data:', car);  
    }, [car]);
    const func =()=>{
        console.log('ok');

        return null;
    }
    
    
    return (
        <LinearGradient style={styles.container}
            colors={['rgba(27, 26, 26, 0.8)', 'rgba(255, 247, 247, 0.5)']} // Rouge en haut, noir en bas
            start={{ x: 0.5, y: -1 }}
            end={{ x: 0.5, y: 2 }}>

            <ScrollView style={{ flex: 1 }} showsHorizontalScrollIndicator={true}>

                <View style={styles.containerProfil}>
                    <LinearGradient style={styles.ContainerArrow}
                        colors={['rgba(218, 5, 5, 0.8)', 'rgba(0, 0, 0, 0.5)']} // Rouge en haut, noir en bas
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.1, y: 1.2 }}>
                        <Link href={"/acceuil"} >
                            <View >
                                <FontAwesome name="arrow-left" size={25} color="white" />
                            </View>
                        </Link>
                    </LinearGradient>
                </View>

                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", position: 'relative', marginTop: -20 }} onPress={() => { console.log('map') }}>
                    <Text style={styles.locationText}>Détail voiture</Text>
                    <Pressable style={{
                        position: 'absolute', right: 15, shadowColor: 'black',
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: 2,
                        shadowRadius: 2,
                    }}
                     onPress={() => {
                        toogleLike(car.id, setLikeIds);
                    }}>
                        {likeIds.has(car.id) ? (<AntDesign name={'heart'} size={27} color="#B22222" />) : (<AntDesign name={'heart'} size={27} color="#ffffffff" />)}
                    </Pressable>
                </View>


                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.title}>{car.name}</Text>
                </View>


                <View style={{ alignSelf: 'center', gap: 10 }}>
                    <Image source={car.image} style={styles.containerImage} />
                    <Text style={{ alignSelf: 'center', fontSize: 20, color: 'gold' }}>{formatNumberWithThousandsSeparator(car.price)} $</Text>
                </View>

                <View style={styles.containerOptions}>
                    <ScrollView showsHorizontalScrollIndicator={true} horizontal={true} contentContainerStyle={{ flexDirection: 'row', alignItems: "center", gap: 30 }}>
                        <View style={styles.Options}>
                            <MaterialCommunityIcons name="horse-variant" size={28} color="black" />
                            <Text >Horse power: {car.hp} </Text>
                        </View>

                        <View style={styles.Options}>
                            <MaterialIcons name="speed" size={28} color="black" />
                            <Text>Top speed: {car.topSpeed}</Text>
                        </View>
                        <View style={styles.Options}>
                            <Feather name="user" size={30} color="black" />
                            <Text>{car.seats}</Text>
                        </View>
                        <View style={styles.Options}>
                            <Feather name="user" size={28} color="black" />
                            <Text>Type de voiture: {car.typeCar}</Text>
                        </View>
                    </ScrollView>

                </View>
                <Collapsible style={{ backgroundColor: 'rgba(95, 91, 91, 0)' }} title="Déscription">

                    <ThemedText style={{ backgroundColor: 'rgba(95, 91, 91, 0)', color: 'black' }}>
                        {car.description}
                    </ThemedText>
                </Collapsible >
                <View style={{ marginTop: 40 }}>
                    <Buttons text={'Voir voiture sur la map'} fonction={func} userouter={true} carData={car} />

                </View>

            </ScrollView>
        </LinearGradient>


    )

}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: "black",
        flexDirection: 'column',
        gap: 15,
    },
    ContainerArrow: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginTop: 10,
        width: 50,
        height: 50,
    },
    containerProfil: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.04,
        marginLeft: width * 0.05,
    },
    containerImage: {
        height: height * 0.30,
        width: width * 0.95,
        objectFit: 'contain',
        borderWidth: 0.5,
        borderRadius: 20,
        borderColor: 'black',
        backgroundColor: 'rgba(112, 108, 108, 0.5)',

    },
    text: {
        fontSize: 14,
        color: 'white',
    },
    textCar: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        paddingLeft: 5
    },
    title: {
        fontSize: 20,
        color: 'black',
    },

    locationText: {
        marginLeft: 8,
        textAlign: "center",
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
    },

    ContainerCarsImg: {
        marginTop: 8,
        flexDirection: 'row',
        borderRadius: 20,
        flexWrap: 'wrap',
        backgroundColor: 'rgba(111, 7, 7, 0.2)',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 2,
        shadowRadius: 2,
        position: 'relative',
        // borderWidth: 1,
        // borderColor: 'white'
    },
    iconCarsImage: {
        width: width * 0.45,
        height: height * 0.18,
        resizeMode: 'contain',
        borderRadius: 25,
    },
    containerOptions: {
        padding: 15,
        width: width * 0.95,
        height: height * 0.20,
        alignSelf: 'center'
    },
    Options: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        width: width * 0.38,
        height: height * 0.15,
        marginHorizontal: 5,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'black',

    }

});
