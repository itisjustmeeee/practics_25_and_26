import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RoadmapLoader from '../components/RoadmapLoader';
import { useTechnologies } from '../hooks/useTechnologies';
import { useNotification } from '../components/NotificationProvider';

function AddTechnology() {
  const navigate = useNavigate();
  const { addTechnology } = useTechnologies();
  const { showNotification } = useNotification?.() || {};

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('Frontend');

  const handleManualAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showNotification?.('Введите название технологии', 'error');
      return;
    }

    const newTech = {
      title: title.trim(),
      desc: desc.trim() || 'Без описания',
      category,
      status: 'not-started',
      note: '',
      deadline: ''
    };

    addTechnology(newTech);
    showNotification?.('Технология добавлена вручную!', 'success');

    setTitle('');
    setDesc('');
    setCategory('Frontend');
  };

  const handleApiAdd = (tech) => {
    addTechnology(tech);
    showNotification?.('Технология загружена из API!', 'success');
    navigate('/technologies');
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Добавить новую технологию
      </Typography>

      <Paper elevation={6} sx={{ p: 5, mt: 4 }}>
        <Typography variant="h5" gutterBottom color="primary">
          Загрузить из внешнего источника
        </Typography>
        <RoadmapLoader onLoad={handleApiAdd} />
      </Paper>

      <Paper elevation={6} sx={{ p: 5, mt: 6 }}>
        <Typography variant="h5" gutterBottom color="primary">
          Или добавить вручную
        </Typography>

        <Box component="form" onSubmit={handleManualAdd} sx={{ mt: 4 }}>
          <div className="title-input-container">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название технологии"
              className="title-input-large"
              required
            />
          </div>

          <TextField
            label="Описание (необязательно)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            sx={{ mt: 4 }}
          />

          <TextField
            select
            label="Категория"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ mt: 3 }}
          >
            <MenuItem value="Frontend">Frontend</MenuItem>
            <MenuItem value="Backend">Backend</MenuItem>
            <MenuItem value="Data Science">Data Science</MenuItem>
            <MenuItem value="DevOps">DevOps</MenuItem>
            <MenuItem value="Mobile">Mobile</MenuItem>
            <MenuItem value="Другое">Другое</MenuItem>
          </TextField>

          <Box sx={{ mt: 5, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button type="submit" variant="contained" size="large">
              Добавить технологию
            </Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/technologies')}>
              Отмена
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddTechnology;