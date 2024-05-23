import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session';
import Logo from '../assets/LogoGoogleSignIn';


WebBrowser.maybeCompleteAuthSession().message;

export default function GoogleSignIn() {

    const client_id = process.env.GOOGLE_WEB_CLIENT_ID as string;
    const redirect_uri = process.env.AUHT0_REDIRECT_URI as string;;
    const discovery = { authorizationEndpoint: process.env.AUHT0_DISCOVERY_URI };

    const [request, response, promptAsync] = useAuthRequest({ 
      clientId: client_id, 
      redirectUri: redirect_uri,
      usePKCE: true
    }, discovery);

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
});