import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
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
        options={{href:null}} 
        />

      <Tabs.Screen
        name="markePlace"
        options={{
          title: 'market Place',
          tabBarIcon: ({ color }) =><AntDesign name="car" size={24} color="black" /> ,
        }}
        />
           <Tabs.Screen
        name="inscription"
        options={{href:null}} 
        />

            <Tabs.Screen
        name="profile"
        options={{href:null}} 
        />

            <Tabs.Screen
        name="games"
        options={{href:null}} 
        />

              {/* <Tabs.Screen
        name="acceuil"
        options={{href:null}} 
        /> */}

        <Tabs.Screen
        name="carsMap"
          options={{href:null}} 

      />

       <Tabs.Screen
        name="details"
          options={{href:null}} 

      />
    </Tabs>
  );
}
