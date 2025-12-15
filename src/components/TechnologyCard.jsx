import { Link } from 'react-router-dom';
import './TechnologyCard.css';

const statusConfig = {
  'completed': { label: 'ЗАВЕРШЕНО', color: '#7dd838ff' },
  'in-progress': { label: 'В ПРОЦЕССЕ', color: '#2882f0ff' },
  'not-started': { label: 'НЕ НАЧАТО', color: '#dd3131ff' }
};

function TechnologyCard({ tech, onStatusChange, onNoteChange }) {
  const { label, color } = statusConfig[tech.status] || statusConfig['not-started'];

  return (
    <div className={`tech-card ${tech.status}`}>
      <Link to={`/technology/${tech.id}`} className="card-link">
        <div className="card-header">
          <h3>{tech.title}</h3>
        </div>

        <p className="description">{tech.desc}</p>

        {tech.deadline && (
          <div className="deadline-info">
            <strong>Дедлайн:</strong> {new Date(tech.deadline).toLocaleDateString('ru-RU')}
      
            {(() => {
              const daysLeft = Math.ceil(
                (new Date(tech.deadline) - new Date()) / (1000 * 60 * 60 * 24)
              );
              return daysLeft > 0 ? (
                <span className="days-left"> ({daysLeft} дн. осталось)</span>
              ) : daysLeft === 0 ? (
                <span className="days-left"> (сегодня)</span>
              ) : (
                <span className="days-overdue"> (просрочено)</span>
              );
            })()}
          </div>
        )}

        <div className="card-footer-preview">
          <span className="category">{tech.category}</span>
          <span className="status-badge-preview" style={{ backgroundColor: color }}>
            {label}
          </span>
        </div>
      </Link>

      <div className="status-change-section" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn-status-change"
          onClick={() => onStatusChange(tech.id)}
        >
          Изменить статус → {label}
        </button>
      </div>

      <textarea
        className="note-input"
        placeholder="Заметки..."
        value={tech.note || ''}
        onChange={(e) => onNoteChange(tech.id, e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
      />

      <div className="click-hint">
        Кликните по карточке для детального просмотра
      </div>
    </div>
  );
}

export default TechnologyCard;