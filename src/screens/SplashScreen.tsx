import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';


export default function SplashScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Getting User...</Text>
        <ActivityIndicator size="large" />
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