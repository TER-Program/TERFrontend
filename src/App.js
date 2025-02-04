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

                {/* Admin, User és Tanár ugyanazon útvonalon */}
                {user && (
                    <Route
                        path="/"
                        element={
                            user.role === 0 ? (
                                <Admin />
                            ) : user.role === 2 ? (
                                <Tanar />
                            ) : user.role === 1 ? (
                                <FelelosLayout />
                            ) : null
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