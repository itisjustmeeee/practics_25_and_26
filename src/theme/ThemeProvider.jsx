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
      primary: {
        main: '#a78bfa',
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#f1f5f9',
        paper: mode === 'dark' ? '#1e293b' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#f1f5f9' : '#0f172a',
        secondary: mode === 'dark' ? '#94a3b8' : '#475569',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1e293b' : '#ffffff',
            backgroundImage: 'none',
            boxShadow: mode === 'dark' 
              ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
              : '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: mode === 'light' ? '1px solid #e2e8f0' : '1px solid #334155',
            borderRadius: '16px',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#f1f5f9' : '#0f172a',
          },
          h1: { color: mode === 'dark' ? '#fbbf24' : '#1e293b' },
          h2: { color: mode === 'dark' ? '#fbbf24' : '#1e293b' },
          h3: { color: mode === 'dark' ? '#e2e8f0' : '#1e293b' },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#e2e8f0' : '#1e293b',
          },
        },
      },
      // Инпуты и селекты
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#f1f5f9' : '#0f172a',
          },
          input: {
            color: mode === 'dark' ? '#f1f5f9' : '#0f172a',
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            color: mode === 'dark' ? '#f1f5f9' : '#0f172a',
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

export function ThemeToggleButton() {
  const { mode, toggleTheme } = useThemeToggle();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}