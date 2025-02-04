import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';

function Felelos() {
  const [teacher, setTanar] = useState('');
  const [aspect_item, setSzempont] = useState('');
  const [name, setNev] = useState('');

  const {
    fetchCelok,
    fetchPedagogusok,
    fetchSzempontok,
    szempontok,
    celok,
    pedagogusok,
    postCel,
  } = useAuthContext();

  useEffect(() => {
    fetchCelok();
    fetchPedagogusok();
    fetchSzempontok();
  }, []);

  function handleCelHozzaadas(e) {
    e.preventDefault();
    let adat = {
      teacher: teacher,
      aspect_item: aspect_item,
      name: name,
    };
    console.log(adat);
    postCel(adat);
  }

  return (
    <Card className="p-4">
      <h2 className="mb-4">Felelős Teljesítménycélok</h2>
      <h3>Új cél hozzáadása</h3>
      <Form className="mb-4" onSubmit={handleCelHozzaadas}>
        <Form.Group controlId="formPedagogus">
          <Form.Label>Pedagógus</Form.Label>
          <Form.Control
            as="select"
            value={teacher}
            onChange={(e) => setTanar(e.target.value)}
          >
            <option value="">Válassz pedagógust</option>
            {pedagogusok &&
              pedagogusok.map((pedagogus) => (
                <option key={pedagogus.id} value={pedagogus.id}>
                  {pedagogus.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formAspectItem">
          <Form.Label>Szempont</Form.Label>
          <Form.Control
            as="select"
            value={aspect_item}
            onChange={(e) => setSzempont(e.target.value)}
          >
            <option value="">Válassz szempontot</option>
            {szempontok &&
              szempontok.map((szempont) => (
                <option key={szempont.id} value={szempont.id}>
                  {szempont.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formNev">
          <Form.Label>Név</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setNev(e.target.value)}
          />
        </Form.Group>

        <Button className="mt-2" type="submit">
          Hozzáadás
        </Button>
      </Form>
    </Card>
  );
}

export default Felelos;