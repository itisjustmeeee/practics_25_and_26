import { useState, useEffect } from 'react';

const DEFAULT_TECHNOLOGIES = [
  { id: 1, slug: 'react', title: 'React', desc: 'Библиотека для UI', category: 'Frontend', status: 'in-progress', note: '' },
  { id: 2, slug: 'nodejs', title: 'Node.js', desc: 'Серверный JavaScript', category: 'Backend', status: 'completed', note: '' },
  { id: 3, slug: 'python', title: 'Python', desc: 'Универсальный язык', category: 'Backend', status: 'not-started', note: '' },
  { id: 4, slug: 'docker', title: 'Docker', desc: 'Контейнеризация', category: 'DevOps', status: 'in-progress', note: '' }
];

export function useTechnologies() {
  const [technologies, setTechnologies] = useState(() => {
    const saved = localStorage.getItem('technologies');
    return saved ? JSON.parse(saved) : DEFAULT_TECHNOLOGIES;
  });

  useEffect(() => {
    localStorage.setItem('technologies', JSON.stringify(technologies));
  }, [technologies]);


    const updateStatus = (id) => {
        setTechnologies(prev => prev.map(t => {
            if (t.id === id) {
                const order = ['not-started', 'in-progress', 'completed'];
                const currentIndex = order.indexOf(t.status);
                const nextIndex = (currentIndex + 1) % 3;
                return { ...t, status: order[nextIndex] };
            }
            return t;
        }));
    };

  const updateNote = (id, note) => {
    setTechnologies(prev => prev.map(t => t.id === id ? { ...t, note } : t));
  };

  const addTechnology = (newTech) => {
    const techWithId = { ...newTech, id: Date.now() };
    setTechnologies(prev => [...prev, techWithId]);
  };

  return {
    technologies,
    updateStatus,
    updateNote,
    addTechnology
  };
}