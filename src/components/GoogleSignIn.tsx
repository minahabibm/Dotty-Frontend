import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import type { User } from '@react-native-google-signin/google-signin';

type ErrorWithCode = Error & { code?: string };
type State = {
  error?: ErrorWithCode;
  userInfo?: User;
};

GoogleSignin.configure({
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    iosClientId:  process.env.GOOGLE_IOS_CLIENT_ID, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER

    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    // hostedDomain: '', // specifies a hosted domain restriction
    // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    // accountName: '', // [Android] specifies an account name on the device that should be used
    // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

export default function GoogleSignIn() {
    const [state, setState] =  useState({
        userInfo: undefined,
        error: undefined,
    });

    const GoogleLogin = async () => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        return userInfo;
    };

    const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
        //   setState({ userInfo });
        } catch (error) {
    //       if (isErrorWithCode(error)) {
    //         switch (error.code) {
    //           case statusCodes.NO_SAVED_CREDENTIAL_FOUND:
    //             // Android only. No saved credential found, try calling `createAccount`
    //             break;
    //           case statusCodes.SIGN_IN_CANCELLED:
    //             // sign in was cancelled
    //             break;
    //           case statusCodes.ONE_TAP_START_FAILED:
    //             // Android and Web only, you probably have hit rate limiting.
    //             // On Android, you can still call `presentExplicitSignIn` in this case.
    //             // On the web, user needs to click the `WebGoogleSigninButton` to sign in.
    //             break;
    //           case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //             // Android-only: play services not available or outdated
    //             break;
    //           default:
    //           // something else happened
    //         }
    //       } else {
    //         // an error that's not related to google sign in occurred
    //       }
        }
      };

    return(
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            // disabled={state.isSigninInProgress}
        />
    );

}
const styles = StyleSheet.create({});



// const signOut = async () => {
//   GoogleSignin.revokeAccess();
//   GoogleSignin.signOut();
//   router.replace("/authentication");
// };