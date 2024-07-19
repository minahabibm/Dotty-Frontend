import React, { createContext, useContext, useState } from 'react';
import { ModalContextType, ModalProviderProps } from '../types/Modal';

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Create a provider component
export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};