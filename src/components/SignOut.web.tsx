import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuthActions } from '../utils/Authentication';

export default function SignOut() {
  const {handleAuthenticationLoginOut} = useAuthActions();
  return (
    <TouchableOpacity 
      style={styles.signOutButton}
      onPress={() => {
        handleAuthenticationLoginOut()
      }}
    >
      <View style={styles.signOutView}>
        <Ionicons name="exit-outline" size={22} />
        <Text style={styles.signOutText}> Sign Out </Text>
      </View>
    </TouchableOpacity>
  )    
}

const styles = StyleSheet.create({
  signOutButton: { 
    paddingVertical: 15 
  },
  signOutView: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  signOutText: {
    fontSize: 15,
    marginLeft: 5,
  }
});