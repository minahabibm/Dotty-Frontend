import React, { useState } from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import { useModal } from '../../utils/ModalProvider';
import Logo from '../../assets/LogoAlpaca';
import UserAlpacaModal from './AlpacaModal';

export default function App() {
  const title = "Sign In";
  const { openModal } = useModal();

  React.useEffect(() => {}, []);

  return (
    <Pressable 
      style={({ pressed }) => [
        pressed ? { opacity: 0.25 } : {opacity: 1},
        styles.button
      ]}
      onPress={() => openModal()}
    >
      <Logo />
      <UserAlpacaModal />
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 5,
    backgroundColor: '#FFD746',
    margin: 5
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