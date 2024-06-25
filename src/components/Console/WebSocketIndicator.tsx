import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet, Animated, Easing } from 'react-native';
import { WebSocketIndicatorProps } from '../../types/WebSockets';


export default function WebSocketIndicator({ websocket } : WebSocketIndicatorProps) {
  const [animatedValue] = useState(new Animated.Value(0));


  const indicatorColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FF073A', '#39FF14'],
  });

  const animateIndicator = (connected: boolean) => {
    Animated.timing(animatedValue, {
      toValue: connected ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if(websocket?.OPEN) {
      animateIndicator(true);
    } else {
      animateIndicator(false);
    }
  }, [websocket]);

 return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle, 
          { backgroundColor: indicatorColor },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 5,
    right: Platform.OS === 'web' ? 16 : 6,
    zIndex: 10
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
});
