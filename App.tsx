import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { NavigationContainer } from '@react-navigation/native';
import Storage from './src/utils/Storage';
import SplashScreen from './src/screens/SplashScreen';
import NavigationStack from './src/navigation';
import UserSignIn from  './src/screens/UserSignIn';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const  [user, setUser] = useState(null);

  useEffect(() => {
    const userPromise = Storage.getSecureItem("user") as any;
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        userPromise.then(async (value: any) => {
          console.log(value);
          setUser(value);
        })
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if(!appIsReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {user===null ? <UserSignIn /> : <NavigationStack /> }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});