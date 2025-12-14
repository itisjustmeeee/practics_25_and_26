import { useState } from 'react';

function RoadmapLoader({ onLoad }) {
  const [slug, setSlug] = useState('');

  const loadRoadmap = async () => {
    if (!slug.trim()) return;
    try {
      const iconUrl = `https://simple-icons.org/icons/${slug.toLowerCase()}.svg`;
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`);
      const data = await response.json();
      
      const newTech = {
        slug,
        title: data.title || slug,
        desc: data.extract || 'Описание загружено из Wikipedia',
        iconUrl,
        category: 'Frontend', // можно улучшить
        status: 'not-started',
        note: ''
      };
      
      onLoad(newTech);
    } catch (e) {
      alert('Технология не найдена');
    }
  };

  return (
    <div className="roadmap-loader">
      <input
        value={slug}
        onChange={e => setSlug(e.target.value)}
        placeholder="Введите название технологии (например, react)"
      />
      <button onClick={loadRoadmap}>Загрузить дорожную карту</button>
    </div>
  );
}

export default RoadmapLoader;