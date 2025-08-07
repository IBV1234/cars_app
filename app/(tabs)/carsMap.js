
import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useRouter, Link, } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { carsLocation } from "@/constants/carsPositions";

import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Text, View, Image, Dimensions, Pressable, ScrollView, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getLocation } from '../../fonctions/fonctions';
import { UserContex } from './connection';
import { Buttons } from '@/components/custom/custom';
import MapView, { Marker } from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export default function CarsMap() {

    const { user } = useContext(UserContex);
    const [region, setRegion] = useState({ latitude: 0, longitude: 0, latitudeDelta: 0.01, longitudeDelta: 0.01 })
    const [showInfoUser, setShowInfoUser] = useState(false);
    const [dealerUser, setDealertUser] = useState({
        id: null,
        ownerName: "",
        name: "",
        image: null,
        city: "",
        phone: "",
        email: "",
        location: {
            latitude: 0,
            longitude: 0,
        },

    });


    const [cars, setCars] = useState(carsLocation);
    const router = useRouter();
    const mapRef = useRef(null);
    const houseRef = useRef(null);
    const markerRefs = useRef([null, null]); // refs pour markers

    const fetchLocation = async () => {
        const userLocation = await getLocation();
        if (userLocation) {

            const positionInitiale = {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }


            setRegion(positionInitiale)//nouvelle valeur, déclenche re-render

            houseRef.current = positionInitiale;

            if (mapRef.current) {
                mapRef.current.animateToRegion(userLocation, 1000)// anime vers la  position
            }
        }

    }

    const getLocationUserCar = (id) => {
        const car = cars.find((data) => data.id === id);
        if (car && mapRef.current) {
            mapRef.current.animateToRegion(
                {
                    latitude: car.location.latitude,
                    longitude: car.location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
                1000
            );
        }
    };

    const getDefaultLocationUserCar = (id = 5) => {
        const car = cars.find((data) => data.id === id);
        if (car) {
            return car;
        }
        return undefined;
    };




    useEffect(() => {

        if (region.latitude === 0 && region.longitude === 0) {
            fetchLocation();

        }
    }, [])

    useFocusEffect(

        useCallback(() => {
            setShowInfoUser(false)
            const car = getDefaultLocationUserCar();
            setDealertUser({ ...dealerUser, ...car });

            if (mapRef.current) {
                mapRef.current.animateToRegion(houseRef.current, 1000)// anime vers la  position
            }
        }, []),
    )

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, position: 'relative' }}>
                {/* Bouton flèche au-dessus de la carte */}
                <LinearGradient
                    style={[styles.ContainerArrow, { position: 'absolute', left: -3, top: 5, zIndex: 10 }]}
                    colors={['rgba(218, 5, 5, 0.8)', 'rgba(0, 0, 0, 0.5)']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.1, y: 1.2 }}
                >
                    <Link href={"/acceuil"}>
                        <View>
                            <FontAwesome name="arrow-left" size={25} color="white" />
                        </View>
                    </Link>
                </LinearGradient>

                <MapView
                    style={styles.containerMap}
                    ref={mapRef}
                    initialRegion={region}
                    onRegionChangeComplete={(region) => { setRegion(region) }}
                >

                    {houseRef.current && (
                        <Marker
                            coordinate={{
                                latitude: houseRef.current.latitude,
                                longitude: houseRef.current.longitude
                            }}
                            title="Votre position"
                            description="House"
                        >
                            <Pressable style={{ alignItems: 'center' }}
                                onPress={() => { { setShowInfoUser(!showInfoUser) } }}>
                                <Image
                                    source={require('@/assets/images/home.png')}
                                    style={{ width: 20, height: 20 }}
                                    resizeMode="contain"
                                />
                            </Pressable>
                        </Marker>
                    )}
                    {cars && cars.map((data) => (

                        <Marker
                            key={data.id}
                            title={data.ownerName}
                            description={`Voiture située à ${data.city}`}
                            coordinate={data.location}
                            ref={(ref) => {
                                if (ref) markerRefs.current[data.id] = ref;
                            }}
                            pinColor="red"
                            onPress={() => {setDealertUser({ ...dealerUser, ...data });setShowInfoUser(false)}}
                        />

                    ))}

                    <View style={styles.containerMapOptions}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.25, paddingTop: 12, height: height * 0.11, width: width * 0.90, borderRadius: 30 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: 'auto', gap: 10 }}>


                                {showInfoUser ?
                                    (
                                        <Image source={{ uri: user.picture }} style={{
                                            width: width * 0.15,
                                            height: width * 0.15,
                                            borderRadius: (width * 0.15) / 2
                                        }} resizeMode="cover" />
                                    ) :
                                    (<Pressable style={{ flexDirection: 'row', alignItems: 'center', width: width * 0.10 }}
                                        onPress={() => {
                                            getLocationUserCar(dealerUser.id);
                                            setShowInfoUser(false);
                                        }}>

                                        <FontAwesome name="user" size={38} color="#8B0000" />
                                    </Pressable>
                                    )
                                }
                                <View>
                                    {
                                        showInfoUser ?
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{user.name}</Text>
                                            :
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{dealerUser.ownerName}</Text>
                                    }

                                </View>
                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', position: 'relative' }}>
                                <AntDesign name="phone" size={30} color="red" style={{ position: 'absolute', left: -width *0.15 }} />
                                <AntDesign name="message1" size={30} color="red" style={{ position: 'absolute', left: width*0.10 }} />
                            </View>



                        </View>
                        <View style={{ backgroundColor: ' rgba(255, 255, 255, 0.8)', height: height * 0.29, width: width * 0.97, borderRadius: 30 }}>
                            <ScrollView showsVerticalScrollIndicator={false} Vertical={true} contentContainerStyle={{ flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 20, marginTop: 20, gap: 10 }}>
                                <View style={{
                                    alignItems: 'center', borderBottomWidth: 0.5,
                                    marginRight: 16,
                                    borderColorBottom: 'black',
                                }}>

                                    <Image
                                        source={showInfoUser
                                            ? require('@/assets/images/porscheGt3Rs_car.png')
                                            : dealerUser.image
                                        }
                                        style={{
                                            width: width * 0.30,
                                            height: width * 0.30,
                                        }}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: 'black' }}>
                                    {showInfoUser ? ` Vous: ${user.name}` : `Nom: ${dealerUser.ownerName}`}
                                </Text>
                                <Text style={{ fontSize: 16, color: 'black' }}>
                                    Email:  {showInfoUser ? user.email : `${dealerUser.email}`}
                                </Text>
                                <Text style={{ fontSize: 16, color: 'black' }}>
                                    Ville:  {showInfoUser ? "Laval" : `${dealerUser.city}`}
                                </Text>
                                <Text style={{ fontSize: 16, color: 'black' }}>
                                    Téléphone:  {showInfoUser ? "514-256-4567" : `${dealerUser.phone}`}
                                </Text>
                                <Text style={{ fontSize: 16, color: 'black', marginTop: 10 }}>
                                    Owner off the : {showInfoUser ? "Porshe Gt3 Rs" : `${dealerUser.name}`}

                                </Text>

                            </ScrollView>
                        </View>
                    </View>

                </MapView>


            </View>


        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(57, 56, 56, 0.8)',
        gap: 5,
    },
    containerMap: {
        alignSelf: 'center',
        width: width * 0.99,
        height: height * 0.90,
        borderRadius: 30
    },
    containerMapOptions: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'center',
        bottom: -4,
        backgroundColor: ' rgba(0, 0, 0, 0.8)',
        borderRadius: 30,
        height: height * 0.40,
        width: width * 0.97,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 2,
        shadowRadius: 2,
    },
    text: {
        alignContent: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    title: {
        fontSize: 30,
        color: 'white',
    },
    ContainerArrow: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginLeft: 20,
        borderRadius: 40,
        backgroundColor: '#8B0000',
        width: 50,
        height: 50,
    },


    containerProfileHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        // borderWidth: 1,
        // borderBlockColor: 'white',
        marginLeft: 20
    },
});
