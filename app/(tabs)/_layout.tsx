import { Tabs } from 'expo-router';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Platform, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[(colorScheme ?? 'light') as 'light' | 'dark'].tint,
        headerShown: false,
        tabBarButton: (props: any) => (
          <Pressable
            {...props}
            onPressIn={(ev) => {
              if (Platform.OS === 'ios') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
              props.onPressIn?.(ev);
            }}
          />
        ),
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="connection"
        options={{ href: null }}
      />

      <Tabs.Screen
        name="markePlace"
        options={{
          title: 'market Place',
          tabBarIcon: ({ color }) => <AntDesign name="car" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inscription"
        options={{ href: null }}
      />

      <Tabs.Screen
        name="profile"
        options={{ href: null }}
      />

      <Tabs.Screen
        name="games/games-acceuil"
        options={{
          title: 'Games page',
          tabBarIcon: ({ color }) => <MaterialIcons name="games" size={24} color={color} />,
        }}
      />

      {/* <Tabs.Screen
        name="acceuil"
        options={{href:null}} 
        /> */}

      <Tabs.Screen
        name="carsMap"
        options={{ href: null }}

      />

      <Tabs.Screen
        name="details"
        options={{ href: null }}

      />


    </Tabs>
  );
}
