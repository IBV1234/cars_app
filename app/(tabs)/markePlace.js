
import React, { useState, useEffect, useContext } from 'react';
import { useRouter, Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, Dimensions, Image, TextInput, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { insertCarsData, dropDownComponent, handleEditCar } from '../../fonctions/fonctions';
import { Buttons } from '@/components/custom/custom';
import { dataLogo, dataCarTypes } from '../../constants/carsLogo';
import * as  SQLite from 'expo-sqlite';
import { db } from "./index";
import { Alert } from 'react-native';

import { UserContex, } from './connection';

import { Dropdown } from 'react-native-element-dropdown';
const { height, width } = Dimensions.get('window');

export default function MarkePlace() {


    const { user } = useContext(UserContex); // Utilisation du contexte
    const router = useRouter();

    const [car, setCar] = useState({ name: 'BMW M4', brand: '', lien: '', hp: '800', seats: '2', price: '90000', topSpeed: '300', description: 'inline 6 beturbo', typeCar: 'sedan', year: '2025' })
    const [carSelectDropDown, setSelectDropDown] = useState('');




    const valideCar = () => {
        console.log(car);
        if (car.name.trim() && car.brand.trim() && car.lien.trim() && car.hp.trim() && car.seats.trim() && car.price.trim() && car.topSpeed.trim() && car.description.trim() && car.typeCar.trim()) {

            console.log(car);


            if (insertCarsData(car)) {
                console.log("Voiture insérée,aller à l'index");
            }


        } else {
            alert('Un champs est vide');

        }


    };


    return (
        <View style={styles.containerConnexion}>




            <View style={styles.containerProfileHeader}>
                <View>
                    <LinearGradient style={[styles.ContainerArrow, { left: -150, top: 15 }]}
                        colors={['rgba(218, 5, 5, 0.8)', 'rgba(0, 0, 0, 0.5)']} // Rouge en haut, noir en bas
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.1, y: 1.2 }}>
                        <Link href={"/acceuil"} >
                            <View >
                                <FontAwesome name="arrow-left" size={25} color="white" />
                            </View>
                        </Link>
                    </LinearGradient>
                </View >


                <View style={{ position: 'absolute', right: 20, top: 50 }}>
                    {user.picture === '' ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 80, width: 85, backgroundColor: 'grey', borderRadius: 60 }}>

                            <FontAwesome name="user" size={70} color="#8B0000" style={{ width: 70, height: 70, marginLeft: width * 0.06 }} />

                        </View>
                    )
                        :
                        (

                            <Image source={{ uri: user.picture }} style={{
                                width: width * 0.20,
                                height: width * 0.20,
                                borderRadius: (width * 0.20) / 2
                            }} resizeMode="cover" />

                        )
                    }
                </View>
            </View >

            <View style={{ alignSelf: 'center', top: width * 0.25 }}>
                <Image source={{ uri: car.lien }} style={{
                    width: 245,
                    height: 140,
                    borderRadius: 20,
                    objectFit: 'cover'

                }} />
            </View>
            <View style={{ top: width * 0.30 }}>
                <Buttons text={'Add'} fonction={valideCar} />

            </View>
            <LinearGradient style={styles.containerConnexion2}
                colors={['rgba(218, 5, 5, 0.8)', 'rgba(0, 0, 0, 0.5)']} // Rouge en haut, noir en bas
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.1, y: 1.2 }}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true} >
                    <View style={styles.containerInput}>

                        <View style={{ width: 300, height: 50, marginTop: 10, marginBottom: 20 }}>
                            {
                                dropDownComponent(dataLogo, car, setCar, styles)

                            }

                        </View>
                        <View style={{ width: 300, height: 50 }}>
                            <TextInput
                                style={styles.input}
                                placeholder={'Entrer le nom de votre voiture'}
                                placeholderTextColor="black"
                                value={car.name}
                                onChangeText={(nom) => setCar({ ...car, name: nom })}
                            />
                        </View>

                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 2, paddingBottom: 34 }}>
                            <Pressable
                                style={{ width: 300, height: 50, marginTop: 20, justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 2, borderRadius: 30, }}
                                onPress={async () => {

                                  handleEditCar(car,setCar);
                                }}
                            >
                                <Text style={{ fontSize: 18 }}> Entrer une image</Text>


                            </Pressable>

                        </View>

                        <View style={{ width: 300, height: 50, marginTop: 20 }}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Entrer l'année"}
                                placeholderTextColor="black"
                                value={car.year}
                                onChangeText={(y) => setCar({ ...car, year: y })}
                            />
                        </View>

                        <View style={{ width: 300, height: 50, marginTop: 20 }}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Entrer le house power"}
                                placeholderTextColor="black"
                                value={car.hp}
                                onChangeText={(h) => setCar({ ...car, hp: h })}
                            />
                        </View>
                        <View style={{ width: 300, height: 50, marginTop: 20 }}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Entrer le nombre de chaise"}
                                placeholderTextColor="black"
                                value={car.seats}
                                onChangeText={(s) => setCar({ ...car, seats: s })}
                            />
                        </View>
                        <View style={{ width: 300, height: 50, marginTop: 20 }}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Entrer le topSpeed"}
                                placeholderTextColor="black"
                                value={car.topSpeed}
                                onChangeText={(tp) => setCar({ ...car, topSpeed: tp })}
                            />
                        </View>

                        <View style={{ width: 300, height: 50, marginTop: 20 }}>
                            {
                                dropDownComponent(dataCarTypes, car, setCar, styles, 'type voiture')

                            }
                        </View>
                        <View style={{ width: 300, height: 50, marginTop: 20 }}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Entrer le prix"}
                                placeholderTextColor="black"
                                value={car.price}
                                onChangeText={(p) => setCar({ ...car, price: p })}
                            />
                        </View>
                        <View style={{ width: 300, height: 50, marginTop: 20 }}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Entrer le description"}
                                placeholderTextColor="black"
                                value={car.description}
                                onChangeText={(des) => setCar({ ...car, description: des })}
                            />
                        </View>




                    </View>

                </ScrollView>

            </LinearGradient>





        </View>
    );
}

/*
onPress={async () => {
                    {
                        const result = await editProfilPicture(user.email,setUser);
                        setReload(result)
                    }
*/

const styles = StyleSheet.create({
    containerConnexion: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(92, 86, 86, 0.8)',
        gap: 5,
    },
    containerProfileHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: width * 0.40,
        position: 'relative'
    },

    containerConnexion2: {
        marginTop: height * 0.16,
        borderRadius: 30,
        height: height * 0.50,
        width: width * 0.95,
        marginLeft: 10,
        paddingBottom: 20
    },
    text: {
        alignContent: 'center',
        fontSize: 15,
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
        width: 60,
        height: 60,
    }, containerImageConnexion: {
        flexDirection: 'row',
        gap: 10,
        marginLeft: 20,
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 'auto',
    },
    containerInput: {
        marginTop: '10%',
        flexDirection: 'column',
        gap: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 100
    },
    input: {
        borderColorBottom: 'black',
        borderBottomWidth: 1.5,
        fontSize: 20,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        height: '100%',
    },
    btnAddImage: {

        borderBottomWidth: 1.5,
        fontSize: 20,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        height: '100%',
    },
    carLogo: {
        height: height * 0.28,
        width: width,
    },
    orLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    iconsContainerInscription: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20,
        width: width * 1,
        height: height * 0.1,


    },
    //dropdown style
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,

    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});


/*

   

*/