import React, { lazy, Suspense } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Platform } from 'react-native';
import GoogleSignInWeb from '../components/GoogleSignIn.web';

const GoogleSingIn = lazy(() => import('../components/GoogleSignIn'));

export default function UserSignIn() {

  return (
    <View style={styles.container}>
      { Platform.OS === 'web' ?
        <GoogleSignInWeb /> : 
        <Suspense fallback={()=> <Text>Loading ....</Text>}>
          <GoogleSingIn /> 
        </Suspense>
      }
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