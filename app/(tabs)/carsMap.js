
import React, { useState, useEffect, useContext, useRef, useCallback, } from 'react';
import { useRouter, Link, useLocalSearchParams } from 'expo-router';
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
    const { item } = useLocalSearchParams();
    //console.log('item carsMap', item);
    const carLocation = item ? JSON.parse(item) : null;

    const { user } = useContext(UserContex);
    const [userHomeLocation, setUserHomeLocation] = useState({ latitude: 0, longitude: 0, latitudeDelta: 0.01, longitudeDelta: 0.01 })
    const [showInfoUser, setShowInfoUser] = useState(true);

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
    const carRef = useRef(null);
    const markerRefs = useRef([null, null]); // refs pour markers

    const fetchLocation = async () => {
       // console.log('userHomeLocation', userHomeLocation);

        if (userHomeLocation.latitude === 0 && userHomeLocation.longitude === 0) {
            const userLocation = await getLocation();
            if (userLocation) {

                const positionInitiale = {
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }


                setUserHomeLocation(positionInitiale);

                houseRef.current = positionInitiale;
               // console.log(' dans if houseRef.current = userHomeLocation')

                if (mapRef.current) {
                    mapRef.current.animateToRegion(positionInitiale, 1000)// anime vers la  position
                }
            }
        } else {
            //console.log(' dans else houseRef.current = userHomeLocation')
            houseRef.current = userHomeLocation;

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




    const fetcth = () => {

        //console.log(' avant dans la fonction fetch if carLocation\n:', carLocation);

        if (carLocation && carLocation.location) {
            //console.log('if carLocation\n:', carLocation);
            // Cas 1 : voiture reçue depuis params
            const positionInitiale = {
                latitude: carLocation.location.latitude,
                longitude: carLocation.location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };

            carRef.current = positionInitiale; // référence pour pin / recentrage
            //console.log('carRef.current = positionInitiale;')
            if (dealerUser.id !== carLocation.id) {
                setDealertUser({ ...dealerUser, ...carLocation });
                setShowInfoUser(false);
            }


            if (mapRef.current) {
                mapRef.current.animateToRegion(positionInitiale, 1000);
            }

        } else {
            //console.log('fetchLocation 1');
            //console.log('carRef.current', carRef.current);
            fetchLocation();
        }
      
    }


    useEffect(() => {
        //console.log(' dans  useEffect', carLocation);

        fetcth();
    }, [carLocation]);




    useFocusEffect(

        useCallback(() => {
            console.log('useFocusEffect ');


            if (mapRef.current && carRef.current == null) {
               // console.log('anime vers la  position de la maison')
                mapRef.current.animateToRegion(houseRef.current, 1000)
                // anime vers la  position de la maison
            } else if (mapRef.current && carRef.current != null) {
                console.log(' anime vers la  position de la voiture')

                mapRef.current.animateToRegion(carRef.current, 1000)// anime vers la  position de la voiture
            }
            return () => {
                console.log('Cleanup on blur');
                setDealertUser({
                    id: null,
                    ownerName: "",
                    name: "",
                    image: null,
                    city: "",
                    phone: "",
                    email: "",
                    location: { latitude: 0, longitude: 0 }
                });
                carRef.current = null;
            };
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
                    initialRegion={{
                        latitude: 0,
                        longitude: 0,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }}
                //  onRegionChangeComplete={(region) => { setRegion(region) }}
                >

                    {houseRef.current && ( // modifier pour plus tard pour afficher la voiture du
                        <Marker
                            coordinate={{
                                latitude: houseRef.current.latitude,
                                longitude: houseRef.current.longitude
                            }}
                            title={"Votre position"}
                            description={"House"}
                        >
                            <Pressable style={{ alignItems: 'center' }}
                                onPress={() => { { setShowInfoUser(true) } }}>
                                <Image
                                    source={require('@/assets/images/home.png')}
                                    style={{ width: 20, height: 20 }}
                                    resizeMode="contain"
                                />
                            </Pressable>
                        </Marker>
                    )}
                    {carLocation ? ( // si une voiture est passée en paramètre, afficher uniquement cette voiture

                        <Marker
                            key={carLocation.id}
                            title={carLocation.ownerName}
                            description={`Voiture située à ${carLocation.city}`}
                            coordinate={carLocation.location}
                            ref={(ref) => {
                                if (ref) markerRefs.current[carLocation.id] = ref;
                            }}
                            pinColor="red"
                            onPress={() => {
                                if (dealerUser.id !== carLocation.id) {
                                    setDealertUser({ ...dealerUser, ...carLocation });
                                    setShowInfoUser(false);

                                }
                            }}
                        />
                    ) :
                     (// sinon afficher toutes les voitures
                        <>
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
                                    onPress={() => {
                                        if (dealerUser.id !== data.id) {
                                            setDealertUser({ ...dealerUser, ...data });
                                            setShowInfoUser(false);
                                        }
                                    }}
                                />
                            ))}
                        </>
                    )}



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
                                <AntDesign name="phone" size={30} color="red" style={{ position: 'absolute', left: -width * 0.15 }} />
                                <AntDesign name="message1" size={30} color="red" style={{ position: 'absolute', left: width * 0.10 }} />
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
                                        source={dealerUser && !showInfoUser ? dealerUser.image : require('@/assets/images/porscheGt3Rs_car.png')}
                                        style={{ width: width * 0.30, height: width * 0.30, alignSelf: 'center' }}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: 'black' }}>
                                    {dealerUser && !showInfoUser ? dealerUser.ownerName : user.name}
                                </Text>
                                <Text style={{ fontSize: 16, color: 'black' }}>
                                    Email: {dealerUser && !showInfoUser ? dealerUser.email : user.email}
                                </Text>
                                <Text style={{ fontSize: 16, color: 'black' }}>
                                    Ville: {dealerUser && !showInfoUser ? dealerUser.city : "Laval"}
                                </Text>
                                <Text style={{ fontSize: 16, color: 'black' }}>
                                    Téléphone: {dealerUser && !showInfoUser ? dealerUser.phone : "514-256-4567"}
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
