import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoadmapLoader from '../components/RoadmapLoader';
import { useTechnologies } from '../hooks/useTechnologies';
import { useNotification } from '../components/NotificationProvider';

function AddTechnology() {
  const navigate = useNavigate();
  const { addTechnology } = useTechnologies();
  const { showNotification } = useNotification?.() || {};

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('Frontend');

  const handleManualAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showNotification?.('Введите название технологии', 'error');
      return;
    }

    const newTech = {
      title: title.trim(),
      desc: desc.trim() || 'Без описания',
      category,
      status: 'not-started',
      note: '',
      deadline: ''
    };

    addTechnology(newTech);
    showNotification?.('Технология добавлена вручную!', 'success');

    setTitle('');
    setDesc('');
    setCategory('Frontend');
  };

  const handleApiAdd = (tech) => {
    addTechnology(tech);
    showNotification?.('Технология загружена из API!', 'success');
    navigate('/technologies');
  };

  return (
    <div className="page add-technology-page">
      <h1>Добавить новую технологию</h1>

      <section className="api-loader-section">
        <h2>Загрузить из внешнего источника</h2>
        <RoadmapLoader onLoad={handleApiAdd} />
      </section>

      <section className="manual-add-section">
        <h2>Или добавить вручную</h2>
        <form onSubmit={handleManualAdd} className="add-form">
          <div className="form-group">
            <label>Название</label>
            <input value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Описание</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Категория</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option>Fronend</option>
              <option>Backend</option>
              <option>Data Science</option>
              <option>DevOps</option>
              <option>Mobile</option>
              <option>Другое</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Добавить</button>
            <button type="button" className="btn" onClick={() => navigate('/technologies')}>
              Отмена
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AddTechnology;