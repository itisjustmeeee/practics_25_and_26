import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/technologies" element={<TechnologyList />} />
            <Route path="/technology/:techId" element={<TechnologyDetail />} />
            <Route path="/add-technology" element={<AddTechnology />} />   // ← новый маршрут
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="*" element={<h1>404 — Страница не найдена</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;