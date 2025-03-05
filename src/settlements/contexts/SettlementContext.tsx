import React, { createContext, useState, ReactNode, useContext } from 'react';
import { getCurrentMonth } from '../../core/utils/utils';
export interface SettlementContextType {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

export const SettlementContext = createContext({} as SettlementContextType);

interface SettlementProviderProps {
  children: ReactNode;
}

export const SettlementProvider: React.FC<SettlementProviderProps> = ({
  children,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  return (
    <SettlementContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      {children}
    </SettlementContext.Provider>
  );
};

export function useSettlementContext() {
  return useContext(SettlementContext);
}

export default SettlementProvider;
