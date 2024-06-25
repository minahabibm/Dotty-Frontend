import React from 'react';
import { WebSocketProvider } from '../utils/WebSocketProvider';
import Console from '../components/Console'

export default function ConsoleScreen() {
  
  return (
    <WebSocketProvider>
      <Console />
    </WebSocketProvider>
  );
}