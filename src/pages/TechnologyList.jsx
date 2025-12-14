import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TechnologyCard from '../components/TechnologyCard';
import SearchBar from '../components/SearchBar';
import { useTechnologies } from '../hooks/useTechnologies';

function TechnologyList() {
  const [technologies, setTechnologies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = technologies.filter(tech =>
    tech.title.toLowerCase().includes(searchQuery) ||
    tech.desc.toLowerCase().includes(searchQuery)
  );

  useEffect(() => {
    const saved = localStorage.getItem('technologies');
    if (saved) {
      setTechnologies(JSON.parse(saved));
    }
  }, []);

  const updateStatus = (id) => {
    setTechnologies(prev => prev.map(t => {
      if (t.id === id) {
        const order = ['not-started', 'in-progress', 'completed'];
        const next = (order.indexOf(t.status) + 1) % 3;
        return { ...t, status: order[next] };
      }
      return t;
    }));
  };

  const updateNote = (id, note) => {
    setTechnologies(prev => prev.map(t => 
      t.id === id ? { ...t, note } : t
    ));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <Link to="/add-technology" className="btn btn-primary">
          +Добавить технологию
        </Link>
      </div>

      <SearchBar onSearch={setSearchQuery} />

      <div className="tech-grid">
        {technologies.length === 0 ? (
          <p className="empty-message">Технологий пока нет. Добавьте первую</p>
        ) : (
          technologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              tech={tech}
              onStatusChange={updateStatus}
              onNoteChange={updateNote}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TechnologyList;