import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { Audio } from 'expo-av';

// Screen imports
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import LevelSelectScreen from './src/screens/LevelSelectScreen';

// Create navigation stack
const Stack = createNativeStackNavigator();

// Sound effects preloading
const loadSounds = async () => {
  const popSound = new Audio.Sound();
  const successSound = new Audio.Sound();
  const balloonPopSound = new Audio.Sound();
  
  try {
    await popSound.loadAsync(require('./assets/sounds/pop.mp3'));
    await successSound.loadAsync(require('./assets/sounds/success.mp3'));
    await balloonPopSound.loadAsync(require('./assets/sounds/balloon-pop.mp3'));
    
    // Store sounds globally for easy access
    global.sounds = {
      pop: popSound,
      success: successSound,
      balloonPop: balloonPopSound,
    };
  } catch (error) {
    console.error('Failed to load sounds', error);
  }
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  
  // Load game assets on startup
  useEffect(() => {
    async function prepareGame() {
      try {
        // Load sounds and any other assets
        await loadSounds();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    
    prepareGame();
    
    // Cleanup sounds when app closes
    return () => {
      if (global.sounds) {
        Object.values(global.sounds).forEach(sound => {
          sound.unloadAsync();
        });
      }
    };
  }, []);
  
  if (!appIsReady) {
    // Could return a loading screen here
    return null;
  }
  
  return (
    <Provider store={store}>
      <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator 
                initialRouteName="Home"
                screenOptions={{
                  headerShown: false,
                  animation: 'fade',
                }}
              >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="LevelSelect" component={LevelSelectScreen} />
                <Stack.Screen name="Game" component={GameScreen} />
              </Stack.Navigator>
              <StatusBar style="auto" />
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PaperProvider>
    </Provider>
  );
}
