import { useNavigate } from "react-router-dom";

function Settings() {
    const navigate = useNavigate();

    const clearData = () => {
        if (window.confirm("Вы уверены в выборе? Все данные будут удалены")) {
            localStorage.removeItem('technologies');
            alert('Данные очищены. Перезагрузите страницу');
            navigate('/');
        }
    };

    const exportData = () => {
        const data = localStorage.getItem('technologies') || '[]';
        const blob = new Blob([data], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `technologies-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="page settings-page">
            <h1>Настройки</h1>

            <section className="settings-section">
                <h2>Управление данными</h2>
                <button className="btn btn-danger" onClick={clearData}>
                    Очистить все данные
                </button>
                <button className="btn btn-primary" onClick={exportData}>
                    Экспорт данных (JSON)
                </button>
                <button onClick={() => {
                    if (confirm('Очистить все данные?')) {
                        localStorage.clear();
                        alert('localStorage очищен! Перезагрузите страницу.');
                    }
                }}>
                    Очистить localStorage
                </button>
            </section>

            <section className="settings-section">
                <h2>Информация</h2>
                <p>Версия приложения: 1.0</p>
                <p>Данные сохраняются в localStorage браузера</p>
                <p>Количество технологий: {JSON.parse(localStorage.getItem('technologies') || '[]').length}</p>
            </section>

            <button className="btn" onClick={() => navigate(-1)}>
                Назад
            </button>
        </div>
    );
}

export default Settings;