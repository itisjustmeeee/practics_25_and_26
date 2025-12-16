import { Link } from 'react-router-dom';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchBar from '../components/SearchBar';
import TechnologyCard from '../components/TechnologyCard';
import { useTechnologies } from '../hooks/useTechnologies';

function TechnologyList() {
  const { technologies, updateStatus, updateNote } = useTechnologies();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechnologies = technologies.filter(tech =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (tech.desc && tech.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (tech.note && tech.note.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Все технологии ({technologies.length})
        </Typography>
        <Button
          component={Link}
          to="/add-technology"
          variant="contained"
          color="primary"
          size="large"
        >
          + Добавить технологию
        </Button>
      </div>

      <SearchBar onSearch={setSearchQuery} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {filteredTechnologies.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary" align="center" sx={{ py: 8 }}>
              {searchQuery 
                ? `Ничего не найдено по запросу "${searchQuery}"`
                : 'Технологий пока нет. Добавьте первую!'
              }
            </Typography>
          </Grid>
        ) : (
          filteredTechnologies.map(tech => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tech.id}>
              <TechnologyCard
                tech={tech}
                onStatusChange={updateStatus}
                onNoteChange={updateNote}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default TechnologyList;