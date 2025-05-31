import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  const handlePlay = () => {
    // TODO: Navigate to level select when implemented
    console.log('Play pressed!');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Puzzle Popit!</Text>
        <Text style={styles.subtitle}>🧩🫧🎈</Text>
        <Button
          mode="contained"
          onPress={handlePlay}
          style={styles.playButton}
        >
          Play
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F5FE',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 32,
    marginBottom: 50,
  },
  playButton: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#4CAF50',
  },
});

export default HomeScreen;
