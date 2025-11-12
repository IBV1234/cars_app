// components/AnimatedBackground.jsx
import {useEffect} from 'react';
import { Canvas, Circle, vec, SweepGradient } from '@shopify/react-native-skia';
import { useWindowDimensions } from 'react-native';
import { useSharedValue, withRepeat, withTiming, useDerivedValue } from 'react-native-reanimated';

const AnimatedBackground = () => {
  const { width, height } = useWindowDimensions();
  
  // Animation values
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 3000 }), -1, true); 
    scale.value = withRepeat(withTiming(1.2, { duration: 4000 }), -1, true);
  }, []);

  const animatedCenter = useDerivedValue(() => {
    return vec(width * 0.5, height * 0.3 + progress.value * 100);
  });

  const animatedScale = useDerivedValue(() => {
    return scale.value;
  });

  return (
    //prend tout l'écran en position absolue
    <Canvas style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <Circle cx={width * 0.5} cy={height * 0.5} r={width * 0.7} transform={[{ scale: animatedScale }]}>
        <SweepGradient
          c={animatedCenter}//Dégradé circulaire qui tourne autour du centre animé
          colors={['#FF0000', '#0000FF', '#FF0000']}
        />
      </Circle>
    </Canvas>
  );
};

export default AnimatedBackground;

/*
progress: Valeur qui va de 0 à 1 pour animer la position

scale: Valeur pour l'échelle (taille) du cercle

 progress: de 0 à 1 en 3 secondes, en répétition infinie

        withTiming(1, {duration: 3000}): Animation fluide vers 1 en 3s

        withRepeat(..., -1, true): Répète indéfiniment (-1) en alternance (true)

Anime scale: de 1 à 1.2 en 4 secondes, répétition infinie


animatedCenter :
        width * 0.5: Centre horizontal (50% de la largeur)

        height * 0.3 + progress.value * 100: Centre vertical à 30% de la hauteur + animation de 100px
*/