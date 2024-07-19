import React from 'react';
import { AuthProvider } from '../utils/AuthProvider';
import { GlobalStateProvider } from '../utils/GlobalStateProvider';
import Navigator from './Navigator';


function NavigationStack() {
  return (
    <AuthProvider>
      <GlobalStateProvider>
        <Navigator />
      </GlobalStateProvider>
    </AuthProvider>
  );
}

export default NavigationStack;