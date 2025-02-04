import React, { useState, useEffect } from 'react';
import { myAxios } from '../contexts/MyAxios';
import { useAuthContext } from '../contexts/AuthContext';

function Tanar() {
  const [celok, setCelok] = useState([]);
  const [dokumentum, setDokumentum] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCelok = async () => {
      try {
        const response = await myAxios.get(`/api/tanar/celok/${user.id}`);
        setCelok(response.data);
      } catch (error) {
        console.error('Hiba a célok lekérdezésekor:', error);
      }
    };

    fetchCelok();
  }, [user.id]);

  const handleDokumentumHozzafuzese = async (celId) => {
    const formData = new FormData();
    formData.append('dokumentum', dokumentum);

    try {
      await myAxios.post(`/api/tanar/celok/${celId}/dokumentum`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Dokumentum sikeresen hozzáfűzve!');
    } catch (error) {
      console.error('Hiba a dokumentum hozzáfűzésekor:', error);
    }
  };

  return (
    <div className="container">
      <h1>Tanár Teljesítménycélok</h1>
      <ul className="list-group">
        {celok.map((cel) => (
          <li key={cel.id} className="list-group-item">
            <h3>{cel.name}</h3>
            <p>{cel.aspect_item}</p>
            <p>Státusz: {cel.status}</p>
            <p>Pontszám: {cel.score}</p>
            <p>Teljesítve: {cel.completed ? 'Igen' : 'Nem'}</p>
            <p>Létrehozva: {new Date(cel.created_at).toLocaleDateString()}</p>
            <p>Frissítve: {new Date(cel.updated_at).toLocaleDateString()}</p>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setDokumentum(e.target.files[0])}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={() => handleDokumentumHozzafuzese(cel.id)}
            >
              Dokumentum hozzáfűzése
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tanar;