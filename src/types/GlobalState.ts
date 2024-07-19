
import { ReactNode } from 'react';

export interface GlobalState {
    activeTradingAccount: boolean;
}

export interface GlobalContextType {
    state: GlobalState;
    setActiveTradingAccount: (value: boolean) => void;
}

export interface GlobalStateProviderProps {
    children: ReactNode;
}