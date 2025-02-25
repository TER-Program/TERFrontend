import React, { useState, useEffect } from 'react';
import { myAxios } from '../contexts/MyAxios';
import { useAuthContext } from '../contexts/AuthContext';

export default function Admin() {
  const [felhasznalok, setFelhasznalok] = useState([]);
  const [szerkesztettFelhasznalo, setSzerkesztettFelhasznalo] = useState(null);
  const [nev, setNev] = useState('');
  const [email, setEmail] = useState('');
  const [jogosultsag, setJogosultsag] = useState('');
  const [uzenet, setUzenet] = useState('');
  const [betoltes, setBetoltes] = useState(false);
  const { user, logout } = useAuthContext();

  useEffect(() => {
    const felhasznalokLekerdezese = async () => {
      try {
        const response = await myAxios.get('/api/admin/users');
        setFelhasznalok(response.data);
      } catch (error) {
        console.error('Hiba a felhasználók lekérdezésekor:', error);
      }
    };

    felhasznalokLekerdezese();
  }, []);

  const szerkesztes = (felhasznalo) => {
    setSzerkesztettFelhasznalo(felhasznalo);
    setNev(felhasznalo.name);
    setEmail(felhasznalo.email);
    setJogosultsag(felhasznalo.role);
  };

  const torles = async (felhasznaloId) => {
    setBetoltes(true);
    try {
      await myAxios.delete(`/api/deleteUser/${felhasznaloId}`);
      setFelhasznalok(felhasznalok.filter((felhasznalo) => felhasznalo.id !== felhasznaloId));
      setUzenet('Felhasználó sikeresen törölve.');
    } catch (error) {
      console.error('Hiba a felhasználó törlésekor:', error);
      setUzenet('Hiba történt a felhasználó törlésekor.');
    } finally {
      setBetoltes(false);
    }
  };

  const mentes = async () => {
    if (!nev || !email || !jogosultsag) {
      setUzenet('Kérjük, töltse ki az összes mezőt.');
      return;
    }
    setBetoltes(true);
    try {
      await myAxios.put(`/api/updateUser/${szerkesztettFelhasznalo.id}`, {
        name: nev,
        email: email,
        role: jogosultsag,
      });
      setFelhasznalok(felhasznalok.map((felhasznalo) => 
        felhasznalo.id === szerkesztettFelhasznalo.id 
          ? { ...felhasznalo, name: nev, email: email, role: jogosultsag } 
          : felhasznalo
      ));
      setSzerkesztettFelhasznalo(null);
      setUzenet('Felhasználó sikeresen frissítve.');
    } catch (error) {
      console.error('Hiba a felhasználó szerkesztésekor:', error);
      setUzenet('Hiba történt a felhasználó szerkesztésekor.');
    } finally {
      setBetoltes(false);
    }
  };

  return (
    <div className="container">
      <h1>Admin Felület</h1>
      <p>Üdvözöljük az admin felületen!</p>
      {uzenet && <div className="alert alert-info">{uzenet}</div>}
      <h2>Felhasználók</h2>
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
          {felhasznalok.map((felhasznalo) => (
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
          <button className="btn btn-primary" onClick={mentes} disabled={betoltes}>Mentés</button>
          <button className="btn btn-secondary" onClick={() => setSzerkesztettFelhasznalo(null)} disabled={betoltes}>Mégse</button>
        </div>
      )}
    </div>
  );
}