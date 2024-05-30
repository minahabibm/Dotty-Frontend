import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import Storage from './Storage';
import { Buffer } from 'buffer';
import { DecodedJwt, User } from '../types/user';
import { useAuthContext } from '../utils/AuthProvider';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { ScreenNavigationProp } from '../types/Navigation';


const authUrl = process.env.AUHT0_DISCOVERY_URI as string;
const redirectUri = AuthSession.makeRedirectUri();

export const getTokens = (ResponseUrl : String) => {
    const params = new URLSearchParams(ResponseUrl.split('?')[1]); // Extract query parameters
    return {
        accessToken : params.get('access_token'),
        idToken : params.get('id_token')
    } 
}

export const decodeJwt = (token : string) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
    }
    const [header, payload, signature] = parts.map(encodedPayload =>  Buffer.from(encodedPayload, 'base64').toString());
    const decodedJwt : DecodedJwt = {
        header: JSON.parse(header),
        payload: JSON.parse(payload),
        signature
    }
    return decodedJwt;
};

// Custom hook to handle authentication
export const useAuthActions = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
    const { signIn, signOut } = useAuthContext();
    
    const handleAuthenticationLoginIn = async () => {
      await WebBrowser.openAuthSessionAsync(authUrl, redirectUri).then(response => {
        if (response?.type === 'success' && response?.url) {
          const tokens = getTokens(response.url);
          const decodedIdToken = decodeJwt(tokens.idToken as string);
          decodedIdToken.payload.accessToken = tokens.accessToken as string;
  
          const user: User = decodedIdToken.payload;
          Storage.setSecureItem("user", JSON.stringify(user)).then(() => signIn(user));
        }
      });
    };
  
    const handleAuthenticationLoginOut = async () => {
      let urlWithHeaders = "http://localhost:8080/api/dotty/oauth2/auth0/logout"
      await Storage.getSecureItem("user")
        .then((user : any) => {
          user = JSON.parse(user)
          // urlWithHeaders = urlWithHeaders + `${encodeURIComponent("Authorization")}=${encodeURIComponent(user.accessToken)}`;
        })
      await WebBrowser.openAuthSessionAsync(urlWithHeaders, redirectUri)
        .then(
          async (response : any) => {
            if(response?.type === 'success') {
              console.log("response"  +  JSON.stringify(response));
              await Storage.deleteSecureItem("user")
            }})
        .finally(() => {
          signOut();
          navigation.dispatch(DrawerActions.closeDrawer())
        })
    }

    return {
      handleAuthenticationLoginIn,
      handleAuthenticationLoginOut,
    };
};