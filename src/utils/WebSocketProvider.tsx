import React, { createContext, useContext, useState , useEffect, useCallback, useMemo} from 'react';
import { WebSocketContextType, WebSocketProviderProps } from '../types/WebSockets';
import { getAccessToken } from './Authentication';

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
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

    const connect = useCallback(async () => {
        if (!webSocket) {
            try {
                const wsUrl = process.env.DOTTY_WS_URL as string;
                const accessToken = await getAccessToken();
                
                const webSocket = new WebSocket(wsUrl, null, {
                    headers: {
                      Authorization: `Bearer ${accessToken}`
                    }
                });
        
                webSocket.onopen = () => {
                    console.log('WebSocket connected');
                    setWebSocket(webSocket);
                };
                
                // webSocket.onmessage = function(event) {
                //     console.log('Received message:', event.data);
                // };
                
                webSocket.onerror = function(error) {
                    console.error('WebSocket error:', error);
                };
                
                webSocket.onclose = () => {
                    console.log('WebSocket disconnected');
                    setWebSocket(null);
                };

            } catch (error) {
                console.error('Error connecting to WebSocket:', error);
            }
        }
    }, [webSocket]) ;

    const disconnect = useCallback(() => {
        if (webSocket) {
            webSocket.close();
            setWebSocket(null);
        }
    }, [webSocket]);

    const subscribe = useCallback((topic: string) => {
        if (webSocket) {
            webSocket.send(JSON.stringify({ type: 'subscribe', topic: topic }));
        }
    }, [webSocket]);
    
    const unsubscribe = useCallback((topic: string) => {
        if (webSocket) {
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
        <WebSocketContext.Provider 
            value={value}
        >
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
