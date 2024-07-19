
import { ReactNode } from 'react';

export interface ModalContextType {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}
export interface ModalProviderProps {
    children: ReactNode;
}