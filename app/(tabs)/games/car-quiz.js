
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MotorAnimation from '../../../components/motoAnimation';
import { playSound, releaseSound, iphoneVibration, customAlert, stopSound } from '@/fonctions/utils';
import { motorQuestions,rostComments } from '@/constants/carQuestions';
const { height, width } = Dimensions.get('window')

export default function CarQuizPage() {
    const [stateMotoAnimation, setStateMotorAnimation] = useState({startRotation:false,finishAnimation:false});
    const [index, setIndex] = useState(0);
    const [items, setItems] = useState([]);
    const [response, setResponse] = useState({ isCorrect: undefined, index: undefined });
    const [imagesLink, setImagesLink] = useState([]);
    const [badAttemps, setBadAttemps] =useState(1);
    const timer = useRef(null);
    const [colors, setColors] = useState(['#E0E0E0', '#7A7A7A', '#000000']);




    const handleShakingMoto = async () => {
        if (timer.current) {
            console.log("timeout ps encore finit", timer.current)
            return;
        }

        setStateMotorAnimation({ startRotation: true, finishAnimation: false });
        await playSound('v8');
        timer.current = setTimeout(async () => {
            await releaseSound('v8');
            timer.current = null;
            console.log("fin du timeout");
            setStateMotorAnimation({ startRotation: false,finishAnimation:false});
        }, 6010);



    }

    const confirmAnswer = async () => {
        setTimeout(()=>{
        setStateMotorAnimation({ startRotation: false, finishAnimation: true });
        },2000);

    }
        
    const handleResponse = async (isCorrect, index) => {
        if(timer.current){
            alert("Attendez que le song soit terminé avant de répondre!")
           return;
        }

        if (isCorrect) {
            setResponse({ isCorrect: isCorrect, index: index });
            await playSound('cheering');
            iphoneVibration();
             customAlert("Vous avez gagné", "Êtes-vous prête aux prochaines questions ?",confirmAnswer)
            // setIndex((prevIndex) => (prevIndex + 1));
        } else {
            const message = rostComments[0][badAttemps][0].messsage;
            setResponse({ isCorrect: false, index: index })
             message && message.length>0 &&  customAlert("Mauvais réponse", message);
            setBadAttemps((prev)=> {
                if(prev<=3)
                    return prev +1;
                return prev = 0;
            });
        }

    }
    useEffect(() => {
        setItems(motorQuestions);

        const images = motorQuestions.map(items => items.link);

        setImagesLink(images);
    }, [])


    return (

        <LinearGradient
            style={styles.container}
            colors={colors}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 0.5, 1]}
        >
            <View>
                <Text style={styles.title}>
                    Quel type de moteur  vient de se son?
                    cliquez sur le moteur pour savoir 👀
                </Text>
            </View>
            <Pressable onPress={() => handleShakingMoto()}>
                <MotorAnimation height={height * -0.01} left={width * -0.22} widthImage={200} heightImage={200} startRotation={stateMotoAnimation.startRotation} finishAnimation={stateMotoAnimation.finishAnimation}/>
            </Pressable>

            <View style={styles.ImageMotors}>


                {
                    items.length > 0 && items[index] && (items[index].responses.map((question, index) => (
                        <Pressable key={index} style={[styles.navRow,
                        response.index === index && {
                            backgroundColor: response.isCorrect === true ? 'green' : 'red'
                        }]}
                            onPress={() => handleResponse(question.isCorrect, index)}>
                            <Text style={styles.text}>{question.userResponse}</Text>
                        </Pressable>

                    ))
                    )
                }


            </View>

        </LinearGradient>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
    },

    ImageMotors: {
        marginTop: height * 0.20,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        backdropFilter: 'blur(10px)', // Note: Cette propriété ne fonctionne pas sur mobile
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    navRow: {
        borderWidth: 2,
        borderRadius: 30,
        width: '100%',
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    navItem: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    },

    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 10,
    },
});