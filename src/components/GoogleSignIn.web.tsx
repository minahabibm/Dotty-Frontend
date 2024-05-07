import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Logo from '../assets/LogoGoogleSignIn';

WebBrowser.maybeCompleteAuthSession().message;

export default function GoogleSignIn() {

    const [request, response, promptAsync] = Google.useAuthRequest({ 
        webClientId: process.env.GOOGLE_WEB_CLIENT_ID ,
        iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
        androidClientId: '',
    });

    React.useEffect(() => {
        console.log(response);
        if (response?.type === 'success') {
        }
    }, [response]);

    return (
        <Pressable 
            style={({ pressed }) => [
                pressed ? { opacity: 0.25 } : {opacity: 1},
                styles.button
            ]}
            onPress={() => promptAsync()}
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
    // text: {
    //   fontSize: 16,
    //   lineHeight: 21,
    //   fontWeight: 'bold',
    //   letterSpacing: 0.25,
    //   color: 'white',
    //   marginLeft: 10
    // },
});