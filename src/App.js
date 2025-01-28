
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
import FelelosLayout from './layouts/FelelosLayout';
function App() {
  const { user } = useAuthContext();
  return (
    <>

      <Routes>
        {/* Vendég layout */}
        {!user && (
          <Route element={<GuestLayout />}>
            <Route path="/" element={<Kezdolap />} />
            <Route path="bejelentkezes" element={<Bejelentkezes />} />
            <Route path="regisztracio" element={<Regisztracio />} />
          </Route>
        )}

        {user && (
          <Route
            path="/"
            element={
              user.role === 0 ? (
                <AdminLayout />
              ) : user.role === 1 ? (
                <FelelosLayout />
              ) : user.role === 2 ? (
                <TanarLayout />
              ) : (
                <div>Nem jogosult hozzáférés</div> // Hibakezelés, ha nem ismert a role
              )
            }
          >
            <Route index element={<Kezdolap />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;

