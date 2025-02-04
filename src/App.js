
import './style.css';
import Kezdolap from './pages/Kezdolap';
import Bejelentkezes from './pages/Bejelentkezes';
import Regisztracio from './pages/Regisztracio';
import AdminLayout from './layouts/AdminLayout';
import FelelosLayout from './layouts/FelelosLayout';
import { useAuthContext } from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';
import GuestLayout from "./layouts/GuestLayout";

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

                {/* Admin és User ugyanazon útvonalon */}
                {user && (
                    <Route
                        path="/"
                        element={
                            user.role === 0 ? (
                                <AdminLayout />
                            ) : (
                                <FelelosLayout />
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
