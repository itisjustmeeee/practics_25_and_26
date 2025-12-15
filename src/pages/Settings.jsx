import { useNavigate } from 'react-router-dom';
import { useTechnologies } from '../hooks/useTechnologies';

function Settings() {
  const navigate = useNavigate();
  const { technologies } = useTechnologies();

  const exportData = () => {
    try {
      const dataStr = JSON.stringify(technologies, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `technologies-backup-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Ошибка экспорта данных');
    }
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (!Array.isArray(imported)) throw new Error('Неверный формат');

        const valid = imported.every(t => 
          typeof t.title === 'string' && 
          ['not-started', 'in-progress', 'completed'].includes(t.status)
        );

        if (!valid) throw new Error('Некорректные данные');

        localStorage.setItem('technologies', JSON.stringify(imported));
        alert('Данные успешно импортированы! Перезагрузите страницу.');
        window.location.reload();
      } catch (err) {
        alert(`Ошибка импорта: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const clearData = () => {
    if (window.confirm('Удалить все данные? Это действие необратимо!')) {
      localStorage.removeItem('technologies');
      alert('Данные очищены');
      window.location.reload();
    }
  };

  return (
    <div className="page settings-page">
      <h1>Настройки</h1>

      <section className="settings-section">
        <h2>Экспорт / Импорт</h2>
        <button className="btn btn-primary" onClick={exportData}>
          Экспорт в JSON
        </button>
        <label className="btn btn-primary" style={{ cursor: 'pointer' }}>
          Импорт из JSON
          <input 
            type="file" 
            accept=".json" 
            onChange={importData} 
            style={{ display: 'none' }} 
          />
        </label>
      </section>

      <section className="settings-section">
        <h2>Опасные действия</h2>
        <button className="btn btn-danger" onClick={clearData}>
          Очистить все данные
        </button>
      </section>

      <button className="btn" onClick={() => navigate(-1)}>
        Назад
      </button>
    </div>
  );
}

export default Settings;