
import React, { useState, useEffect } from 'react';
import { useRouter, Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, Image, Dimensions, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { validerEmail, BoolValideUserInBd, insertUserViaApiIntoDB } from '@/fonctions/fonctions';
import * as Google from 'expo-auth-session/providers/google';
import { insertUserInBd } from '../../fonctions/fonctions';
import {Buttons} from '@/components/custom/custom';
// import * as WebBrowser from 'expo-web-browser';
// import * as AuthSession from 'expo-auth-session';

const { height, width } = Dimensions.get('window');

export default function Inscription() {


    const [personne, setPersonne] = useState({ name: '', email: '', password: '', passwordConfirm: '', picture: '' });
    const [userWithApi, setUserWithApi] = useState({ google_id: '', name: '', email: '', password: '', picture: '' });

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '953087995572-t53cgt672h8197tu0r5kut283dkio09p.apps.googleusercontent.com',
        iosClientId: '953087995572-4h6bfbj4nlds70b9d0djdbgomjrco76m.apps.googleusercontent.com',
    });
    // const { personne, setPersonne } = useContext(UserNameContex); // Utilisation du contexte
    const router = useRouter();

    useEffect(() => {
        if (response?.type === 'succes') {
            const { authentication } = response;
            console.log('TOKEN', authentication.accessToken);

            fetchUserInfo(authentication.accessToken);

        }
    }, [response]);



    const valideUser = () => {
        console.log(personne);
        if (personne.name.trim() && personne.email.trim() && personne.password.trim() && personne.passwordConfirm.trim()) {
            if (validerEmail(personne.email)) {
                if (personne.password.trim() === personne.passwordConfirm.trim()) {
                    if (!BoolValideUserInBd(personne.email, personne.password)) {
                       console.log("bool: insertUserInBd",insertUserInBd(personne));

                        if (insertUserInBd(personne)) {
                            console.log("aller à l'index");
                            // router.push("/");
                        }
                    } else {

                        alert('Utilisateur non trouvable');
                    }
                } else {
                    alert('Mot de passe non correspondant');

                }
            } else {
                alert('Email non valide');

            }
        } else {

            alert('Tous les champs doivent être remplis');
        }
    };




    async function fetchUserInfo(token) {
        const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${token}` },//Le mot Bearer indique au serveur qu’on utilise un jeton d’accès OAuth2.
        });
        const user = await res.json();
        console.log('User Info:', user);

        const newUser = {
            google_id: user.id,
            name: user.name,
            email: user.email,
            picture: user.picture ?? '',
            password: '',
            admin: 0
        };

        setUserWithApi(newUser);
        insertUserViaApiIntoDB(userWithApi);

    }



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
                <View style={styles.containerInput}>
                    <View style={{ width: 300, height: 50 }}>
                        <TextInput
                            style={styles.input}
                            placeholder={'Entrer votre nom'}
                            placeholderTextColor="black"
                            value={personne.name}
                            onChangeText={(nom) => setPersonne({ ...personne, name: nom })}
                        />
                    </View>

                    <View style={{ width: 300, height: 50, marginTop: 20 }}>
                        <TextInput
                            style={styles.input}
                            placeholder={'Entrer votre e-mail'}
                            placeholderTextColor="black"
                            value={personne.email}
                            onChangeText={(mail) => setPersonne({ ...personne, email: mail })}
                        />
                    </View>

                    <View style={{ width: 300, height: 50, marginTop: 20 }}>
                        <TextInput
                            style={styles.input}
                            placeholder={"Entrer votre mot de passe"}
                            placeholderTextColor="black"
                            value={personne.password}
                            onChangeText={(mdp) => setPersonne({ ...personne, password: mdp })}
                        />
                    </View>



                    <View style={{ width: 300, height: 50, marginTop: 20 }}>
                        <TextInput
                            style={styles.input}
                            placeholder={"Réentrer votre mot de passe"}
                            placeholderTextColor="black"
                            value={personne.passwordConfirm}
                            onChangeText={(mdp) => setPersonne({ ...personne, passwordConfirm: mdp })}
                        />
                    </View>
                </View>
            </LinearGradient>

    

            <Buttons text={'Inscription'} fonction ={valideUser}/>

            <View style={styles.orLine}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}> ----------</Text>

                <Text style={{ color: 'black', fontSize: 18 }}> ou inscrivez vous avec</Text>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}> ----------</Text>

            </View>

            <View style={styles.iconsContainerInscription}>
                <Pressable onPress={() => console.log('Google Pressed')}>
                    <Image source={require('@/assets/images/google_logo.jpg')} style={{ width: 60, height: 60, borderRadius: 20 }} />
                </Pressable>
            </View>
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
        alignItems: 'center',
        borderRadius: 30,
        height: 'auto',
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

    }
});


/*
    Google.useAuthRequest(...): est un hook fourni par expo-auth-session/providers/google.
    Il initialise une requête d'authentification avec les identifiants de client Google pour chaque plateforme : web, Android, iOS.request : l'objet de requête (configuration).

    Ce hook retourne un tableau de 3 éléments :

        -response : la réponse après la tentative de connexion.

        -promptAsync() : une fonction à appeler pour lancer le flux d’authentification (ouvrir l’écran Google de connexion).

[Utilisateur clique sur bouton]
       ↓
[promptAsync lance Google Login]
       ↓
[Google renvoie une réponse]
       ↓
[useEffect détecte la réponse]
       ↓
[accessToken est reçu]
       ↓
[fetchUserInfo appelle l’API Google]
       ↓
[Infos utilisateur récupérées]

*/