import { useParams, Link } from 'react-router-dom';
import TechnologyCard from '../components/TechnologyCard';
import { useTechnologies } from '../hooks/useTechnologies';

function TechnologyDetail() {
  const { techId } = useParams();
  const { technologies, updateStatus, updateNote } = useTechnologies();

  const technology = technologies.find(t => t.id === parseInt(techId, 10));

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <Link to="/technologies" className="btn">
          ← Назад к списку
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/technologies" className="back-link">
        ← Назад к списку
      </Link>

      <div className="detail-header">
        <h1>{technology.title}</h1>
        <Link 
          to={`/technology/${technology.id}/deadline`} 
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