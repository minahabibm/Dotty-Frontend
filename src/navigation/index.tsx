import React from 'react';
import { AuthProvider } from '../utils/AuthProvider';
import Navigator from './Navigator';


function NavigationStack() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}

export default NavigationStack;