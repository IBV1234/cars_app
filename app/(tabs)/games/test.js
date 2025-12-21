
// #1 LORS QUE CLIQUE LE ANIMATED VIEW VAS EN HAUT OU EN BAS EN ADITIONNANT LA VALEUR 

/*    
   const translateY = useSharedValue(0)
    const handlePressDown = () => {
        translateY.value = withSpring( translateY.value + 50);
    }
    const handlePressUp= () => {
        translateY.value = withSpring( translateY.value - 50);
    }

    <View style={{alignSelf:'center',marginTop:100}}>
                <Animated.View
                    style={[{
                        borderBlockColor:'black',
                        borderWidth:1,
                        width:100,
                        height: 100,
                        backgroundColor: 'pink',
                    },{transform:[{translateY}]}]}>

                </Animated.View>
                <Button onPress={handlePressDown} title='Down'> </Button>
                <Button onPress={handlePressUp} title='Up'> </Button>

            </View>
*/


// #2 LORS QUE CLIQUE LE ANIMATED VIEW VAS EN HAUT OU EN BAS EN MULTIPLIANT LA VALEUR 
/*

   const handlePressDown = () => {
        translateY.value = translateY.value + 50;
    };

    const handlePressUp = () => {
        translateY.value = translateY.value - 50;
    };

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY:  withSpring(translateY.value *2)}],
    }));


        <View style={{ alignSelf: 'center', marginTop: 100 }}>
                <Animated.View style={[styles.test, animatedStyles]}>

                </Animated.View>
                <Button onPress={handlePressDown} title='Down'> </Button>
                <Button onPress={handlePressUp} title='Up'> </Button>

            </View>
*/

//#3 ANIMER UNE VUE DE GAUCHE À DOROITE À L'INFINIE AVEC L'ANIMATION PAR DÉFAUT (INOUT)
//#lINK POUR PLUS DE DÉTAIL ET OPTIONS:https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/customizing-animation


/*

    const inOutAnim = useSharedValue( width /3);
    const duration = 1500;

    const [refresh, setRefresh] = useState(0);  
    const [reapeatAnim, setReatpAnim] = useState(-1);    
  

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX:  inOutAnim.value}],
    }));

        useEffect(()=>{
            inOutAnim.value = withRepeat(
                withTiming(-inOutAnim.value,{
                    duration: duration,
                    //easing:Easing.inOut(Easing.quad) //commence l’animation lentement, puis accélérer un peu et ralentir à nouveau vers la fin.
                }),
                reapeatAnim, // -1 = répéter à l'infinie /1 = une fois / 2 = deux fois
                true // true =indique si l’animation doit revenir en arrière après chaque répétition/ false = joue l’animation puis recommence depuis le début
            )
        },[reapeatAnim])


    const goToGame = () => {
        router.push('/games/car-quiz');
    }
    const forceRefresh = () => {setRefresh(r => r + 1);setReatpAnim(-1)}

    const stopAnimation =()=>{
        setReatpAnim(1);
    }
  <View style={{ alignSelf: 'center', marginTop: 100 }}>
                <Animated.View style={[styles.test, animatedStyles]}>

                </Animated.View>
                <Button onPress={forceRefresh} title='Refresh'></Button>
                <Button onPress={stopAnimation} title='Stop animation'></Button>

            </View>
*/
