import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { NavigationContainer } from '@react-navigation/native';
// import UserTAccountAuthentication from './src/components/UserTAccountAuthentication';

WebBrowser.maybeCompleteAuthSession().message;

export default function App() {

  return (
    <NavigationContainer>
      <View style={styles.container}>
    
      <Text>Open up App.tsx to start working on your app!</Text>
      
      {/* <UserTAccountAuthentication/> */}

      </View>
    </NavigationContainer>
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
