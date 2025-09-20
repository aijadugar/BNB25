import { Routes, Route } from 'react-router-dom';
import './App.css'

// Import your page components
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* A catch-all route for 404 pages */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
