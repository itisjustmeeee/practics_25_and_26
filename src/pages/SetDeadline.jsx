import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTechnologies } from '../hooks/useTechnologies';
import { useNotification } from '../components/NotificationProvider';

function SetDeadline() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const { technologies } = useTechnologies();
  const { showNotification } = useNotification?.() || {};

  const tech = technologies.find(t => t.id === parseInt(techId));

  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  const validateDate = (value) => {
    if (!value) return 'Дата обязательна';
    const selected = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) return 'Дата не может быть в прошлом';
    return '';
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setDeadline(value);
    setError(validateDate(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateDate(deadline);
    if (err) {
      setError(err);
      showNotification?.(err, 'error');
      return;
    }

    const saved = localStorage.getItem('technologies');
    if (!saved) return;

    const technologies = JSON.parse(saved);
    const updated = technologies.map(t =>
      t.id === parseInt(techId)
        ? { ...t, deadline, status: 'in-progress' }
        : t
    );

    localStorage.setItem('technologies', JSON.stringify(updated));
    showNotification?.(`Дедлайн установлен: ${deadline}`, 'success');
    navigate('/technologies');
  };

  if (!tech) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <button onClick={() => navigate('/technologies')} className="btn">Назад</button>
      </div>
    );
  }

  return (
    <div className="page deadline-page">
      <h1>Установить срок изучения</h1>
      <h2>{tech.title}</h2>

      <form onSubmit={handleSubmit} className="deadline-form">
        <div className="form-group">
          <label>Дата завершения</label>
          <input type="date" value={deadline} onChange={handleChange} required />
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={!!error || !deadline}>
            Установить
          </button>
          <button type="button" className="btn" onClick={() => navigate('/technologies')}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default SetDeadline;