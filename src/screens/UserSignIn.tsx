import React from 'react';
import { StyleSheet, View } from 'react-native';
import GoogleSignInWeb from '../components/GoogleSignIn.web';

export default function UserSignIn() {
  return (
    <View style={styles.container}>
      <GoogleSignInWeb /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import { Platform } from 'react-native';
// import GoogleSignIn from '../components/GoogleSignIn';
// { Platform.OS === 'web' ? <GoogleSignInWeb />  : <GoogleSignInWeb /> }