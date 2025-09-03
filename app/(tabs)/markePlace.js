
import React, { useState, useEffect } from 'react';
import { useRouter, Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, Dimensions, Pressable, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { insertCarsData, dropDownComponent } from '../../fonctions/fonctions';
import { Buttons } from '@/components/custom/custom';
import { nameLogo } from '../../constants/carsLogo';
import * as  SQLite from 'expo-sqlite';
import { db } from "./index";
import { Dropdown } from 'react-native-element-dropdown';
const { height, width } = Dimensions.get('window');

export default function MarkePlace() {


    // const { personne, setPersonne } = useContext(UserNameContex); // Utilisation du contexte
    const router = useRouter();

    const [car, setCar] = useState({ name: '', brand: '', lien: '', hp: '', seats: '', price: '', topSpeed: '', description: '', typeCar: '' })
    const [carSelectDropDown, setSelectDropDown] = useState('');
    console.log(nameLogo)
    return (
        <View style={styles.containerConnexion}>


            <LinearGradient style={[styles.ContainerArrow, { marginTop: 40, marginLeft: 20 }]}
                colors={['rgba(218, 5, 5, 0.8)', 'rgba(0, 0, 0, 0.5)']} // Rouge en haut, noir en bas
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.1, y: 1.2 }}>
                <Link href={"/"} >
                    <View >
                        <FontAwesome name="arrow-left" size={25} color="white" />
                    </View>
                </Link>
            </LinearGradient>


            <LinearGradient style={styles.containerConnexion2}
                colors={['rgba(218, 5, 5, 0.8)', 'rgba(0, 0, 0, 0.5)']} // Rouge en haut, noir en bas
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.1, y: 1.2 }}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true} >
                    <View style={styles.containerInput}>

                        <View style={{ width: 300, height: 50, marginTop: 20 }}>
                            {
                                dropDownComponent(nameLogo, car, setCar, styles)

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

                        <View style={{ width: 300, height: 50, marginTop: 20 }}>
                            <TextInput
                                style={styles.input}
                                placeholder={'Entrer  le brand'}
                                placeholderTextColor="black"
                                value={car.brand}
                                onChangeText={(b) => setCar({ ...car, brand: b })}
                            />
                        </View>

                        <View style={{ width: 300, height: 50, marginTop: 20 }}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Entrer votre mot image"}
                                placeholderTextColor="black"
                                value={car.lien}
                                onChangeText={(l) => setCar({ ...car, lien: l })}
                            />
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
                                placeholder={"Entrer le house topSpeed"}
                                placeholderTextColor="black"
                                value={car.topSpeed}
                                onChangeText={(tp) => setCar({ ...car, topSpeed: tp })}
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



            <Buttons text={'Add'} fonction={insertCarsData(car)} />


        </View>
    );
}


const styles = StyleSheet.create({
    containerConnexion: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(92, 86, 86, 0.8)',
        gap: 5,
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
        borderBottomColor: 'gray',
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