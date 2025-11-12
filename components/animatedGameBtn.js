import React, { useEffect } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withSpring, 
    withRepeat,
    withSequence,
    withTiming,
    Easing 
} from 'react-native-reanimated';

export const AnimatadeGameBoutton = ({ text, fonction, style }) => {
    const scale = useSharedValue(1);

    // Animation de battement de cœur au chargement
    useEffect(() => {
        scale.value = withRepeat(
            withSequence(
                withTiming(1.1, { duration: 400, easing: Easing.inOut(Easing.ease) }),
                withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }),
                ),
            -1, // Répétition infinie
            2000 // Délai de 2 secondes entre chaque battement
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.9, { damping: 8, stiffness: 300 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 8, stiffness: 300 });
        
        fonction();
    };

    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={style ? style : [styles.boutton, { backgroundColor: 'rgba(218, 5, 5, 0.8)', alignSelf: 'center' }]}
            >
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    boutton: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    text: {
        color: 'white', 
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});