import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { createTheme } from '../theme';

interface SettingsContextInterface {
  collapsed: boolean;
  open: boolean;
  changeCollapsed: (collapsed: boolean) => void;
  toggleDrawer: () => void;
}

export const SettingsContext = createContext({} as SettingsContextInterface);

type SettingsProviderProps = {
  children: React.ReactNode;
};

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [collapsed, setCollapsed] = useLocalStorage('sidebarcollapsed', false);
  const [open, setOpen] = useState(false);

  const changeCollapsed = (collapsed: boolean) => {
    if (typeof collapsed === 'boolean') {
      setCollapsed(collapsed);
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const theme = createTheme();

  return (
    <SettingsContext.Provider
      value={{
        collapsed,
        open,
        changeCollapsed,
        toggleDrawer,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {children}
        </LocalizationProvider>
      </MuiThemeProvider>
    </SettingsContext.Provider>
  );
};

export function useSettings() {
  return useContext(SettingsContext);
}

export default SettingsProvider;
