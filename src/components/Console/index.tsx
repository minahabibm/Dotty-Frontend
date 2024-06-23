import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebSocketProvider, useWebSocket } from '../../utils/WebSocketProvider';
import UpdatesList from './UpdatesList';
import { Message } from '../../types/WebSockets';


export default function Console() {
    const { webSocket, connect, disconnect, subscribe, unsubscribe } = useWebSocket();
    const [messagesList, setMessagesList]  =  useState<Message[]>([]);
  
    useEffect(() => {   
        connect();
        return () => {
            disconnect();
        };
    }, []);

    useEffect(() => {
        console.log("webSocket: " + webSocket);
        const topics = ['/topic/public'];
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
        }
    }, [webSocket])
  
    return (
      <WebSocketProvider>
        <View style={styles.container}>
            <UpdatesList messages={messagesList} />  
        </View>
      </WebSocketProvider>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
  });