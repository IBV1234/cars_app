import { Image } from 'expo-image';
import { StyleSheet, View, Text, Dimensions, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link,useRouter } from "expo-router";
import * as  SQLite  from 'expo-sqlite';
import { useEffect } from 'react';


const { height, width } = Dimensions.get('window');
export const db = SQLite.openDatabaseSync('Cars.db');//nom:Issac

export default function HomeScreen() {
const router = useRouter();

    const createTableUsers=() => db.withTransactionSync(()=> db.runSync("CREATE TABLE IF NOT EXISTS " +
    "User (id INTEGER PRIMARY KEY AUTOINCREMENT,google_id TEXT, name TEXT,email TEXT,picture TEXT, password TEXT,admin INTEGER);" ))


    const createTableCars=() => db.withTransactionSync(()=> db.runSync("CREATE TABLE IF NOT EXISTS " +
        "Cars (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, brand TEXT,year INTEGER, lien TEXT,hp INTEGER,seats INTEGER,price INTEGER,topSpeed INTEGER,description TEXT,typeCar TEXT);" ))


        const DeleteTableCars = () => db.withTransactionSync(() => db.runSync("DROP TABLE IF EXISTS  Cars")); 
        const DeletTableUser = () => db.withTransactionSync(() => db.runSync("DROP TABLE IF EXISTS User")); 
    
   
     
          


     function createTables(){
        createTableUsers();
        createTableCars();
        console.log("Les tables on été créés");
    }
const insertCarsData = () => db.withTransactionSync(() => {
  db.runSync(
    `INSERT INTO Cars (name, brand, year, lien, hp, seats, price, topSpeed, description, typeCar) VALUES
      ('BMW M4 Compétition', 'BMW', 2023, 'bmwM4Competition_car.png', 510, 4, 89000, 290, 'Coupé sportif allemand, propulsion, moteur 6 cylindres en ligne biturbo.', 'sport'),
      ('Mercedes AMG GT', 'Mercedes', 2022, 'mercedesAmgGt_car.png', 530, 2, 120000, 312, 'Coupé sportif hautes performances, V8 biturbo.', 'sport'),
      ('Honda Civic Type R', 'Honda', 2023, 'hondaCivicTypeR_car.png', 329, 4, 48000, 272, 'Compacte sportive japonaise, traction, moteur 4 cylindres turbo.', 'sport'),
      ('Volkswagen GTI MK7', 'Volkswagen', 2019, 'vwGtiMk7_car.png', 245, 5, 35000, 250, 'Icône des compactes sportives, moteur 4 cylindres turbo.', 'sport'),
      ('Audi R8', 'Audi', 2022, 'audiR8_car.png', 620, 2, 160000, 330, 'Supercar allemande, V10 atmosphérique, transmission intégrale.', 'sport'),
      ('Porsche GT3 RS', 'Porsche', 2023, 'porscheGt3Rs_car.png', 525, 2, 230000, 296, 'Version radicale de la 911, moteur 6 cylindres à plat, usage circuit.', 'sport')
    ;`
);
console.log("Données insérées dans la table Cars");
});

    useEffect(() => {
      //createTables();

      //createTableCars();
      //insertCarsData();
      //DeletTableUser();
      //DeleteTableCars()
      //insertCarsData()
    },[]);

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('@/assets/images/index_car2_image.jpg')}
          style={styles.carLogo}
          contentFit="cover"
        />
      </View>

      <LinearGradient style={styles.bottomViewIndex}
        colors={['rgba(59, 2, 2, 0.8)', 'rgba(0, 0, 0, 0.5)']} // Rouge en haut, noir en bas
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Text style={styles.title}>Bienvenue sur Cars star</Text>

        <Pressable style={styles.boutton} onPress={() => { router.push('/(tabs)/connection'); }}>
          <Text style={styles.text}> connexion</Text>
        </Pressable>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <Text style={{ color: 'white' }}>Pas de compte? </Text>
          <Link href={"/inscription"} style={{ color: 'white', textDecorationLine: 'underline' }}>
            Inscrivez-vous
          </Link>
        </View>

      </LinearGradient>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
    position: 'relative',
    gap: 8,

  },
  bottomViewIndex: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.3,
    width: width,
    borderRadius: 25,
    gap: 20,
  },
  boutton: {
    justifyContent: 'center',
    borderRadius: 20,
    width: 250,
    height: 50,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    backgroundColor: '#8B0000',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: 'white',
  },
  title:{
     fontSize: 30,
    color: 'white',
  },
  carLogo: {
    height: height * 0.48,
    width: width,
    borderRadius: 10,

  },
});
