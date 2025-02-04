import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form } from 'react-bootstrap';
import { myAxios } from '../contexts/MyAxios';
import { useAuthContext } from '../contexts/AuthContext';

function Felelos() {
  const [celok, setCelok] = useState([]);
  const [pedagogusok, setPedagogusok] = useState([]);
  const [szempontok, setszempontok] = useState([]);
  const [ujCel, setUjCel] = useState({ teacher: '', aspect_item: '', name: '' });
  const [ertekeles, setErtekeles] = useState({ id: '', score: '', comment: '' });
  const { user, logout } = useAuthContext();

  useEffect(() => {
    const fetchCelok = async () => {
      try {
        const response = await myAxios.get('/api/performanceGoals');
        setCelok(response.data);
      } catch (error) {
        console.error('Hiba a célok lekérdezésekor:', error);
      }
    };
  
    const fetchSzempontok = async () => {
      try {
        const response = await myAxios.get('/api/aspectItem');
        setszempontok(response.data);
      } catch (error) {
        console.error('Hiba a szempontok lekérdezésekor:', error);
      }
    };
  
    const fetchPedagogusok = async () => {
      try {
        const response = await myAxios.get('/api/teachers');
        setPedagogusok(response.data);
      } catch (error) {
        console.error('Hiba a pedagógusok lekérdezésekor:', error);
      }
    };
  
    fetchCelok();
    fetchPedagogusok();
    fetchSzempontok();
  }, []);

  const handleCelHozzaadas = async () => {
    try {
      await myAxios.post('/api/store', ujCel);
      setCelok([...celok, ujCel]);
      setUjCel({ teacher: '', aspect_item: '', name: '' });
    } catch (error) {
      console.error('Hiba a cél hozzáadásakor:', error);
    }
  };

  const handleErtekeles = async () => {
    try {
      await myAxios.post('/api/comment', ertekeles);
      setCelok(celok.map(cel => (cel.id === ertekeles.id ? { ...cel, score: ertekeles.score, comment: ertekeles.comment } : cel)));
      setErtekeles({ id: '', score: '', comment: '' });
    } catch (error) {
      console.error('Hiba az értékeléskor:', error);
    }
  };

  const handleStatuszBeallitas = async (celId, status) => {
    try {
      await myAxios.put(`/api/performanceGoals/${celId}/statusz`, { status });
      setCelok(celok.map(cel => (cel.id === celId ? { ...cel, status } : cel)));
    } catch (error) {
      console.error('Hiba a státusz beállításakor:', error);
    }
  };

  return (
    <Card className="p-4">
      <h2 className="mb-4">Felelős Teljesítménycélok</h2>
      <h3>Új cél hozzáadása</h3>
      <Form className="mb-4">
        <Form.Group controlId="formPedagogus">
          <Form.Label>Pedagógus</Form.Label>
          <Form.Control as="select" value={ujCel.teacher} onChange={(e) => setUjCel({ ...ujCel, teacher: e.target.value })}>
            <option value="">Válassz pedagógust</option>
            {pedagogusok.map(pedagogus => (
              <option key={pedagogus.id} value={pedagogus.id}>{pedagogus.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formAspectItem">
          <Form.Label>Szempont</Form.Label>
          <Form.Control as="select" value={ujCel.aspect_item} onChange={(e) => setUjCel({ ...ujCel, aspect_item: e.target.value })}>
            <option value="">Válassz szempontot</option>
            {szempontok.map(szempont => (
              <option key={szempont.id} value={szempont.id}>{szempont.name}</option>
            ))}
          </Form.Control>
          <Form.Label>Név</Form.Label>
          <Form.Control type="text" value={ujCel.name} onChange={(e) => setUjCel({ ...ujCel, name: e.target.value })} />
        </Form.Group>
        <Button className="mt-2" onClick={handleCelHozzaadas}>Hozzáadás</Button>
      </Form>
      <h3>Teljesítménycélok</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Név</th>
            <th>Szempont</th>
            <th>Státusz</th>
            <th>Pontszám</th>
            <th>Megjegyzés</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {celok.map(cel => (
            <tr key={cel.id}>
              <td>{cel.name}</td>
              <td>{cel.aspect_item}</td>
              <td>{cel.status}</td>
              <td>{cel.score}</td>
              <td>{cel.comment}</td>
              <td>
                <Button variant="secondary" className="me-2" onClick={() => handleStatuszBeallitas(cel.id, 'nem kitöltendő')}>Nem kitöltendő</Button>
                <Button variant="warning" className="me-2" onClick={() => handleStatuszBeallitas(cel.id, 'kitöltendő')}>Kitöltendő</Button>
                <Button variant="success" onClick={() => handleStatuszBeallitas(cel.id, 'kész')}>Kész</Button>
                <Form className="mt-3">
                  <Form.Group controlId="formScore">
                    <Form.Label>Pontszám</Form.Label>
                    <Form.Control type="number" value={ertekeles.score} onChange={(e) => setErtekeles({ ...ertekeles, score: e.target.value })} />
                  </Form.Group>
                  <Form.Group controlId="formComment">
                    <Form.Label>Megjegyzés</Form.Label>
                    <Form.Control type="text" value={ertekeles.comment} onChange={(e) => setErtekeles({ ...ertekeles, comment: e.target.value })} />
                  </Form.Group>
                  <Button className="mt-2" onClick={handleErtekeles}>Értékelés</Button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </Card>
  );
}

export default Felelos;