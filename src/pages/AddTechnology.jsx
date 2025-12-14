import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTechnology() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('Frontend');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !desc.trim()) {
      alert('Заполните название и описание');
      return;
    }

    const saved = localStorage.getItem('technologies');
    const technologies = saved ? JSON.parse(saved) : [];

    const newTech = {
      id: Date.now(),
      title: title.trim(),
      desc: desc.trim(),
      category,
      status: 'not-started',
      note: ''
    };

    technologies.push(newTech);
    localStorage.setItem('technologies', JSON.stringify(technologies));

    alert('Технология добавлена!');
    navigate('/technologies');
  };

  return (
    <div className="page add-technology-page">
      <h1>Добавить новую технологию</h1>

      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label>Название</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: GraphQL"
            required
          />
        </div>

        <div className="form-group">
          <label>Описание</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Что вы хотите изучить..."
            rows="5"
            required
          />
        </div>

        <div className="form-group">
          <label>Категория</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Data Science">Data Science</option>
            <option value="DevOps">DevOps</option>
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