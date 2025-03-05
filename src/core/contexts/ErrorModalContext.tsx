import React, { createContext, useContext, useState } from 'react';
import { ErrorModal } from '../components/ErrorModal';

interface ErrorModalContextType {
  showError: (message: string) => void;
}

const ErrorModalContext = createContext<ErrorModalContextType | null>(null);

export const ErrorModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showError = (message: string) => {
    setErrorMessage(message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ErrorModalContext.Provider value={{ showError }}>
      {children}
      <ErrorModal 
        open={open} 
        message={errorMessage} 
        onClose={handleClose} 
      />
    </ErrorModalContext.Provider>
  );
};

export const useErrorModal = () => {
  const context = useContext(ErrorModalContext);
  if (!context) {
    throw new Error('useErrorModal must be used within an ErrorModalProvider');
  }
  return context;
}; 