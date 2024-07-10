import React, { createContext, useContext, useState, useCallback, useMemo} from 'react';
import { WebSocketContextType, WebSocketProviderProps } from '../types/WebSockets';
import { getAccessToken } from './Authentication';
import { DOTTY_WS_URL as wsUrl } from '@env';

export declare var WebSocket: {
    prototype: WebSocket;
    new (
      uri: string,
      protocols?: string | string[] | null,
      options?: {
        headers?: { [headerName: string]: string };
        [optionName: string]: any;
      }
    ): WebSocket;
    readonly CLOSED: number;
    readonly CLOSING: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);
const WebSocketProvider : React.FC<WebSocketProviderProps> = ({ children }) => {
    const [webSocket, setWebSocket] =  useState<WebSocket | null | undefined>(undefined);

    const initializeWebSocket = async () => {
        
        if (!webSocket) {
            const accessToken = await getAccessToken();
            // console.log("WebSocket: ", accessToken);
            const webSocketInstance = new WebSocket(wsUrl, null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return new Promise<WebSocket>((resolve, reject) => {    
                webSocketInstance.onopen = () => {
                    console.log('WebSocket connected');
                    setWebSocket(webSocketInstance);
                    resolve(webSocketInstance);
                };
    
                webSocketInstance.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    setWebSocket(null);
                    reject(error);
                };
    
                webSocketInstance.onclose = () => {
                    console.log('WebSocket disconnected');
                    setWebSocket(null);
                };
            });
        } else {
            return Promise.resolve(webSocket);
        }
    };

    const connect = useCallback(async () => {
        try {
            if (!webSocket || webSocket.readyState === WebSocket.CLOSED) {
              await initializeWebSocket();
            }
        } catch (error) {
            console.error('Failed to connect:', error);
            // throw error; // Re-throw error to be handled by caller
        }
    }, [webSocket]);

    const disconnect = useCallback(() => {
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.close();
        }
    }, [webSocket]);

    const subscribe = useCallback((topic: string) => {
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(JSON.stringify({ type: 'subscribe', topic }));
        } 
    }, [webSocket]);

    const unsubscribe = useCallback((topic: string) => {
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(JSON.stringify({ type: 'unsubscribe', topic }));
        }
    }, [webSocket]);

    const value = useMemo(() => ({
        webSocket,
        connect,
        disconnect,
        subscribe,
        unsubscribe,
    }), [webSocket, connect, disconnect, subscribe, unsubscribe]);

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
}

const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);

    if (context === undefined) {
        throw new Error('useWebSocket must be used within an WebSocketProvider');
    }
    return context;
};

export { WebSocketProvider, useWebSocket };
