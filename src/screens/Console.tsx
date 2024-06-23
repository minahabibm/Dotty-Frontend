import React from 'react';
import { StyleSheet } from 'react-native';
import { WebSocketProvider } from '../utils/WebSocketProvider';
import Console from '../components/Console'

export default function HomeScreen() {
 
  return (
    <WebSocketProvider>
       <Console />
    </WebSocketProvider>
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