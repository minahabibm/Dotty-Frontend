import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useWebSocket } from '../../utils/WebSocketProvider';
import UpdatesList from './UpdatesList';
import { Message } from '../../types/WebSockets';
import WebSocketIndicator from './WebSocketIndicator';
import RetryConnection from './RetryConnection';

export default function Console() {
  const { webSocket, connect, disconnect, subscribe, unsubscribe } = useWebSocket();
  const [messagesList, setMessagesList]  =  useState<Message[]>([]);
  const initialConnectionAttempted = useRef(false);
  const topics = ['/topic/public',  '/queue/private'];


  const onComponentMount = async () => {
    connect().catch((error) => {
      console.error('Failed to connect:', error);
    });
    initialConnectionAttempted.current = true;
  }

  useEffect(() => {
    onComponentMount();
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    topics.forEach(topic => {
      subscribe(topic);
    });
    return () => {
      topics.forEach(topic => {
        unsubscribe(topic);
      });
  };
  }, [subscribe, unsubscribe])

  useEffect(() => {
    if(webSocket) {
      webSocket.onmessage = (event) => {
        const message : Message = JSON.parse(event.data) 
        setMessagesList((prevMessages) => [message, ...prevMessages]);
      }

      webSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }, [webSocket])

  return (
    <SafeAreaView style={styles.container}>
      <WebSocketIndicator websocket={webSocket} />
      <UpdatesList messages={messagesList} />  
      {!webSocket && initialConnectionAttempted.current && <RetryConnection connect={connect} />}
    </SafeAreaView>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
  //   justifyContent: 'center',
  },
});



// useFocusEffect(
//   useCallback(() => {
//     console.log('ConsoleScreen is focused');
//     if (isRendered && !webSocket) {
//       console.log('WebSocket is closed or not connected, attempting to reconnect');
//       connect();
//     }
//     return () => {
//       console.log('ConsoleScreen is unfocused');
//     };
//   }, [webSocket])
// );