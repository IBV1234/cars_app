import { db } from "@/app/(tabs)/index";
import { Image, PermissionsAndroid } from 'react-native';
import moment from 'moment-timezone';
import * as Keychain from 'react-native-keychain';
import { images } from "@/constants/carsLogo";
import * as Location from 'expo-location';
import { Dropdown } from 'react-native-element-dropdown';
import { Alert } from 'react-native';
import { carsLocation } from "@/constants/carsPositions";


import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";

export const validerEmail = (email) => {
    const trimmed = email.trim();
    return (
        trimmed.length > 0 &&
        trimmed.includes('@') &&
        trimmed.indexOf('@') < trimmed.lastIndexOf('.')
    );
}
export const insertUserViaApiIntoDB = (user) => {//On utilise INSERT OR REPLACE pour éviter d’avoir deux fois le même utilisateur.

    db.withTransactionSync(() =>
        db.runSync(
            `INSERT OR REPLACE INTO User (google_id, name, email, picture, password, admin) VALUES (?, ?, ?, ?, ?, ?)`,
            [user.id, user.name, user.email, user.picture ?? '', user.password, user.admin]
        )
    );
};


export const BoolValideUserInBd = (email, mdp) => {
    let x = false;
    try {
        const isUserInBd = db.getAllSync(
            'SELECT password, email FROM User WHERE email = ? AND password = ?',
            [email, mdp]
        );
        if (isUserInBd.length > 0) {
            console.log("Utilisateur trouvé dans la base de données");
            x = true;
        } else {
            console.log("Utilisateur non trouvé dans la base de données");
            x = false;
        }
    } catch (error) {
        console.error("Erreur dans la validation de l'utilisateur", error);
        x = false;
    }
    return x;
};

export const addLink = (Data) => {
    return Data.map((_data) => {
        if (_data.lien && _data.lien.startsWith("file")) {
            //  photo locale depuis ImagePicker
            return {
                ..._data,
                lien: { uri: _data.lien },
            };
        } else if (_data.lien !==undefined) {
            // Cas image fixe déjà dans projet
            return {
                ..._data,
                lien: images[_data.lien] || '',
            };
        }else if (_data.image !==undefined && _data.lien === undefined) {
            // Cas image fixe déjà dans projet
            return {
                ..._data,
                lien: images[_data.image] || '',
            };
        }else if (_data.image2 !==undefined && _data.lien === undefined) {
            return {
                ..._data,
                lien: images[_data.image2] || '',
            };
        }
    });
};



export const insertUserInBd = (personne) => {
    try {
        db.withTransactionSync(() => {
            db.runSync(
                'INSERT INTO User (google_id, name, email, picture, password, admin) VALUES (?, ?, ?, ?, ?, ?)',
                [
                    personne.google_id ?? '',
                    personne.name,
                    personne.email,
                    personne.picture ?? '',
                    personne.password,
                    personne.admin ?? 0
                ]
            );
            console.log("user inséré dans la base de données");
        })
        return true;


    } catch (error) {
        console.error("Erreur dans l'insertion du user dans la bd", error);
        return false;
    }
}

export const handleEditCar = async (car, setCar) => {
    Alert.alert(
        "Attention",
        "Vous devez retirer le fond écran de l'image avant de l'utiliser",
        [
            {
                text: "Annuler",
                style: "cancel"
            },
            {
                text: "OK",
                onPress: async () => {
                    try {
                        const result = await editCarPic(car, setCar);
                        console.log(result);
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        ],
        { cancelable: true }
    );
};

export const getIdUserByName = (name) => {
  if(name!==''){
      try {
        const UserInBd = db.getAllSync(
            'SELECT id FROM User WHERE name = ?',
            [name]
        );
        if (UserInBd.length > 0) {
            console.log("Utilisateur trouvé dans la base de données");
            return UserInBd[0];
        } else {
            console.log("Utilisateur non trouvé dans la base de données");
            return null;
        }
    } catch (error) {
        console.error("Erreur dans la validation de l'utilisateur", error);
        return null;
    }
  } return null;
}
export const insertCarsData = (car) => {
    let id = getIdUserByName(car.userName);
    try {
        db.withTransactionAsync(() => {
            console.log("insertCarsData", car)
            db.runSync(
                "INSERT INTO Cars (name, brand, year, lien, hp, seats, price, topSpeed, description, typeCar,user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                [
                    car.name ?? '',
                    car.brand ?? '',
                    parseInt(car.year) || 2025,
                    String(car.lien ?? ''),
                    parseInt(car.hp) || 0,
                    parseInt(car.seats) || 0,
                    parseInt(car.price) || 0,
                    parseInt(car.topSpeed) || 0,
                    car.description ?? '',
                    car.typeCar ?? '',
                    parseInt(id) || null
                ]
            );
        });

        return true;
    } catch (err) {
        console.error("ERREUR dans l'insertion d'une voiture", err);
        return false
    }

}



export const updateUserProfile = (user) => {
    try {
        db.withTransactionSync(() => {
            if (user.picture && user.picture.length > 0) {
                db.runSync(
                    'UPDATE User SET password  = ?  , picture =  ? WHERE email = ?', [user.password, user.picture, user.email]

                );
            } else {
                db.runSync(
                    'UPDATE User SET password  = ?  WHERE email = ?', [user.password, user.email]
                )
            }
            console.log("user modifier dans la base de données");
        })
        return true;


    } catch (error) {
        console.error("Erreur dans la modification du user dans la bd", error);
        return false;
    }


}
export const GetUserInBd = (email, mdp) => {
    try {
        const UserInBd = db.getAllSync(
            'SELECT * FROM User WHERE email = ? AND password = ?',
            [email, mdp]
        );
        if (UserInBd.length > 0) {
            console.log("Utilisateur trouvé dans la base de données");
            return UserInBd[0];
        } else {
            console.log("Utilisateur non trouvé dans la base de données");
            return false;
        }
    } catch (error) {
        console.error("Erreur dans la validation de l'utilisateur", error);
        return false;
    }
};


export const getUserByEmail = async (email) => {
    try {
        const UserInBd = db.getAllSync(
            'SELECT * FROM User WHERE email = ?',
            [email]
        );
        if (UserInBd.length > 0) {
            console.log("Utilisateur trouvé dans la base de données");
            return UserInBd[0];
        } else {
            console.log("Utilisateur non trouvé dans la base de données");
            return false;
        }
    } catch (error) {
        console.error("Erreur dans la validation de l'utilisateur", error);
        return false;
    }
};


export const refreshUser = async (email, setUser) => {

    const userData = await getUserByEmail(email); // SELECT * FROM User WHERE email = ?
    setUser(userData);
};


export const imageUpdate = (lien) => {
    const { width, height } = Image.resolveAssetSource(lien);
    return { width, height };
}


export const saveSession = async (session) => {
    const sessionData = JSON.stringify(session);
    await Keychain.setGenericPassword('session', sessionData);
};


export const getSession = async () => {
    const data = await Keychain.getGenericPassword();
    if (data) {
        return JSON.parse(data.password);
    }
    return null;
}

export const BoolValideUserViaApi = (user) => {
    const existingUser = db.getFirstSync(
        `SELECT * FROM User WHERE google_id = ?`,
        [user.id]
    );

    if (existingUser) {

        return true;

    }

    return false;
}

export const toogleLike = (id, setLikeIds) => {
    setLikeIds((idActuelleDanslikedIds) => {
        const newLikes = new Set(idActuelleDanslikedIds);
        newLikes.has(id) ? newLikes.delete(id) : newLikes.add(id)
        return newLikes;
    })
}

// export const permissionToLocation = async () => {
//     try {
//         const granted = PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             {
//                 title: 'Permission localisation',
//                 message: "Permission d'avoir votre localisation ?",
//                 buttonNeutral: "Me redemander plus tard",
//                 buttonNegative: "Non",
//                 buttonPositive: "Oui",
//             }
//         );
//         console.log('granted', granted)

//         if (granted === 'granted') {
//             console.log("Utilisation de la localisation")
//             return true;
//         } else {
//             console.log("Refus d'utiliser  la localisation")
//             return false;
//         }

//     } catch (error) {
//         console.error('Erreur dans la permission de votre localisation', error)
//         return false;
//     }
// }
export const getLocation = async () => {
    try {
        // Demander la permission
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log('Permission refusée');
            return false;
        }

        // Obtenir la position
        const location = await Location.getCurrentPositionAsync({});
        // console.log('Latitude:', location.coords.latitude);
        // console.log('Longitude:', location.coords.longitude);

        return location.coords;

    } catch (error) {
        console.error('Erreur lors de la récupération de la localisation', error);
        return false;
    }
};



export const editProfilPicture = async (userEmail, setUser) => {//fonction asynchrone car launchImageLibrary retourne une promesse


    try {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();//demande la permission d’accéder à l’appareil photo
        if (!permissionResult.granted) { //granted: objet contenant true or false
            alert("Permission refué");
            return false
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaType: ImagePicker.MediaTypeOptions.Images,  //on autorise uniquement les photos.
            quality: 0.8,//on demande une image compressée à 80% de qualité.
        });

        if (result.canceled) return false // L'utilisateur a annulé

        const asset = result.assets && result.assets[0];// Si result.asset existe, on prend l'objet qui contient le uri et la grandeur de la photo

        if (asset && asset.uri) {
            db.withTransactionSync(() => {
                db.runSync('UPDATE User SET picture = ? WHERE email = ?',
                    [asset.uri, userEmail]
                );
            });
            refreshUser(userEmail, setUser)
            return true;

        }

        return false;

    } catch (error) {
        console.error('Erreur dans lors de la modfication de la photo de profile', error);
        return false;
    }

}


export const editCarPic = async (car, setCar) => {
    try {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();//demande la permission d’accéder à l’appareil photo
        if (!permissionResult.granted) { //granted: objet contenant true or false
            alert("Permission refué");
            return false
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaType: ImagePicker.MediaTypeOptions.Images,  //on autorise uniquement les photos.
            quality: 0.8,//on demande une image compressée à 80% de qualité.
        });

        if (result.canceled) return false // L'utilisateur a annulé

        const asset = result.assets && result.assets[0];// Si result.asset existe, on prend l'objet qui contient le uri et la grandeur de la photo

        if (asset && asset.uri) {
            setCar({ ...car, lien: asset.uri });
            return asset.uri;

        }

        return false;

    } catch (error) {
        console.error('Erreur dans lors de la modfication de la photo de voiture', error);
        return false;
    }

}


export const getDate = () => {
    const date = moment().tz('America/Toronto').format('MMMM-DD-YYYY');
    return date;
}

export const formatNumberWithThousandsSeparator = (number, locale = 'en-US') => {
    const formatter = new Intl.NumberFormat(locale);

    // Format the number  in string using the formatter.
    return formatter.format(number);
}

export const dropDownComponent = (data, car, setCar, styles, type = 'logo') => {
    let dataType = type === 'logo' ? car.brand : car.typeCar;
    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder={`Select ${type === 'logo' ? 'logo' : 'type voiture'}`}
            searchPlaceholder="Search..."
            value={dataType}
            onChange={item => {
                if (type === 'logo') {
                    setCar({ ...car, brand: item.value });
                } else {
                    setCar({ ...car, typeCar: item.value });

                }

            }}

        />
    )

}


//

/*
     const newLikes = new Set(idActuelleDelikedIds); :Si tu utilises un Array ou un Object, c’est pareil : on fait une copie (avec map, spread ..., ou Object.assign) avant de modifier.
     Keychain.setGenericPassword(), une méthode sécurisée pour stocker une paire identifiant/mot de passe.
*/