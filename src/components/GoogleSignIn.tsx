import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
    User,
    NativeModuleError    
  } from '@react-native-google-signin/google-signin';
import axios from 'axios';

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
        // userInfo: undefined,
        // error: undefined,
    });
    const [isSigninInProgress, setIsSigninInProgress] = useState(false);

    const GoogleLogin = async () => {
      setIsSigninInProgress(true);
      
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo)
        const { serverAuthCode, idToken } = userInfo;
        // Send the authorization code.
        if(serverAuthCode && idToken) {
          await sendAuthorizationCode(serverAuthCode, idToken)
          setState({ userInfo: userInfo, error: undefined })
        } else {
          throw "errror with user login";
        }

      } catch (error) {
        if (isErrorWithCode(error as NativeModuleError)) {
          // const typedError = error as NativeModuleError;
          switch (error) {
            case statusCodes.SIGN_IN_CANCELLED:
              // sign in was cancelled
              console.log(statusCodes);
              break;
            case statusCodes.IN_PROGRESS:
              console.log(statusCodes);
              break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              // Android-only: play services not available or outdated
              console.log(statusCodes);
              break;
            default:
            // something else happened
          }
        } else {
          console.log("error")
          // an error that's not related to google sign in occurred
        }
      } finally {
        setIsSigninInProgress(false);
      }
    };

    useEffect(() => {
      console.log(state);
    },[state]);
    
    return(
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
            onPress={GoogleLogin}
            disabled={isSigninInProgress}
        />
    );

}

const sendAuthorizationCode = async (authorizationCode : String, idToken : String) => {
  try {
    const response = await axios({
        method: 'POST',
        url: 'http://localhost:8080/api/oauth2/google/login',
        data: {
          code: authorizationCode,
          idToken: idToken
        }
      }); 
    console.log('Authorization code sent successfully');
    // Handle response from the backend if needed
  } catch (error) {
    console.error('Error sending authorization code to backend:', error);
    // Handle error
  }
};

const isErrorWithCode = (error: ErrorWithCode) =>  [statusCodes.IN_PROGRESS || statusCodes.PLAY_SERVICES_NOT_AVAILABLE || statusCodes.SIGN_IN_CANCELLED || statusCodes.SIGN_IN_REQUIRED].includes(error.code ||  '');

const styles = StyleSheet.create({});


// const signOut = async () => {
//   GoogleSignin.revokeAccess();
//   GoogleSignin.signOut();
//   router.replace("/authentication");
// };