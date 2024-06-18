import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './src/navigation';

// TODO Notification
// cancel would keep on the same screen

export default function App() {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });