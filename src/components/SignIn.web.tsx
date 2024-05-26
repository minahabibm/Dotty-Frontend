import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import Storage from '../utils/Storage';
import { Buffer } from 'buffer';
import Logo from '../assets/LogoGoogleSignIn';


WebBrowser.maybeCompleteAuthSession();

// interface DecodedJwt {
//     header: Record<string, any>;
//     payload: Payload;
//     signature: string;
// }

// interface Payload {
//     header: Record<string, any>;
//     payload: Record<string, any>;
//     signature: string;
// }

export default function GoogleSignIn() {
    const authUrl = process.env.AUHT0_DISCOVERY_URI as string;
    const redirectUri = AuthSession.makeRedirectUri();


    const decodeJwt = (token : string) => {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid JWT format');
        }
        const [header, payload, signature] = parts.map(encodedPayload =>  Buffer.from(encodedPayload, 'base64').toString());

        return {
            header: header,
            payload: JSON.parse(payload),
            signature
        };
    };

    const handleAuthentication = async () => {
        await WebBrowser.openAuthSessionAsync(authUrl, redirectUri).then(response => {
            if (response?.type === 'success' && response?.url) {
                const params = new URLSearchParams(response.url.split('?')[1]); // Extract query parameters
                const accessToken = params.get('access_token');
                const idToken = params.get('id_token');
                const decodedIdToken = decodeJwt(idToken as  string);
                decodedIdToken.payload.accessToken = accessToken;


            
                // console.log("access token: " +  accessToken );
                // console.log("id token: " + idToken);
                Storage.setSecureItem("user", JSON.stringify(decodedIdToken.payload))
                console.log("decoded id token: " + typeof Storage.getSecureItem("user"));
                
            }
        })
        
    };
    
    React.useEffect(() => {}, []);

    return (
        <Pressable 
            style={({ pressed }) => [
                pressed ? { opacity: 0.25 } : {opacity: 1},
                styles.button
            ]}
            onPress={() => handleAuthentication()}
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