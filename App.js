// Invaluable Company - Inspired by Lethal Company. It (in theory) connects to an actual modded lobby of lethal company. It's roleplays as a work app that an in-game crewmate would have installed on their phone. I took creative liberty with some custom content as well.



//! finish remaking this shit from the snack.
//? currently importing shit
// https://snack.expo.dev/@dalmontron/invaluable-asset

//TODO: add how to mount phone to carrier in help section
//TODO: add seperate sound effects for flashlight and camera flip toggle
//TODO: maybe add an artificial battery life in the app itself that goes up when you charge your "phone" in the ship ingame
//TODO: add in-game clock and current day. maybe scrap sell price as well?
//TODO: when low on battery, have flashlight act on a beacon mode


import { StatusBar } from 'expo-status-bar';
// <StatusBar style="auto" />
import { Text, SafeAreaView, View, StyleSheet, Pressable, Image, ImageBackground, ScrollView, TextInput, Alert, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Video, Audio } from 'expo-av';
// import { Camera } from 'expo-camera';
import { useFonts } from 'expo-font';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>buh</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
