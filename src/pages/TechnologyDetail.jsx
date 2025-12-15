import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TechnologyCard from '../components/TechnologyCard';

function TechnologyDetail() {
  const { techId } = useParams();
  const [technology, setTechnology] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('technologies');
    if (saved) {
      const technologies = JSON.parse(saved);
      const tech = technologies.find(t => t.id === parseInt(techId));
      setTechnology(tech);
    }
  }, [techId]);

  const updateStatus = (id) => {
    const saved = localStorage.getItem('technologies');
    if (saved) {
      const technologies = JSON.parse(saved);
      const updated = technologies.map(t => {
        if (t.id === id) {
          const order = ['not-started', 'in-progress', 'completed'];
          const next = (order.indexOf(t.status) + 1) % 3;
          return { ...t, status: order[next] };
        }
        return t;
      });
      localStorage.setItem('technologies', JSON.stringify(updated));
      setTechnology(updated.find(t => t.id === parseInt(techId)));
    }
  };

  const updateNote = (id, note) => {
    const saved = localStorage.getItem('technologies');
    if (saved) {
      const technologies = JSON.parse(saved);
      const updated = technologies.map(t => t.id === id ? { ...t, note } : t);
      localStorage.setItem('technologies', JSON.stringify(updated));
      setTechnology(updated.find(t => t.id === id));
    }
  };

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <Link to="/technologies">--- Назад</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/technologies" className="back-link">Назад к списку</Link>
      <div className="detail-header">
        <h1>{technology.title}</h1>
        <Link 
          to={`/technology/${techId}/deadline`} 
          className="btn btn-secondary"
        >
          Установить срок изучения
        </Link>
      </div>
      <div className="detail-card">
        <TechnologyCard
          tech={technology}
          onStatusChange={updateStatus}
          onNoteChange={updateNote}
        />
      </div>
    </div>
  );
}

export default TechnologyDetail;