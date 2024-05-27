import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Logo from '../assets/LogoGoogleSignIn';
import { useAuthActions } from '../utils/Authentication'

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
    const {handleAuthenticationLoginIn} = useAuthActions();
    
    return (
        <Pressable 
            style={({ pressed }) => [
                pressed ? { opacity: 0.25 } : {opacity: 1},
                styles.button
            ]}
            onPress={() => handleAuthenticationLoginIn()}
        >
            <Logo />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
      flexDirection:  'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 1,
      paddingHorizontal: 15,
      borderRadius: 4,
      elevation: 10,
    //   backgroundColor: '#00A0DF',
    },
});