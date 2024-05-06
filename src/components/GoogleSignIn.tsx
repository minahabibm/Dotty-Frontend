import React, { useEffect } from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';


export default function GoogleSignIn() {
    // clientId: "162286306085-o0qtc2r5g95ro26po163c5skd40o45eg.apps.googleusercontent.com",
    // iosClientId: "162286306085-l4sjg8lnq993qbonch9o5ltppelip65j.apps.googleusercontent.com",
    
   

    return(
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => {
                // initiate sign in
            }}
            // disabled={isInProgress}
        />
    );

}
const styles = StyleSheet.create({});