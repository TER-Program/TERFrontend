import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

export default function Admin() {
  const { fetchFelhasznalok, felhasznalok, szerkesztes, torles, mentes, szerkesztettFelhasznalo, setSzerkesztettFelhasznalo, uzenet, betoltes } = useAuthContext();
  const [nev, setNev] = useState('');
  const [email, setEmail] = useState('');
  const [jogosultsag, setJogosultsag] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Új állapot a keresési kifejezéshez

  useEffect(() => {
    fetchFelhasznalok();
  }, []);

  useEffect(() => {
    if (szerkesztettFelhasznalo) {
      setNev(szerkesztettFelhasznalo.name);
      setEmail(szerkesztettFelhasznalo.email);
      setJogosultsag(szerkesztettFelhasznalo.role);
    }
  }, [szerkesztettFelhasznalo]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFelhasznalok = felhasznalok.filter(felhasznalo =>
    felhasznalo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    felhasznalo.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Admin Felület</h1>
      <p>Üdvözöljük az admin felületen!</p>
      {uzenet && <div className="alert alert-info">{uzenet}</div>}
      <h2>Felhasználók</h2>
      <input 
        type="text" 
        placeholder="Keresés név vagy email alapján..." 
        value={searchTerm} 
        onChange={handleSearch} 
        className="form-control mb-3"
      />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Email</th>
            <th>Jogosultság</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {filteredFelhasznalok.map((felhasznalo) => (
            <tr key={felhasznalo.id}>
              <td>{felhasznalo.id}</td>
              <td>{felhasznalo.name}</td>
              <td>{felhasznalo.email}</td>
              <td>{felhasznalo.role}</td>
              <td>
                <button className="btn btn-warning" onClick={() => szerkesztes(felhasznalo)}>Szerkesztés</button>
                <button className="btn btn-danger" onClick={() => torles(felhasznalo.id)} disabled={betoltes}>Törlés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {szerkesztettFelhasznalo && (
        <div className="edit-form">
          <h3>Felhasználó szerkesztése</h3>
          <label className="form-label">
            Név:
            <input type="text" className="form-control" value={nev} onChange={(e) => setNev(e.target.value)} />
          </label>
          <label className="form-label">
            Email:
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="form-label">
            Jogosultság:
            <select className="form-control" value={jogosultsag} onChange={(e) => setJogosultsag(e.target.value)}>
              <option value="1">Admin</option>
              <option value="2">Tanár</option>
              <option value="3">Tér Felelős</option>
            </select>
          </label>
          <button className="btn btn-primary" onClick={() => mentes(nev, email, jogosultsag)} disabled={betoltes}>Mentés</button>
          <button className="btn btn-secondary" onClick={() => setSzerkesztettFelhasznalo(null)} disabled={betoltes}>Mégse</button>
        </div>
      )}
    </div>
  );
}