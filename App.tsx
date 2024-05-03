import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
// import UserTAccountAuthentication from './src/components/UserTAccountAuthentication';

WebBrowser.maybeCompleteAuthSession().message;

export default function App() {

  return (
    <View style={styles.container}>
    
      <Text>Open up App.tsx to start working on your app!</Text>
      
      {/* <UserTAccountAuthentication/> */}

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
