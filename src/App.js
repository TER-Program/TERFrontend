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
import Admin from './pages/admin/Admin';
import Tanar from './pages/tanar/Tanar';
import Felelos from './pages/felelos/Felelos';
import Tanarok from './pages/felelos/Tanarok';
import Dokumentumok from './pages/tanar/Dokumentumok';
import DokumentumokErtekelo from './pages/felelos/DokumentumokErtekelo';
import Footer from './pages/Footer';
import Megjegyzesek from './pages/tanar/Megjegyzesek';
import TanarPont from './pages/tanar/TanarPont';
import TeljesitmenyCelok from './pages/felelos/TeljesitmenyCelok';
function App() {
    const { user } = useAuthContext();
    return (
        <div className="app-container">
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
                            <Route path="Dokumentumok" element={<DokumentumokErtekelo />} />
                        </Route>
                    )}
                    {user.role === 2 && (
                        <Route element={<TanarLayout />}>
                            <Route path="/" element={<Tanar />} />
                            <Route path="Dokumentumok" element={<Dokumentumok />} />
                            <Route path="Megjegyzesek" element={<Megjegyzesek />} />
                            <Route path="TanarPont" element={<TanarPont />} />
                        </Route>
                    )}
                    {user.role === 1 && (
                        <Route element={<FelelosLayout />}>
                            <Route path="/" element={<Felelos />} />
                            <Route path="Tanarok" element={<Tanarok />} />
                            <Route path="Dokumentumok" element={<DokumentumokErtekelo />} />
                            <Route path="Pontozott" element={<TeljesitmenyCelok />} />
                        </Route>
                    )}
                </>
            )}
        </Routes>
        {/* <Footer /> */}
        </div>
    );
}

export default App;