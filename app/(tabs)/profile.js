
import React, { useState, useEffect, useContext, use } from 'react';
import { useRouter, Link, usePathname } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { updateUserProfile, getDate, editProfilPicture } from '../../fonctions/fonctions';
import { UserContex, RememberMeContext } from './connection';
import { Buttons } from '@/components/custom/custom';


const { height, width } = Dimensions.get('window');

export default function Profile() {

    const { user, setUser } = useContext(UserContex);
    const { isSelected, setSelection } = useContext(RememberMeContext);
    const [UpdatePersonne, setUpdatePersonne] = useState({ password: '', picture: '', email: user.email, passwordConfirm: '', isEditing: false });
    const [canSeePswd, setCanSeePswd] = useState(true);
    const [reload, setReload] = useState(false)
    const router = useRouter();

    const valideUser = () => {

        if (UpdatePersonne.password.trim() && UpdatePersonne.passwordConfirm.trim()) {

            if (UpdatePersonne.password.trim() === UpdatePersonne.passwordConfirm.trim()) {

                console.log("bool: update user", updateUserProfile(UpdatePersonne));

                if (updateUserProfile(UpdatePersonne)) {
                    console.log("User modifier,aller à l'index");
                    router.push("/");
                }
            } else {
                alert('Mot de passe non correspondant');

            }
        } else {
            alert('Les champs doivent être remplie');

        }

    };
    const deconnection = () => {
        if (!isSelected) {
            console.log('réinitialise le user dans  profi')
            setUser({
                id: null,
                google_id: '',
                name: '',
                email: '',
                password: '',
                picture: '',
                admin: 0
            });
        }
        router.push('/')
    };

    useEffect(() => {

        if (reload) {
           setTimeout(()=>{
             setReload(false);
           },100)
        }
    }, [reload])

    return (
        <View style={styles.containerConnexion}>
            <View style={{ flexDirection: 'row', position: 'relative' }}>
                <LinearGradient style={[styles.ContainerArrow, { marginTop: 40, marginLeft: 20 }]}
                    colors={['rgba(218, 5, 5, 0.8)', 'rgba(0, 0, 0, 0.5)']} // Rouge en haut, noir en bas
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.1, y: 1.2 }}>
                    <Link href={"/acceuil"} >
                        <View >
                            <FontAwesome name="arrow-left" size={25} color="white" />
                        </View>
                    </Link>
                </LinearGradient>

                <View style={{ position: 'absolute', right: 15, top: width * 0.16 }}>
                    <Text style={[styles.text, { fontSize: 14.5, fontWeight: 'bold' }]}>{getDate()}</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', position: 'relative' }}>
                <Text style={{ fontSize: 22, color: 'black', fontWeight: '400', left: width * 0.35 }}> Mon Profile</Text>
                <Pressable
                    style={{ position: 'absolute', right: 10 }}
                    onPress={() => setUpdatePersonne({ ...UpdatePersonne, isEditing: !UpdatePersonne.isEditing })}
                >
                    <Text style={{ fontSize: 15, color: '#1E90FF', fontWeight: 'bold', textDecorationLine: 'underline' }}>
                        Modifier
                    </Text>
                </Pressable>
            </View>

            <View style={styles.containerProfileHeader}>
                <Pressable style={{
                    flexDirection: 'column', position: 'relative', shadowColor: 'black',
                    shadowOffset: { width: 1 },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                    marginLeft: width * 0.09
                }} onPress={async () => {
                    {
                        const result = await editProfilPicture(user.email,setUser);
                        setReload(result)
                    }
                }}>

                    {user.picture === '' ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 80, width: 85, backgroundColor: 'grey', borderRadius: 60 }}>

                            <FontAwesome name="user" size={70} color="#8B0000"  style={{ width: 70, height: 70,marginLeft:width*0.06 }} />

                        </View>
                    )
                        :
                        (

                            <Image source={{ uri: user.picture }} style={{
                                width: width * 0.22,
                                height: width * 0.22,
                                borderRadius: (width * 0.22) / 2
                            }} resizeMode="cover" />

                        )
                    }

                    <View style={styles.iconAddPhoto}>
                        <MaterialIcons name="add-a-photo" size={20} color="black" />
                    </View>
                </Pressable >

                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={[styles.textCar, { fontWeight: 'bold' }]}> {user.name}</Text>
                </View>
            </View>

            <LinearGradient style={styles.containerConnexion2}
                colors={['rgba(218, 5, 5, 0.8)', 'rgba(174, 141, 141, 0.5)']} // Rouge en haut, noir en bas
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.1, y: 1.2 }}>
                <View style={styles.containerInput}>
                    <View style={{ width: 300, height: 50 }}>
                        <TextInput
                            style={styles.input}
                            placeholder={user.name}
                            placeholderTextColor="black"
                            editable={false}
                        />
                    </View>

                    <View style={{ width: 300, height: 50, marginTop: 20 }}>
                        <TextInput
                            style={styles.input}
                            placeholder={user.email}
                            placeholderTextColor="black"
                            editable={false}
                        />
                    </View>

                    <View style={{ width: 300, height: 50, marginTop: 20 }}>
                        <View style={{ flexDirection: 'row',position:'relative' }}>
                            <Pressable style={{ marginTop: 10 ,position:'absolute', left:-24}} onPress={() => setCanSeePswd(!canSeePswd)}>
                                <Fontisto name="locked" size={24} color="red" />
                            </Pressable>
                            <TextInput
                                style={styles.input}
                                placeholder={UpdatePersonne.isEditing ? "Entrez votre nouveau mot de passe" : "************"}
                                placeholderTextColor="black"
                                secureTextEntry={canSeePswd}
                                editable={UpdatePersonne.isEditing}
                                value={UpdatePersonne.password}
                                onChangeText={(mdp) => setUpdatePersonne({ ...UpdatePersonne, password: mdp, isEditing: true })}
                            />
                        </View>
                    </View>

                    <View style={UpdatePersonne.isEditing ? { width: 300, height: 50, marginTop: 20 } : { display: 'none', width: 300, height: 50, marginTop: 20 }}>
                        <View style={{ flexDirection: 'row',position:'relative'}}>
                            <Pressable style={{ marginTop: 10,position:'absolute', left:-24  }} onPress={() => setCanSeePswd(!canSeePswd)}>
                                <Fontisto name="locked" size={24} color="red" />
                            </Pressable>
                            <TextInput
                                style={styles.input}
                                placeholder={"Réentrer votre mot de passe"}
                                placeholderTextColor="black"
                                secureTextEntry={canSeePswd}
                                value={UpdatePersonne.passwordConfirm}
                                onChangeText={(mdp) => setUpdatePersonne({ ...UpdatePersonne, passwordConfirm: mdp })}
                            />
                        </View>
                    </View>
                </View>
            </LinearGradient>
            {UpdatePersonne.isEditing ?
                (<View>
                    <Buttons text={'Confirmer'} fonction={valideUser} />

                </View>) :
                (<View >
                    <Buttons text={'Déconnection'} fonction={deconnection} />

                </View>
                )}
        </View>
    );
}


const styles = StyleSheet.create({
    containerConnexion: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(117, 111, 111, 0.8)',
        gap: 5,
    },

    containerConnexion2: {
        marginTop: 30,
        alignItems: 'center',
        borderRadius: 30,
        height: 'auto',
        width: width * 0.95,
        marginLeft: 10,
        paddingBottom: 20,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 2,
        shadowRadius: 2,
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
        fontSize: 18,
        fontWeight: 'bold',
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
    containerProfileHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        // borderWidth: 1,
        // borderBlockColor: 'white',
        marginLeft: 20
    },
    iconAddPhoto: {
        position: 'absolute',
        paddingLeft: 3,
        paddingBottom: 2,
        bottom: 5, left: 3,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 40,
        width: 28,
        height: 28

    }
});


/*
  

*/