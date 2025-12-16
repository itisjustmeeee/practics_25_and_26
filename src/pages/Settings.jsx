import { useNavigate } from 'react-router-dom';
import { useNotification } from '../components/NotificationProvider';

function Settings() {
  const navigate = useNavigate();
  const { showNotification } = useNotification?.() || {};

  const exportData = () => {
    const data = localStorage.getItem('technologies') || '[]';
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `technologies-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    showNotification?.('Данные экспортированы', 'success');
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (!Array.isArray(imported)) throw new Error('Неверный формат');
        localStorage.setItem('technologies', JSON.stringify(imported));
        showNotification?.('Данные импортированы', 'success');
        window.location.reload();
      } catch (err) {
        showNotification?.(`Ошибка импорта: ${err.message}`, 'error');
      }
    };
    reader.readAsText(file);
  };

  const clearData = () => {
    if (confirm('Удалить все данные?')) {
      localStorage.removeItem('technologies');
      showNotification?.('Все данные удалены', 'warning');
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
        <label className="btn btn-secondary">
          Импорт из JSON
          <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
        </label>
      </section>

      <section className="settings-section">
        <h2>Опасные действия</h2>
        <button className="btn btn-danger" onClick={clearData}>
          Очистить все данные
        </button>
      </section>

      <button className="btn" onClick={() => navigate(-1)}>
        ← Назад
      </button>
    </div>
  );
}

export default Settings;