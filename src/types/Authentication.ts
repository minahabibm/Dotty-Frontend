import { ReactNode } from "react";
import { User } from './User';

export interface AuthState {
    isLoading: boolean;
    isSignout: boolean;
    user: User;
}

export interface TokenParams {
    accessToken: string | null;
    refreshToken: string | null;
    idToken: string | null;
}

export interface AuthContextType {
    state: AuthState;
    restoreUser: (data: any) => void;
    signIn: (data: any) => Promise<void>;
    signOut: () => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}
