import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import axios from 'axios';
import { Buffer } from 'buffer';
import { TokenParams } from '../types/Authentication';
import { DecodedJwt, User } from '../types/User';
import { ScreenNavigationProp } from '../types/Navigation';
import UserProvider from './UserProvider';
import { useAuthContext } from './AuthProvider';
import { 
  AUTH0_CLIENT_ID as clientId, 
  AUTH0_CLIENT_SECRET  as clientSecret, 
  AUTH0_DISCOVERY_URI as authUrl, 
  AUTH0_REFRESH_URI as refreshUrl, 
  AUTH0_SIGNOUT_URI 
} from '@env';

let urlWithHeaders = AUTH0_SIGNOUT_URI;
const redirectUri = AuthSession.makeRedirectUri();


const getTokens = (ResponseUrl : String) : TokenParams=> {
  const params = new URLSearchParams(ResponseUrl.split('?')[1]); // Extract query parameters
  return {
    accessToken : params.get('access_token'),
    refreshToken : params.get('refresh_token'),
    idToken : params.get('id_token')
  } 
}

const decodeJwt = (token : string) : DecodedJwt => {
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

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeJwt(token);
    const expirationDate = parseInt(decoded.payload.exp, 10);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return expirationDate < currentTime;
  } catch (error) {
    console.error('Invalid token', error);
    return true;
  }
};

const refreshTokens = async (): Promise<void> => {
  let user = await UserProvider.getUser();
  const refreshToken = user.refreshToken;
  var options = {
    method: 'POST',
    url: refreshUrl,
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken
    })
  };
  
  axios.request(options).then(async (response) => {
    if (response.status === 200) {
      user.accessToken = response.data['access_token'];
      user.refreshToken = response.data['refresh_token'];
      await UserProvider.setUser(user);
    }
  }).catch((error) => {
    console.error(error);
  });
}

// TODO Reroute user to login page for 401 error.
export const getAccessToken = async (): Promise<String |  undefined> => {
  let user = await UserProvider.getUser();
  const accessToken = user.accessToken;
  if(isTokenExpired(accessToken)) {
    await refreshTokens();
    await UserProvider.getUser().then(user => {
      console.log("refreshed access token: ", user.accessToken);
      return user?.accessToken;
    });
  } else {
    console.log("access token: ", user.accessToken);
    return accessToken;
  }
}

// Custom hook to handle authentication
export const useAuthActions = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
    const { signIn, signOut } = useAuthContext();
    
    const handleAuthenticationLoginIn = async () => {
      await WebBrowser.openAuthSessionAsync(authUrl, redirectUri).then(async response => {
        if (response?.type === 'success' && response?.url) {
          const {accessToken, refreshToken, idToken} = getTokens(response.url);
          const decodedIdToken = decodeJwt(idToken as string);
          decodedIdToken.payload.accessToken = accessToken as string;
          decodedIdToken.payload.refreshToken = refreshToken as string;
  
          const user: User = decodedIdToken.payload;
          await UserProvider.setUser(user)
            .then(() => signIn(user));
        }
      });
    };
  
    const handleAuthenticationLoginOut = async () => {
      await UserProvider.getUser()
        .then((user: User) => urlWithHeaders = urlWithHeaders + `?${("Authorization")}=${(user.accessToken)}`) // encodeURIComponent
      
      await WebBrowser.openAuthSessionAsync(urlWithHeaders, redirectUri)
        .then(
          async (response : any) => {
            if(response?.type === 'success') {
              await UserProvider.deleteUser();
            }})
        .finally(() => {
          signOut();
          urlWithHeaders = AUTH0_SIGNOUT_URI;
          navigation.dispatch(DrawerActions.closeDrawer());
        })
    }

    return {
      handleAuthenticationLoginIn,
      handleAuthenticationLoginOut,
    };
};