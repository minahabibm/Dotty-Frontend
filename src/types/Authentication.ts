import { ReactNode } from "react";

export interface AuthState {
    isLoading: boolean;
    isSignout: boolean;
    user: any;
}

export  interface AuthContextType {
    state: AuthState;
    restoreUser: (data: any) => void;
    signIn: (data: any) => Promise<void>;
    signOut: () => void;
}

export  interface AuthProviderProps {
    children: ReactNode;
}
  