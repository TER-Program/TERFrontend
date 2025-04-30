import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export default function NavigacioAdmin() {
    const { logout } = useAuthContext();
    const location = useLocation(); // Az aktuális URL lekérése

    // Funkció, amely meghatározza, hogy az adott link aktív-e
    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <nav className="navbar navbar-expand-sm bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className={`navbar-item ${isActive('/')}`}>
                        <Link className="nav-link" to="/">
                            Kezdőlap Admin 
                        </Link>
                    </li>
                    <li className={`navbar-item ${isActive('/tanarok')}`}>
                        <Link className="nav-link" to="/tanarok">
                            Tanárok
                        </Link>
                    </li>
                    <li className={`navbar-item ${isActive('/Dokumentumok')}`}>
                        <Link className="nav-link" to="/Dokumentumok">
                            Dokumentumok
                        </Link>
                    </li>
                    <li className={`navbar-item ${isActive('/Pontozott')}`}>
                        <Link className="nav-link" to="/Pontozott">
                            Pontozott teljesítménycélok
                        </Link>
                    </li>
                    <li className={`navbar-item ${isActive('/JelszoValtoztatas')}`}>
                        <Link className="nav-link" to="/JelszoValtoztatas">
                            Jelszó változtatás
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" onClick={() => { logout() }}>
                            Kijelentkezés
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
