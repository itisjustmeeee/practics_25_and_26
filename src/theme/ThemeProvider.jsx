// src/theme/ThemeProvider.jsx
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
        default: mode === 'dark' ? '#0f0f0f' : '#f8fafc',
        paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#e2e8f0' : '#1f2937',
        secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: mode === 'dark' ? '#e2e8f0' : '#1f2937',
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            color: mode === 'dark' ? '#e2e8f0' : '#1f2937',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#e2e8f0' : '#1f2937',
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
            backgroundImage: 'none',
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
    <IconButton onClick={toggleTheme} color="inherit" aria-label="переключить тему">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}