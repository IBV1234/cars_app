import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, Link, useFocusEffect } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, Dimensions, Image, TextInput, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { } from '../../../fonctions/fonctions';
// import { Buttons, AnimatadeGameBoutton } from '@/components/custom/custom';
import { AnimatadeGameBoutton } from '../../../components/animatedGameBtn';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
const { height, width } = Dimensions.get('window');

export default function GamesPage() {
    const router = useRouter();
    useEffect(() => {
        console.log("Games page mounted");
    }, []);

    const goToGame = () => {
        router.push('/games/car-quiz');
    }

    return (
        <LinearGradient
            style={styles.container}
            colors={['#FF0000', '#0000FF', '#000000']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 0.5, 1]} >

            {/* Contenu principal avec effet see-through */}
            <View style={styles.container}>
                {/* Header avec effet glass */}
                <View style={styles.glassSection}>
                    <Text style={styles.title}>Connaissez vous vraiment les voitures?</Text>

                    {/* Navigation */}
                    <View style={styles.navRow}>
                        <Text style={styles.navItem}>Jouez pour savoir</Text>

                    </View>
                </View>


                {/* Story section */}
                {/* <View style={styles.storyContainer}>
                    <Text style={styles.storyTitle}>Story</Text>
                    <Text style={styles.storyDescription}>
                        Last, close and separated from family, a story can melt unbrought on ancient mystery to escape a long-forgotten cybercity and find their way home.
                    </Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>$16.99 USD</Text>
                        <Text style={styles.availability}>Available now</Text>
                    </View>
                </View> */}


                <View style={styles.gameButtonContainer}>
                    <AnimatadeGameBoutton text={'Jouez'} style={styles.learnMoreButton} function={goToGame} />
                </View>

            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',

    },

    glassSection: {
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