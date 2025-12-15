import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TechnologyCard from '../components/TechnologyCard';

function TechnologyDetail() {
  const { techId } = useParams();
  const [technology, setTechnology] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('technologies');
    if (saved) {
      try {
        const technologies = JSON.parse(saved);
        const tech = technologies.find(t => t.id === parseInt(techId, 10));
        setTechnology(tech || null);
      } catch (e) {
        console.error('Ошибка загрузки данных', e);
      }
    }
    setLoading(false);
  }, [techId]);

  const updateStatus = (id) => {
    const saved = localStorage.getItem('technologies');
    if (!saved) return;

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
    setTechnology(updated.find(t => t.id === parseInt(techId, 10)));
  };

  const updateNote = (id, note) => {
    const saved = localStorage.getItem('technologies');
    if (!saved) return;

    const technologies = JSON.parse(saved);
    const updated = technologies.map(t => t.id === id ? { ...t, note } : t);
    localStorage.setItem('technologies', JSON.stringify(updated));
    setTechnology(updated.find(t => t.id === id));
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Загрузка технологии...</h1>
      </div>
    );
  }

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <Link to="/technologies" className="btn">
          Назад к списку
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/technologies" className="back-link">
        Назад к списку
      </Link>

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
        {technology.deadline && (
          <div className="detail-deadline">
            <h3>Дедлайн изучения</h3>
            <p className="deadline-date">
              {new Date(technology.deadline).toLocaleDateString('ru-RU', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            {(() => {
              const daysLeft = Math.ceil(
                (new Date(technology.deadline) - new Date()) / (1000 * 60 * 60 * 24)
              );
              return (
                <p className="deadline-countdown">
                  {daysLeft > 0 
                    ? `${daysLeft} дней осталось` 
                    : daysLeft === 0 
                      ? 'Сегодня последний день!'
                      : `Просрочено на ${Math.abs(daysLeft)} дней`
                  }
                </p>
              );
            })()}
          </div>
        )}
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