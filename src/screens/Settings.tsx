import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default function HomeScreen() {

  return (
    <View style={styles.container}>        
        <Text>Settings!</Text>
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