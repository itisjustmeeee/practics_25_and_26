import './TechnologyCard.css';

const statusConfig = {
  'completed': { label: 'COMPLETE', color: '#7dd838ff' },
  'in-progress': { label: 'IN PROGRESS', color: '#2882f0ff' },
  'not-started': { label: 'NOT STARTED', color: '#dd3131ff' }
};

function TechnologyCard({ tech, onStatusChange, onNoteChange }) {
  const { label, color } = statusConfig[tech.status] || statusConfig['not-started'];

  return (
    <div
      className={`tech-card ${tech.status}`}
      onClick={() => onStatusChange(tech.id)}
      style={{
        borderColor: color,
        boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
        transition: 'all 0.4s ease'
      }}
    >
      <div className="card-header">
        <h3>{tech.title}</h3>
      </div>

      <p className="description">{tech.desc}</p>

      <textarea
        className="note-input"
        placeholder="Заметки..."
        value={tech.note || ''}
        onChange={(e) => onNoteChange(tech.id, e.target.value)}
        onClick={(e) => e.stopPropagation()}
      />

      <div className="card-footer">
        <span className="category">{tech.category}</span>
        <span className="status-badge" style={{ backgroundColor: color }}>
          {label}
        </span>
      </div>

      <div className="click-hint">
        Нажмите карточку, чтобы изменить статус
      </div>
    </div>
  );
}

export default TechnologyCard;