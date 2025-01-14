
import './style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Kezdolap from './pages/Kezdolap';
import Bejelentkezes from './pages/Bejelentkezes';
import Regisztracio from './pages/Regisztracio';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Kezdolap />} />
          <Route path="bejelentkezes" element={<Bejelentkezes />} />
          <Route path="regisztracio" element={<Regisztracio />} />
        </Route>
      </Routes>
    
  );
}

export default App;