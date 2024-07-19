import React, { createContext, useContext, useState } from 'react';
import { GlobalState, GlobalContextType, GlobalStateProviderProps } from '../types/GlobalState';


const initialState: GlobalState  = {
    activeTradingAccount: false,
};

const GlobalStateContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
    const [state, setState] = useState<GlobalState>(initialState);

    const setActiveTradingAccount = (value: boolean) => {
        setState(prevState => ({ ...prevState, activeTradingAccount: value }));
    };

    return (
        <GlobalStateContext.Provider value={{ state, setActiveTradingAccount }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
      throw new Error('useGlobalState must be used within a GlobalProvider');
    }
    return context;
};