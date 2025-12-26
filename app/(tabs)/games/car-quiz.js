
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MotorAnimation from '../../../components/motoAnimation';
import {playSound,stopSound,iphoneVibration} from '@/fonctions/utils';
import { motorQuestions } from '@/constants/carQuestions';
const { height, width } = Dimensions.get('window')

export default function CarQuizPage() {
    const [startRotation, setStartRotation] = useState(false);
    const [index, setIndex] = useState(0);
    const [items, setItems] = useState([]);
    const [response, setResponse] = useState({ isCorrect: undefined, index: undefined });
    const [imagesLink, setImagesLink] = useState([]);



    const handleShakingMoto =  async() => {

        setStartRotation((prev) => prev ? false : true);
         await playSound('v8');
        setTimeout( async () => {
            setStartRotation(false);
            await stopSound();
        }, 6010);


    }
    const handleResponse = async (isCorrect, index) => {
        setStartRotation(false);
        if (isCorrect) {
            setResponse({ isCorrect: isCorrect, index: index });
            await playSound('cheering');
            iphoneVibration();
            // setIndex((prevIndex) => (prevIndex + 1));
        } else {
            setResponse({ isCorrect: false, index: index })
        }

    }
    useEffect(() => {
        setItems(motorQuestions);

        const images = motorQuestions.map(items => items.link);

        setImagesLink(images);
    }, [])

    useEffect(() => {
    }, [startRotation])


    return (

        <LinearGradient
            style={styles.container}
            colors={['#E0E0E0', '#7A7A7A', '#000000']}
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
                <MotorAnimation height={height * -0.01} left={width * -0.22} widthImage={200} heightImage={200} startRotation={startRotation} />
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