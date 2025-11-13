
import { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TextInput, ScrollView, Pressable } from 'react-native';

const {height,width} = Dimensions.get('window')
export default function CarQuizPage() {

    return (
        <View style={styles.container}>
            <View style={styles.glassSection}>
                <Text style={{ color: 'white' }}> Allo</Text>

            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    glassSection: {
        
        height:70,
        alignItems:'center',
        marginTop:height *0.10,
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
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 15,
    },
    navRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    navItem: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginHorizontal: 20,
        marginVertical: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },

    storyContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    storyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    storyDescription: {
        fontSize: 14,
        color: 'white',
        lineHeight: 20,
        marginBottom: 15,
    },
    learnMoreContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    learnMoreButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderWidth: 1,
        alignSelf: 'center',
        width: 150,
        borderRadius: 25,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },

    gameButtonContainer: {
        marginTop: 20,
    },
});