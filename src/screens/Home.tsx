import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserTAccountAuthentication from '../components/UserTradingAuth/';

export default function HomeScreen() {

  return (
    <View style={styles.container}>
        <Text>Dotty!</Text>        
        <UserTAccountAuthentication/>
    </View>
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