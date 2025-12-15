import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page home-page">
      <div className="hero-section">
        <h1>Добро пожаловать в Трекер технологий ^-^</h1>
        <p className="hero-description">
          Управляй своим обучением: отслеживай прогресс, добавляй заметки, 
          отмечай статусы и экспортируй данные.
        </p>
        <div className="hero-buttons">
          <Link to="/technologies" className="btn btn-primary">
            Перейти к списку технологий
          </Link>
          <Link to="/add-technology" className="btn btn-primary">
             +Добавить новую технологию
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Возможности трекера</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Статусы изучения</h3>
            <p>Не начато → В процессе → Завершено</p>
          </div>
          <div className="feature-card">
            <h3>Заметки</h3>
            <p>Пиши мысли, ссылки и прогресс по каждой технологии</p>
          </div>
          <div className="feature-card">
            <h3>Сохранение данных</h3>
            <p>Все данные сохраняются в браузере (localStorage)</p>
          </div>
          <div className="feature-card">
            <h3>Экспорт</h3>
            <p>Скачивай технологии в JSON</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;