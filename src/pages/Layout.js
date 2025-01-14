import React from 'react';
import { Outlet, Link } from 'react-router-dom';


export default function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Kezdőlap</Link>
          </li>
          <li>
            <Link to="/bejelentkezes">Bejelentkezés</Link>
          </li>
          <li>
            <Link to="/regisztracio">Regisztráció</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}