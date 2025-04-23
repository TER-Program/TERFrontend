import React from "react";
import { Link } from "react-router-dom";
import {useAuthContext}  from "../contexts/AuthContext";
import Admin from "../pages/admin/Admin";

export default function NavigacioAdmin() {
    const {  logout } = useAuthContext();

    return (
        <nav className="navbar navbar-expand-sm bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="navbar-item">
                        <Link className="nav-link" to="/">
                            Kezdőlap Admin
                            
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" to="tanarok">
                            Tanárok
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" to="Dokumentumok">
                            Dokumentumok
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