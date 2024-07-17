import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ModalContextType {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}
interface ModalProviderProps {
    children: ReactNode;
}

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