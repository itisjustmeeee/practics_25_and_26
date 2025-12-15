import { useState, useEffect } from 'react';

const DEFAULT_TECHNOLOGIES = [
  { id: 1, title: 'React', desc: 'Библиотека для UI', category: 'Frontend', status: 'in-progress', note: '', deadline: '' },
  { id: 2, title: 'Node.js', desc: 'Серверный JavaScript', category: 'Backend', status: 'completed', note: '', deadline: '' },
  { id: 3, title: 'Python', desc: 'Универсальный язык', category: 'Backend', status: 'not-started', note: '', deadline: '' }
];

export function useTechnologies() {
  const [technologies, setTechnologies] = useState(() => {
    const saved = localStorage.getItem('technologies');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Ошибка парсинга localStorage', e);
        return DEFAULT_TECHNOLOGIES;
      }
    }
    return DEFAULT_TECHNOLOGIES;
  });

  useEffect(() => {
    localStorage.setItem('technologies', JSON.stringify(technologies));
  }, [technologies]);

  const addTechnology = (newTech) => {
    const techWithId = { ...newTech, id: Date.now() };
    setTechnologies(prev => [...prev, techWithId]);
  };

  const updateStatus = (id) => {
    setTechnologies(prev => prev.map(t => {
      if (t.id === id) {
        const order = ['not-started', 'in-progress', 'completed'];
        const currentIndex = order.indexOf(t.status);
        const nextIndex = (currentIndex + 1) % 3;
        const nextStatus = order[nextIndex];

        if (nextStatus === 'completed') {
          const { deadline, ...rest } = t;
          return { ...rest, status: nextStatus };
        }

        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const updateNote = (id, note) => {
    setTechnologies(prev => prev.map(t => t.id === id ? { ...t, note } : t));
  };

  const deleteTechnology = (id) => {
    setTechnologies(prev => prev.filter(t => t.id !== id));
  };

  return {
    technologies,
    addTechnology,
    updateStatus,
    updateNote,
    deleteTechnology
  };
}