import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTechnologies } from '../hooks/useTechnologies';

function SetDeadline() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const { technologies, updateStatus } = useTechnologies();

  const tech = technologies.find(t => t.id === parseInt(techId));

  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  const validateDate = (value) => {
    if (!value) {
      return 'Дата обязательна';
    }
    const selected = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected < today) {
      return 'Дата не может быть в прошлом';
    }
    return '';
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setDeadline(value);
    setError(validateDate(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateDate(deadline);
    if (validationError) {
      setError(validationError);
      return;
    }

    updateStatus(parseInt(techId), 'in-progress');
    alert(`Срок изучения установлен: ${deadline}`);
    navigate('/technologies');
  };

  if (!tech) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <button onClick={() => navigate('/technologies')} className="btn">
            Назад
        </button>
      </div>
    );
  }

  return (
    <div className="page deadline-page">
      <h1>Установить срок изучения</h1>
      <h2>{tech.title}</h2>

      <form onSubmit={handleSubmit} className="deadline-form" noValidate>
        <div className="form-group">
          <label htmlFor="deadline-date">
            Выберите дату завершения изучения
          </label>
          <input
            id="deadline-date"
            type="date"
            value={deadline}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby={error ? 'deadline-error' : undefined}
          />

          {error && (
            <p id="deadline-error" className="error-message" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!!error || !deadline}
          >
            Установить срок
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => navigate('/technologies')}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default SetDeadline;