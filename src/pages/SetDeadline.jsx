import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function SetDeadline() {
  const { techId } = useParams();
  const navigate = useNavigate();

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

    const saved = localStorage.getItem('technologies');
    if (!saved) {
      alert('Ошибка: данные не найдены');
      return;
    }

    try {
      const technologies = JSON.parse(saved);

      const updated = technologies.map(t =>
        t.id === parseInt(techId)
          ? { ...t, deadline, status: 'in-progress' }
          : t
      );

      localStorage.setItem('technologies', JSON.stringify(updated));

      alert(`Срок изучения успешно установлен: ${deadline}`);
      navigate('/technologies');
    } catch (e) {
      console.error('Ошибка сохранения дедлайна', e);
      alert('Произошла ошибка при сохранении');
    }
  };

  return (
    <div className="page deadline-page">
      <h1>Установить срок изучения</h1>

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