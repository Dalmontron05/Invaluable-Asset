// Invaluable Company - Inspired by Lethal Company. It (in theory) connects to an actual modded lobby of lethal company. It's roleplays as a work app that an in-game crewmate would have installed on their phone. I took creative liberty with some custom content as well.



//! finish remaking this shit from the snack.
//? currently importing shit
// https://snack.expo.dev/@dalmontron/invaluable-asset

//TODO: add how to mount phone to carrier in help section
//TODO: add seperate sound effects for flashlight and camera flip toggle
//TODO: maybe add an artificial battery life in the app itself that goes up when you charge your "phone" in the ship ingame
//TODO: add in-game clock and current day. maybe scrap sell price as well?
//TODO: when low on battery, have flashlight act on a beacon mode


// IMPORTS
import { StatusBar } from 'expo-status-bar';
// <StatusBar style="auto" />
import { Text, SafeAreaView, View, StyleSheet, Pressable, Image, ImageBackground, ScrollView, TextInput, Alert, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Video, Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import { useFonts } from 'expo-font';


// GLOBAL VARIABLES
const screenWidth = Dimensions.get('window').width;
const Stack = createStackNavigator();
// background image that's supposed to represent a crewmate's reflection
const crewmateReflection = require('./assets/images/1000-quota-stare.jpg');


// "CSS"
const styles = StyleSheet.create({
  // Used for main wrapping containers like the safeareaviews and background image
  main: { 
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(38, 36, 31, 0.9)"
  }
});

const home = StyleSheet.create({
  options: {
    backgroundColor: "rgba(26, 24, 21, 0.7)"
  },
  text: {
    color: 'rgb(233, 52, 41)',
    textAlign: "center",
    fontSize: 40,
    fontFamily: "OpenSans_SemiBold",
    padding: 4,
    borderBottomColor: 'rgb(233, 52, 41)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});

// used for terminal page and all of it's "terminal preview pages", like the logs screens.
const terminal = StyleSheet.create({
  text: {
    color: '#00ff00',
    fontSize: 30,
    fontFamily: "Jersey_10"
  },
  tempButton: {
    textAlign: "center"
  }
});

const terminalPreview = StyleSheet.create({
  tempText: {
    fontSize: 20
  }
});
const terminalButton = StyleSheet.compose(terminal.text, terminal.tempButton);
const terminalPreviewText = StyleSheet.compose(terminal.text, terminalPreview.tempText);


// RUNTIME
export default function App() {
  return (
    <View style={{}}>
      <Text>buh</Text>
    </View>
  );
}

