import './style.css';
import Kezdolap from './pages/Kezdolap';
import Bejelentkezes from './pages/Bejelentkezes';
import Regisztracio from './pages/Regisztracio';
import AdminLayout from './layouts/AdminLayout';
import FelelosLayout from './layouts/FelelosLayout';
import TanarLayout from './layouts/TanarLayout';
import { useAuthContext } from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';
import GuestLayout from "./layouts/GuestLayout";
import Admin from './pages/Admin';
import Tanar from './pages/Tanar';
import Felelos from './pages/Felelos';
import Tanarok from './pages/Tanarok';
import Dokumentumok from './pages/Dokumentumok';

function App() {
    const { user } = useAuthContext();
    return (
        <Routes>
            {/* Vendég layout */}
            {!user && (
                <Route element={<GuestLayout />}>
                    <Route path="/" element={<Kezdolap />} />
                    <Route path="bejelentkezes" element={<Bejelentkezes />} />
                    <Route path="regisztracio" element={<Regisztracio />} />
                </Route>
            )}

            {/* Admin, User és Tanár ugyanazon útvonalon */}
            {user && (
                <>
                    {user.role === 0 && (
                        <Route element={<AdminLayout />}>
                            <Route path="/" element={<Admin />} />
                            <Route path="Tanarok" element={<Tanarok />} />
                        </Route>
                    )}
                    {user.role === 2 && (
                        <Route element={<TanarLayout />}>
                            <Route path="/" element={<Tanar />} />
                            <Route path="Dokumentumok" element={<Dokumentumok />} />
                        </Route>
                    )}
                    {user.role === 1 && (
                        <Route element={<FelelosLayout />}>
                            <Route path="/" element={<Felelos />} />
                            <Route path="Tanarok" element={<Tanarok />} />
                        </Route>
                    )}
                </>
            )}
        </Routes>
    );
}

export default App;