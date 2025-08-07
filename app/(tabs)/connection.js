
import React, { useState, createContext, useContext, useCallback, useEffect } from 'react';
import { useRouter, Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Zocial from '@expo/vector-icons/Zocial';
import { StyleSheet, Text, View, Dimensions, Pressable, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { insertUserViaApiIntoDB, GetUserInBd, saveSession, getSession } from '@/fonctions/fonctions';
import { Buttons } from '@/components/custom/custom';
import { useFocusEffect } from '@react-navigation/native';


const { height, width } = Dimensions.get('window');
export const UserContex = createContext();
export const RememberMeContext = createContext();

export default function Connexion() {

    const { user, setUser } = useContext(UserContex);
    const { isSelected, setSelection } = useContext(RememberMeContext);

    const [personne, setPersonne] = useState({ name: '', email: 'Zack@gmail.com', password: '123', picture: '' });
    const [userWithApi, setUserWithApi] = useState({ google_id: '', name: '', email: '', password: '', picture: '' });
    const router = useRouter();
    const [canSeePswd, setCanSeePswd] = useState(true);
    // const fetchSession = async () => {
    //     if (isSelected) {
    //         const session = await getSession();
    //         if (session) {
    //             console.log(session)
    //             setPersonne({ ...personne, password: session.password, email: session.email });

    //         }
    //     }
    // };

    const fetchSession = () => {
        // console.log('isSelected:', isSelected);
        // console.log('user.email:', user.email);
        // console.log('user.password:', user.password);
        // console.log('Condition:', isSelected && user.email.length > 0 && user.password.length > 0);
        if (isSelected && user.email.length > 0 && user.password.length > 0) {
            setPersonne({ ...personne, password: user.password, email: user.email });

        }
    }

    useEffect(() => {
        fetchSession();
    }, [isSelected]);


    useFocusEffect(

        useCallback(() => {
            return () => {
                console.log('loose focus')
                setPersonne({ name: '', email: '', password: '', picture: '' });
            }
        }, []),
    )



    useFocusEffect(

        useCallback(() => {
            fetchSession();

        }, [isSelected, user]),
    )




    const valideUser = () => {
        if (personne.email.trim() && personne.password.trim()) {
            if (personne.password.trim()) {
                const user = GetUserInBd(personne.email, personne.password);
                if (user !== false) {
                    setUser(user);
                    // const session = {
                    //     email: user.email,
                    //     password: user.password
                    // };
                    // await saveSession(session)
                    // console.log(user,'userContext')
                    router.push("/acceuil");
                } else {
                    alert('Mot de passe incorrecte')
                }


            } else {

                alert('Utilisateur non trouvable');
            }
        } else {
            alert('Tous les champs doivent être remplis');

        }

    };


    return (
        <View style={styles.containerConnexion} >



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

            <Text style={[styles.title, { alignSelf: 'center', fontWeight: '100' }]}> Connextion</Text>

            <LinearGradient style={styles.containerConnexion2}
                colors={['rgba(218, 5, 5, 0.8)', 'rgba(0, 0, 0, 0.5)']} // Rouge en haut, noir en bas
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.1, y: 1.2 }}>
                <View style={styles.containerInput}>
                    <View style={{ flexDirection: 'row', width: 300, height: 50, gap: 5 }}>
                        <View style={{ marginTop: 10 }}>
                            <Zocial name="email" size={24} color="red" />

                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Entrer votre e-mail'}
                            placeholderTextColor="black"
                            autoComplete= {true}
                            value={personne.email}
                            onChangeText={(mail) => setPersonne({ ...personne, email: mail })}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', width: 300, height: 50, marginTop: 40, gap: 5 }}>
                        <Pressable style={{ marginTop: 10 }} onPress={() => setCanSeePswd(!canSeePswd)}>
                            <Fontisto name="locked" size={24} color="red" />
                        </Pressable>
                        <TextInput
                            style={styles.input}
                            placeholder={"Entrer votre mot de passe"}
                            secureTextEntry={canSeePswd}
                            placeholderTextColor="black"
                            value={personne.password}
                            onChangeText={(mdp) => setPersonne({ ...personne, password: mdp })}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', gap: 10, marginTop: 10 }}>
                        <Checkbox
                            value={isSelected}
                            onValueChange={setSelection}
                            style={styles.checkbox}
                        />
                        <Text style={[styles.text, { fontWeight: '100' }]}> Se souvenir de moi</Text>
                    </View>
                </View>
            </LinearGradient>

            <Buttons text={'Connextion'} fonction={valideUser} />

        </View>
    );// backgroundColor: '#8B0000'
}


const styles = StyleSheet.create({
    containerConnexion: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(92, 86, 86, 0.8)',
        gap: 5,
    },

    containerConnexion2: {
        marginTop: height * 0.10,
        alignItems: 'center',
        borderRadius: 30,
        height: height * 0.44,
        width: width * 0.95,
        marginLeft: 10,
    },
    boutton: {
        marginTop: 20,
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
    checkbox: {
        borderColor: 'red',
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
        marginTop: '20%',
        flexDirection: 'column',
        gap: 20,
        alignItems: 'center',
    },
    input: {
        borderColorBottom: 'black',
        textAlign: 'left',
        borderBottomWidth: 1.5,
        fontSize: 20,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        height: '100%',
    },
    carLogo: {
        height: height * 0.26,
        width: width,
    },
});


