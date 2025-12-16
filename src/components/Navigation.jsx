import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ThemeToggleButton from './ThemeToggleButton';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { label: 'Главная', path: '/' },
    { label: 'Технологии', path: '/technologies' },
    { label: '+ Добавить', path: '/add-technology' },
    { label: 'Статистика', path: '/statistics' },
    { label: 'Настройки', path: '/settings' },
  ];

  return (
    <AppBar position="sticky" elevation={4} sx={{ mb: 4 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #fbbf24, #f87171)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Трекер технологий
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              color="inherit"
              variant={location.pathname === item.path || 
                       (item.path === '/technologies' && location.pathname.startsWith('/technology')) 
                       ? 'contained' 
                       : 'text'}
              sx={{
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
                minWidth: 100,
              }}
            >
              {item.label}
            </Button>
          ))}
          <ThemeToggleButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;