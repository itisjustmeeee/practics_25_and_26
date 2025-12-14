
const statusConfig = {
  'completed': { label: 'DONE', color: '#71ec4eff' },
  'in-progress': { label: 'LOADING', color: '#3184e9ff' },
  'not-started': { label: 'NOT STARTED', color: '#e84040ff' }
};

function TechnologyCard({ tech, onStatusChange, onNoteChange }) {
  const { label, color } = statusConfig[tech.status] || statusConfig['not-started'];

  return (
    <div
      className={`tech-card ${tech.status}`}
      onClick={() => onStatusChange(tech.id)}
      style={{
        borderColor: color,
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        transition: 'all 0.4s ease'
      }}
    >
      <div className="card-header">
        <h3>{tech.title}</h3>
      </div>

      <p className="description">{tech.desc}</p>

      <textarea
        className="note-input"
        placeholder="Заметка..."
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

      <div className="click-hint">Нажмите, чтобы изменить статус</div>
    </div>
  );
}

export default TechnologyCard;