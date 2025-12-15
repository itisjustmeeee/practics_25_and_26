import { Link } from 'react-router-dom';
import { useState } from 'react';
import TechnologyCard from '../components/TechnologyCard';
import SearchBar from '../components/SearchBar';
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
    <div className="page">
      <div className="page-header">
        <h1>Все технологии ({technologies.length})</h1>
        <Link to="/add-technology" className="btn btn-primary">
          + Добавить технологию
        </Link>
      </div>

      <SearchBar onSearch={setSearchQuery} />

      <div className="tech-grid">
        {filteredTechnologies.length === 0 ? (
          <p className="empty-message">
            {searchQuery 
              ? `Ничего не найдено по запросу "${searchQuery}"`
              : 'Технологий пока нет. Добавьте первую!'
            }
          </p>
        ) : (
          filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              tech={tech}
              onStatusChange={updateStatus}
              onNoteChange={updateNote}
            />
          ))
        )}
      </div>
      <div className="card-footer">
        <span className="category">{tech.category}</span>
        <span className="status-badge" style={{ backgroundColor: color }}>
          {label}
        </span>
        <Link 
          to={`/technology/${techId}/deadline`} 
          className="btn btn-small"
        >
          Срок изучения
        </Link>
      </div>
    </div>
  );
}

export default TechnologyList;