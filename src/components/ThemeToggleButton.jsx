import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeToggle } from '../theme/ThemeProvider';

export default function ThemeToggleButton() {
  const { mode, toggleTheme } = useThemeToggle();

  return (
    <IconButton onClick={toggleTheme} color="inherit" aria-label="переключить тему">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}