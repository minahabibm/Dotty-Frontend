import React from 'react';
import { StyleSheet, View } from 'react-native';
import SignInWeb from '../components/SignIn.web';

export default function UserSignIn() {
  return (
    <View style={styles.container}>
      <SignInWeb /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});