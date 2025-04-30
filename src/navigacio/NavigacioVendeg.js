import React from "react";
import { Link, useLocation } from "react-router-dom"; // useLocation importálása

export default function NavigacioVendeg() {
    const location = useLocation(); // Az aktuális URL lekérése

    // Funkció, amely meghatározza, hogy az adott link aktív-e
    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <nav className="navbar navbar-expand-sm bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav">

                    <li className={`navbar-item ${isActive('/bejelentkezes')}`}>
                        <Link className="nav-link" to="/bejelentkezes">
                            Bejelentkezés
                        </Link>
                    </li>
                    <li className={`navbar-item ${isActive('/regisztracio')}`}>
                        <Link className="nav-link" to="/regisztracio">
                            Regisztráció
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
