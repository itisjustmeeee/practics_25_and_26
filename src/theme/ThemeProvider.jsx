import React, { useState, useEffect, createContext, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeContext = createContext();

export const useThemeToggle = () => useContext(ThemeContext);

export function CustomThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('themeMode');
    if (saved) {
      setMode(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: '#a78bfa' },
      background: {
        default: mode === 'dark' ? '#0f0f0f' : '#f8fafc',
        paper: mode === 'dark' ? '#1e293b' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#f1f5f9' : '#1e293b',
        secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
      },
      navigation: {
        background: mode === 'dark' ? '#1e1e1e' : '#e0e7ff',
        text: mode === 'dark' ? '#f1f5f9' : '#1e293b',
        active: mode === 'dark' ? '#fbbf24' : '#7c3aed',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.navigation.background,
            color: theme.palette.navigation.text,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: theme.palette.navigation.text,
            '&.active': {
              color: theme.palette.navigation.active,
              fontWeight: 'bold',
            },
          },
        },
      }, 
      MuiButton: {
        styleOverrides: {
          root: {
            color: theme.palette.navigation.text,
            '&.active': {
              backgroundColor: theme.palette.navigation.active + '33',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: theme.palette.navigation.text,
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}