import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import {makeRedirectUri, useAuthRequest} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Logo from '../assets/LogoChsh';


WebBrowser.maybeCompleteAuthSession().message;

export default function App() {
  const title = "Sign In";
  
  const discovery = {
    authorizationEndpoint: 'https://api.schwabapi.com/v1/oauth/authorize',
  };

  const redirectUri = makeRedirectUri();
  // const redirectUri = makeRedirectUri({
  //   scheme: '',
  //   path: '/api'
  // });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "",
      redirectUri: "https://127.0.0.1",
    },
    discovery
  );


  React.useEffect(() => {
    console.log(response)
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
    elevation: 3,
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