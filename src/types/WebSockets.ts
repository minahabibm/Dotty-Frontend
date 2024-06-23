import { ReactNode } from 'react';

export interface WebSocketContextType {
    webSocket: WebSocket | null;
    connect: () => void;
    disconnect: () => void;
    subscribe: (topic: string) => void;
    unsubscribe: (topic: string) => void;
};

export interface WebSocketProviderProps {
    children: ReactNode;
};

export type Message = {
    type: string;
    topic: string | null;
    message: string | null;
};

export interface UpdatesListProps {
    messages: Message[];
}

export interface ConsoleTextProps {
    data: Message; 
}
