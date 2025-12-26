import { carsLogo } from "@/constants/carsLogo";
import { useUser } from "@/context/userContext";
import { addLink, formatNumberWithThousandsSeparator, toogleLike } from '@/fonctions/utils';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "./index";
import { ShowCars } from "@/components/custom/custom";

const { height, width } = Dimensions.get("window");
export const LikeContext = createContext();

export default function Accueil() {
    const { refresh } = useLocalSearchParams()
    const [recherche, setRecherche] = useState({ car: '' });
    const [carsLogoData, setCarsLogoData] = useState([]);
    const [carsData, setCarsData] = useState([]);
    const { user } =  useUser();
    const { likeIds, setLikeIds } = useContext(LikeContext);
    // const [likeIds, setLikeIds] = useState(new Set);// set est un  tableau like avec les ids  et  qui stocke des éléments uniques.
    const [loading, setLoading] = useState(true);
    const [numColumns, setNumColumns] = useState(2);


    const getCarsData = (cardata) => {
        try {
            db.withTransactionSync(() => {
                let cars = [];
                if (!cardata || cardata.length === 0) {
                    cars = db.getAllSync("SELECT * FROM Cars ORDER BY price");
                } else {
                    cars = db.getAllSync('SELECT * FROM Cars WHERE name LIKE ?;', ['%' + cardata + '%']);
                }
                if (cars.length > 0) {
                    setCarsData(addLink(cars));
                } else {
                    console.log("Aucune voiture trouvée dans la base de données.");
                }
            })
        } catch (error) {
            console.error("Erreur lors de la récupération des données des voitures :", error);
        }
    }


    const getCarsCategory = (brand) => {
        db.withTransactionSync(() => {
            const cars = db.getAllSync('SELECT * FROM Cars WHERE brand = ?', [brand]);
            if (cars.length > 0) {
                setCarsData(addLink(cars));

            } else {
                console.log("Aucune voiture trouvée dans la base de données.");
            }
        })
    }
    const deleteCarsByYear = (year) => {
        db.withTransactionSync(() => {
            const result = db.runSync('DELETE FROM Cars WHERE year = ?', [year]);
            console.log(`${result.changes} voiture(s) supprimée(s) avec l'année ${year}.`);
        });
    };


      const getInfoUsers = () => {
        db.withTransactionSync(() => {
            const users = db.getAllSync(`SELECT name FROM User;`);

            if (users.length > 0) {
                console.log(users);
            } else {
                console.log("Aucun user trouvé dans la base de données.");
            }

        }
        )
    }

    useFocusEffect(

        useCallback(() => {

            if (refresh) {
                getCarsData();
            }

        }, [refresh]),
    )


    useEffect(() => {

        //deleteCarsByYear(2020);
        //getInfoUsers();
        setCarsLogoData(addLink(carsLogo));
    }, [])

    useEffect(() => {
        if (carsData.length < 2) {
            setNumColumns(1); // nombre de colonnes à 1 si moins de 2 voitures pour la recherche
        } else {
            setNumColumns(2);
        }
    }, [carsData.length])


    useEffect(() => {
        setLoading(true);
        getCarsData(recherche.car);
        setLoading(false);
    }, [recherche.car]);

//style={[styles.text, { textDecorationLine: 'underline' }]}

    return (
        <LinearGradient style={styles.container}
            colors={['rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 0.5)']} // Rouge en haut, noir en bas
            start={{ x: 0.5, y: -1 }}
            end={{ x: 0.5, y: 2 }}>


            <View style={styles.containerProfil}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Link href={'/profile'} >

                        {user.picture === '' ? (
                            <FontAwesome name="user" size={38} color="#8B0000" />
                        )
                            :
                            (

                                <Image source={{ uri: user.picture }} style={{
                                    width: width * 0.15,
                                    height: width * 0.15,
                                    borderRadius: (width * 0.15) / 2
                                }} resizeMode="cover" />

                            )
                        }
                    </Link>
                    <Text style={styles.text}> Bonjour {user.name}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: height * 0.01 }}>
                <Pressable style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 8 }} onPress={() => { router.push("/carsMap") }}>
                    <FontAwesome name="map-marker" size={35} color={'#8B0000'} />
                    <Text style={styles.locationText}>Quebec,Canada</Text>
                </Pressable>
            </View>


            <View style={styles.input}>
                <TextInput
                    style={{ color: 'white' }}
                    placeholder={"Recherche de voiture"}
                    placeholderTextColor="white"
                    autoComplete={true}
                    value={recherche.car}
                    maxLength={20}
                    onChangeText={(name) => setRecherche({ ...recherche, car: name })}
                />
                <EvilIcons name="search" size={24} color="#8B0000" />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: height * 0.015 }}>
                <Text style={styles.title}>Marques</Text>
                <Pressable onPress={() => { getCarsData(); }} >
                    <Text style={[styles.text, { textDecorationLine: 'underline' }]}>Voir tous les voitures</Text>
                </Pressable>
            </View>

            <View>
                <FlatList
                    data={carsLogoData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable style={styles.categoryItem} onPress={() => getCarsCategory(item.name)}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={item.lien} style={styles.iconImageCategory} />
                                <Text style={[styles.text, { fontWeight: '100', marginBottom: 10, textAlign: 'center' }]}>{item.name}</Text>
                            </View>
                        </Pressable>
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
            </View>


            <View style={{ flex: 1, marginBottom: 80 }}
            >
                <FlatList
                    data={carsData}
                    keyExtractor={(item) => item.id}
                    numColumns={numColumns} // Affiche 2 éléments par rangée
                    key={numColumns}
                    renderItem={({ item }) => {

                        // can put code here
                        let mix = carsData.length < 2;


                        return (
                            <View style={[styles.ContainerCarsImg, { flex: 1, margin: 5 }]} >

                                <View>

                                    <ShowCars item={item} styles={styles} mix={mix} loading={loading} setLoading={setLoading} />
                                    <Text style={mix ? [styles.textCar, { color: '#B8860B', fontSize: 16 }] : [styles.textCar, { color: '#B8860B' }]}>{item.name}</Text>
                                    <Text style={mix ? [styles.textCar, { color: 'green', fontSize: 16 }] : [styles.textCar, { color: 'green' }]}> {formatNumberWithThousandsSeparator(item.price)}$</Text>
                                    <Text style={mix ? [styles.textCar, { color: 'white', fontSize: 16 }] : [styles.textCar, { color: 'white' }]}> Année: {item.year}</Text>

                                </View>

                                <Pressable style={[ mix ? {marginVertical: 10, position: 'absolute', top: 10,left:10 } : { marginVertical: 10, position: 'absolute', bottom: 10,left:5 }]} onPress={() => {
                                    toogleLike(item.id, setLikeIds);
                                }}>
                                    {likeIds.has(item.id) ? (<AntDesign name={'heart'} size={27} color="#B22222" />) : (<AntDesign name={'heart'} size={27} color="#ffffffff" />)}
                                </Pressable>

                                {/* <View style={{ marginVertical: 10,marginLeft:6, position: 'absolute', top: 5 } }>
                                 {user.picture === '' ? (
                                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 80, width: 85, backgroundColor: 'grey', borderRadius: 60 }}>

                                        <FontAwesome name="user" size={70} color="#8B0000" style={{ width: 70, height: 70, marginLeft: width * 0.06 }} />

                                    </View>
                                )
                                    :
                                    (

                                        <Image source={{ uri: user.picture }} style={{
                                            width: width * 0.10,
                                            height: width * 0.10,
                                            borderRadius: (width * 0.10) / 2
                                        }} resizeMode="cover" />

                                    )
                                }
                                </View> */}

                            </View>
                        );
                    }}

                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={{ paddingHorizontal: 10 }}

                />
            </View>
        </LinearGradient>

    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        flexDirection: 'column',
        gap: 15,
    },
    containerProfil: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: height * 0.08,
        marginLeft: width * 0.05,
    },
    text: {
        fontSize: 13,
        color: 'white',
    },
    textCar: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
        paddingLeft: 5
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: width * 0.04,
        paddingHorizontal: 10,
        width: width * 0.90,
        height: 60,
        borderColor: 'white',
        borderWidth: 0.5,
        borderRadius: 30,
        paddingLeft: 10,
    },
    locationText: {
        marginLeft: 8,
        textAlign: "center",
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
    categoryItem: {
        flexDirection: 'column',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        width: 'auto',
        height: height * 0.10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(111, 7, 7, 0.2)',
        marginHorizontal: 5,
        shadowColor: 'black',
        shadowOffset: { width: 3, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },

    ContainerCarsImg: {
        marginTop: 8,
        flexDirection: 'row',
        borderRadius: 20,
        flexWrap: 'wrap',
        backgroundColor: 'rgba(111, 7, 7, 0.2)',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 2,
        shadowRadius: 2,
        position: 'relative',
        // borderWidth: 1,
        // borderColor: 'white'
    },
    iconImageCategory: {
        width: 65,
        height: 50,
        borderRadius: 25,
        marginVertical: 5,
        objectFit: 'contain'
    },
    iconCarsImage: {
        width: width * 0.45,
        height: height * 0.18,
        resizeMode: 'contain',
        borderRadius: 25,
    },
    iconCarsImage2: {
        width: width * 0.50,
        height: height * 0.20,
        borderRadius: 25,
        resizeMode: 'contain',
    },
    imgCar: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.15,
    },
    imgCar2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.90,
        height: 'auto'
    },

});
/*
Un Set est utilisé ici car : Il stocke des valeurs uniques (pas de doublons).

Il permet de vérifier rapidement si un élément est déjà présent (likedIds.has(id)).

Il permet de facilement ajouter ou retirer un élément (add, delete).
*/