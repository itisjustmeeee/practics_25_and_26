import React, { useState, useEffect, createContext, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1e1e1e' : '#e0e7ff',
            color: mode === 'dark' ? '#f1f5f9' : '#1e293b',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            color: mode === 'dark' ? '#f1f5f9' : '#1e293b',
            ...(ownerState.variant === 'contained' && {
              backgroundColor: mode === 'dark' ? '#fbbf24' : '#7c3aed',
              '&:hover': {
                backgroundColor: mode === 'dark' ? '#f59e0b' : '#6d28d9',
              },
            }),
          }),
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#f1f5f9' : '#1e293b',
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#f1f5f9' : '#1e293b',
            '&.active': {
              color: mode === 'dark' ? '#fbbf24' : '#7c3aed',
              fontWeight: 'bold',
            },
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