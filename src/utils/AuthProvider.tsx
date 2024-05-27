import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { AuthContextType, AuthProviderProps  } from '../types/Authentication';


const initialState = {
  isLoading: true,
  isSignout: false,
  user: null,
};
const authReducer =  (prevState: any, action: { type: any; user: any; }) => {
  switch (action.type) {
    case 'RESTORE_USER':
      return {
        ...prevState,
        user: action.user,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        user: action.user,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        user: null,
      };
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const authContext = useMemo(
    () => ({
      state,
      restoreUser: (data: any) => {
        dispatch({ type: 'RESTORE_USER', user: data})
      },
      signIn: async (data: any) => { 
        dispatch({ type: 'SIGN_IN', user: data });
      },
      signOut: () => {
        dispatch({ type: 'SIGN_OUT', user: null })
      }
    }),
    [state]
  );  

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthContext };