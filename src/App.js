
import './style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Kezdolap from './pages/Kezdolap';
import Bejelentkezes from './pages/Bejelentkezes';
import Regisztracio from './pages/Regisztracio';
import Admin from './pages/Admin';
import GuestLayout from './layouts/GuestLayout';
import AdminLayout from './layouts/AdminLayout';
import TanarLayout from './layouts/TanarLayout';
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<AdminLayout />}>
              <Route index element={<Admin />} />
          </Route>
          <Route element={<FelelosLayout />}>
              <Route index element={<NavigacioFelelos />} />
          </Route>
          <Route element={<TanarLayout />}>
          <Route index element={<NavigacioTanar />} />
          
          </Route>
          <Route element={<GuestLayout />}>
              <Route path="bejelentkezes" element={<Bejelentkezes />} />
              <Route path="regisztracio" element={<Regisztracio />} />
          </Route>
        </Route>
      </Routes>
    
  );
}

export default App;

