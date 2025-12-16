import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box textAlign="center" mb={8}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Добро пожаловать в Трекер технологий!
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 5 }}>
          Отслеживай свой прогресс в изучении новых технологий: добавляй, отмечай статус, пиши заметки и устанавливай дедлайны.
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button component={Link} to="/technologies" variant="contained" size="large">
            Перейти к технологиям
          </Button>
          <Button component={Link} to="/add-technology" variant="outlined" size="large">
            + Добавить новую
          </Button>
        </Box>
      </Box>

      <Typography variant="h4" textAlign="center" gutterBottom sx={{ mb: 6 }}>
        Возможности трекера
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={6} sx={{ p: 4, height: '100%', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Статусы изучения
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Не начато → В процессе → Завершено
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={6} sx={{ p: 4, height: '100%', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Заметки
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Пиши мысли, ссылки и прогресс по каждой технологии
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={6} sx={{ p: 4, height: '100%', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Дедлайны
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Устанавливай сроки изучения и следи за прогрессом
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={6} sx={{ p: 4, height: '100%', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Экспорт данных
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Скачивай свои технологии в JSON одним кликом
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;