import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTechnologies } from '../hooks/useTechnologies';
import RoadmapLoader from '../components/RoadmapLoader';

function AddTechnology() {
  const navigate = useNavigate();
  const { addTechnology } = useTechnologies();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('Frontend');

  const handleLoad = (tech) => {
    addTechnology(tech);
    alert('Технология добавлена из внешнего API!');
    navigate('/technologies');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Введите название технологии');
      return;
    }

    const newTech = {
      title: title.trim(),
      desc: desc.trim() || 'Без описания',
      category,
      status: 'not-started',
      note: ''
    };

    addTechnology(newTech);
    alert('Технология успешно добавлена!');
    navigate('/technologies');
  };

  return (
    <div className="page add-technology-page">
      <h1>Добавить новую технологию</h1>
      <RoadmapLoader onLoad={handleLoad} />

      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label htmlFor="title">Название технологии</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: GraphQL"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="desc">Описание (необязательно)</label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Что вы планируете изучить..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Data Science">Data Science</option>
            <option value="DevOps">DevOps</option>
            <option value="Mobile">Mobile</option>
            <option value="Другое">Другое</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Добавить технологию
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

export default AddTechnology;