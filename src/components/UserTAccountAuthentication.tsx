import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import {makeRedirectUri, useAuthRequest} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Logo from '../assets/LogoChsh';


WebBrowser.maybeCompleteAuthSession().message;

export default function App() {
  const authorization_endpoint = process.env.CHSH_AUTHORIZATION_ENDPOINT as string;
  const client_id = process.env.CHSH_AUTHORIZATION_KEY as string;
  const redirect_uri = process.env.CHSH_AUTHORIZATION_REDIRECT_URI as string;
  const title = "Sign In";

  const discovery = { authorizationEndpoint: authorization_endpoint};
  const redirectUri = makeRedirectUri();
  const [request, response, promptAsync] = useAuthRequest({ 
    clientId: client_id, 
    redirectUri: redirect_uri,
    usePKCE: true
  }, discovery);

  React.useEffect(() => {
    // console.log(response)
    // console.log(redirectUri + " " + redirect_uri)
    if (response?.type === 'success') {
      const { code } = response.params;
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
      <Text style={styles.text}>{title}</Text>
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
    elevation: 5,
    backgroundColor: '#00A0DF',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: 10
  },
});