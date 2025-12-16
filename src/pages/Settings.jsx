import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNotification } from '../components/NotificationProvider';

function Settings() {
  const navigate = useNavigate();
  const { showNotification } = useNotification?.() || {};

  const exportData = () => {
    const data = localStorage.getItem('technologies') || '[]';
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `technologies-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification?.('Данные экспортированы', 'success');
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (!Array.isArray(imported)) throw new Error('Неверный формат');
        localStorage.setItem('technologies', JSON.stringify(imported));
        showNotification?.('Данные импортированы', 'success');
        window.location.reload();
      } catch (err) {
        showNotification?.(`Ошибка импорта: ${err.message}`, 'error');
      }
    };
    reader.readAsText(file);
  };

  const clearData = () => {
    if (window.confirm('Вы уверены? Все данные будут удалены навсегда!')) {
      localStorage.removeItem('technologies');
      showNotification?.('Все данные очищены', 'warning');
      window.location.reload();
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Настройки
      </Typography>

      <Paper elevation={6} sx={{ p: 5, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Экспорт / Импорт данных
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', mt: 3 }}>
          <Button variant="contained" onClick={exportData}>
            Экспорт в JSON
          </Button>

          <label>
            <Button variant="contained" component="span">
              Импорт из JSON
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={importData}
              style={{ display: 'none' }}
            />
          </label>
        </Box>
      </Paper>

      <Paper elevation={6} sx={{ p: 5, mt: 6 }}>
        <Typography variant="h5" gutterBottom color="error">
          Опасные действия
        </Typography>

        <Box textAlign="center" sx={{ mt: 3 }}>
          <Button variant="contained" color="error" onClick={clearData}>
            Очистить все данные
          </Button>
        </Box>
      </Paper>

      <Box textAlign="center" sx={{ mt: 5 }}>
        <Button variant="text" onClick={() => navigate(-1)}>
          ← Назад
        </Button>
      </Box>
    </Container>
  );
}

export default Settings;