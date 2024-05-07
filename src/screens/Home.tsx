import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import UserTAccountAuthentication from '../components/UserTAccountAuthentication';
import UserSignIn from './UserSignIn';

WebBrowser.maybeCompleteAuthSession();

export default function HomeScreen() {

  return (
    <View style={styles.container}>
        <Text>Dotty!</Text>

        <UserSignIn />
        
        <UserTAccountAuthentication/>
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