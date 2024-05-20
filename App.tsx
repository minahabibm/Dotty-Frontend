import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './src/navigation';
import UserSignIn from  './src/screens/UserSignIn';
import Storage from './src/utils/Storage';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const  [user, setUser] = useState() as any;

  useEffect(() => {
    const userPromise = Storage.getSecureItem("user");
    userPromise.then(value => {
      console.log(value);
      setUser(value);
    })
  }, [])

  return (
    <NavigationContainer>
      {/* <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View> */}
      
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
