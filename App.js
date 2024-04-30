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


// Fonts
function LoadFonts() {
  useFonts({
    'OpenSans_ExtraBold': require('./assets/fonts/Open_Sans/OpenSans-ExtraBold.ttf'),
    'OpenSans_SemiBold': require('./assets/fonts/Open_Sans/OpenSans-SemiBold.ttf'),
    'Jersey_10': require('./assets/fonts/Jersey_10/Jersey10-Regular.ttf')
  });
}


// Return Button in terminal preview screens https://stackoverflow.com/questions/70488802/react-native-how-to-create-elements-and-return-them-in-a-function
function ReturnButton ()
{ return (
  <View>
  {/* button that returns to terminal */}
  <Pressable onPress={() => {navigation.navigate('Terminal'), PlayButtonClick()}}>
    <Text style={ terminalButton }>
      {'--------|RETURN|--------'}
    </Text>
  </Pressable>
  </View>
  );
}


// AUDIO
// Sound effect for clicking on menu elements
function PlayButtonClick() {
  (async () => {
    try {
      await Audio.setIsEnabledAsync(true);
      const sound = new Audio.Sound();
      await sound.loadAsync(require('./assets/audio/ui-button-click.wav'));
      await sound.setVolumeAsync(1);
      await sound.playAsync(true);
    }
    catch(error) {
      console.error(error);
    }
  })();
}

// Background game audio. Will loop continuously.
function PlayGameAudio() {
  (async () => {
    try {
      await Audio.setIsEnabledAsync(false); // Can keep as false so audio doesn't play constantly during development. Switch to true during production
      const sound = new Audio.Sound();
      await sound.loadAsync(require('./assets/audio/game-audio.wav'));
      await sound.setIsLoopingAsync(true)
      await sound.setVolumeAsync(.3);
      await sound.playAsync(true);
    }
    catch(error) {
      console.error(error);
    }
  })();
}


// CONTENT
// Home Page
function Home ({ navigation })
{ return (
  <View style={ styles.main }>
  <ImageBackground source={ crewmateReflection } style={ styles.main }>
  
    {/* Header */}
    <SafeAreaView style={{ flex: 0.3, backgroundColor: 'rgba(233, 52, 41, 0.8)', flexDirection: 'row', alignContent: "center", justifyContent: "center"}}>
      <Image
        style={{height: 150, width: 150, alignSelf: "center"}}
        source={require('./assets/images/mars-icon.png')}
      ></Image>

      <Text style={{color: "black", fontFamily:"OpenSans_ExtraBold", fontSize: 32, textAlign: "center", alignSelf: 'center', paddingLeft: 8}}>
        {"The\nCompany"}
      </Text>
    </SafeAreaView>


    {/* Body */}
    <SafeAreaView style={ styles.main }>
      <Pressable onPress={() => {navigation.navigate('Terminal'), PlayButtonClick()}} style={ home.options }>
        <Text style={ home.text }>
          {'Terminal'}
        </Text>
      </Pressable>

      <Pressable onPress={() => {navigation.navigate('BodyCam'), PlayButtonClick()}} style={ home.options }>
        <Text style={ home.text }>
          {'BodyCam'}
        </Text>
      </Pressable>
    </SafeAreaView>

  </ImageBackground>
  </View>
  );
}


// Bodycam Page
function BodyCam ({ navigation })
{ 
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
  <View style={{ flex: 1 }}>
    <Camera style={{ flex: 1 }} type={type} flashMode={flashMode}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'column-reverse',
        }}>
        <TouchableOpacity
          style={{
            flex: 0.2,
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={() => {
            setFlashMode(
              flashMode === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            );
          }}>
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flashlight </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
          style={{
            flex: 0.2,
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
        </TouchableOpacity>
    </Camera>
  </View>
  );
}


// Terminal Page
function Terminal({ navigation })
{
  const [command, setCommand] = useState('');

  // when submit button is pressed, checks what command the user has put in the textinput. navigates to other screens depending on what command is given
  const checkCommand = () => {
    if(command === 'help'){
      navigation.navigate('Help');
    }
    else if(command === 'logs writerOnTheWalls' || command === 'logs writer')
    {
      navigation.navigate('LogsWriterOnTheWalls');
    }
    else if(command === 'logs lassoMan' || command === 'logs lasso')
    {
      navigation.navigate('LogsLassoMan');
    }
    else
    {
      Alert.alert("Invalid Command");
    }
  };


  return (
    <View style={ styles.main }>
    <ImageBackground source={crewmateReflection} style={ styles.main }>
    <SafeAreaView style={ styles.main }>
      {/* button that checks terminal input */}
      <Pressable onPress={checkCommand}>
        <Text style={ terminalButton }>
          {'----|----SUBMIT----|----'}
        </Text>
      </Pressable>


      {/* user and machine name*/}
      <Text style={ terminal.text }>
        {'sigurd@a7xm0d:~$'}
      </Text>


      {/* terminal input */}
      <TextInput
      style={ terminal.text }
      onChangeText={text => setCommand(text)}
      value={command}
      placeholder="Type 'help' for Commands"
      placeholderTextColor="#009900"
      multiline={true}
      />
    </SafeAreaView>
    </ImageBackground>
    </View>
  );
}



// Help Page
function Help ({ navigation })
{
  const [status, setStatus] = useState({});
  const videoRef = useRef(null);

  return (
    <View style={ styles.main }>
    <ImageBackground source={crewmateReflection} style={ styles.main }>
    <SafeAreaView style={ styles.main }>
      {/* button that returns to terminal */}
      <Pressable onPress={() => {navigation.navigate('Terminal'), PlayButtonClick()}}>
        <Text style={ terminalButton }>
          {'--------|RETURN|--------'}
        </Text>
      </Pressable>

        

        <ScrollView>
          <Text style={ terminal.text }>
            {'Training Video:'}
          </Text>

          <Video
            ref={videoRef}
            style={{width:300, height:200}}
            source={require('./assets/videos/snare-flea-channel.mp4')}
            useNativeControls={true}
            resizeMode='contain'
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <Text style={ terminal.text }>
            {'\nCurrent Commands:\n\n'}

            {"help\n"}

            {"logs lassoMan\n"}

            {"logs writerOnTheWalls\n\n"}
          </Text>
        </ScrollView>
      </SafeAreaView>
      </ImageBackground>
    </View>
  );
}


// Logs: Lasso Man
function LogsLassoMan({ navigation }) {
  return (
    <View style={ styles.main }>
    <ImageBackground source={ crewmateReflection } style={ styles.main }>
    <SafeAreaView style={ styles.main }>
        {/* Clickable Seperator */}
        <Pressable onPress={() => {navigation.navigate('Terminal'), PlayButtonClick() }}>
          <Text style={ terminalButton }>
            {'---|---RETURN---|---'}
          </Text>
        </Pressable>


        <ScrollView>
          <Text style={ terminalPreviewText }>
            {'\nEntry Log "Lasso Man?" (Sep 17, 1968)\n\n'}

            {"So I swear as I was walking past one of the big engine things that branches into multiple hallways, I saw a thing of red at the end of one for a split second before it rounded the corner. Then a few seconds later it comes back and this red ropey skeleton looking thing starts walking towards me! It wasn\'t even moving it\'s legs it was just swaying around as it was floating towards me! I ran away and jumped over one of the scaffolding gaps and waited for a few minutes, but I never saw it again.\n\n"}

            {"Weirdest thing about it though was that I could see it perfectly fine in the dark, I'm pretty sure that's the only reason I saw it at first. It's not like it was glowing or anything though, and it was really dark in there cause Desmond took the aparatus already. When I shined my light on it it didn't make it any easier or harder to see it. And the light didn't go through the loop part of his head, like it just ate the light or something.\n\n"}

            {"Of course no-one believed me. Desmond just kept saying I was probably seeing things and Jess had the gull to say I was freaking out because of Rich, which I'm not. But when that thing got close enough I swear it smelled like Rich somehow. Maybe I am going crazy. It didn't even seem like Jess believed what she was saying though, like she was just regurgitating what Desmond was saying to keep herself sane.\n\n"}

            {"I'm going to sneak in an entry for it in the bestiary. I don't care if they don't believe me. I know what I saw."}
        </Text>

          {/* Lasso Man */}
          <Image
            style={{height: 300, width: 300, contentFit:'contain', alignSelf:'center'}}
            source={require('./assets/images/lassoman.webp')}
          ></Image>
        </ScrollView>
      </SafeAreaView>
      </ImageBackground>
    </View>
  );
}


// Logs: Writer On The Walls
function LogsWriterOnTheWalls({ navigation }) {
  return (
    <View style={ styles.main }>
    <ImageBackground source={ crewmateReflection } style={ styles.main }>
    <SafeAreaView style={ styles.main }>
        {/* Clickable Seperator */}
        <Pressable onPress={() => {navigation.navigate('Terminal'), PlayButtonClick() }}>
          <Text style={ terminalButton }>
            {'---|---RETURN---|---'}
          </Text>
        </Pressable>


        <ScrollView>
          <Text style={ terminalPreviewText }>
            {'\nEntry Log "The Writer on the Walls" (Sep 29, 1968)\n\n'}
        </Text>
        </ScrollView>
      </SafeAreaView>
      </ImageBackground>
    </View>
  );
}


// RUNTIME
export default function App() {
  return (
    <View style={{}}>
      <Text>buh</Text>
    </View>
  );
}

