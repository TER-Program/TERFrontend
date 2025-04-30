import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import {
  Container,
  Form,
  Button,
  Table,
  Alert,
  Row,
  Col,
  Card,
} from 'react-bootstrap';

export default function Admin() {
  const {
    fetchFelhasznalok,
    felhasznalok,
    szerkesztes,
    torles,
    mentes,
    szerkesztettFelhasznalo,
    setSzerkesztettFelhasznalo,
    uzenet,
    betoltes,
  } = useAuthContext();

  const [nev, setNev] = useState('');
  const [email, setEmail] = useState('');
  const [jogosultsag, setJogosultsag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredFelhasznalok = felhasznalok.filter((felhasznalo) =>
    felhasznalo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    felhasznalo.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-3">Admin Felület</h1>
      <p className="text-center">Üdvözöljük az admin felületen!</p>

      {uzenet && <Alert variant="info">{uzenet}</Alert>}

      <h2 className="mt-4">Felhasználók</h2>

      <Form.Control
        type="text"
        placeholder="Keresés név vagy email alapján..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-3"
      />

      <Table striped bordered hover responsive>
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
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => szerkesztes(felhasznalo)}
                >
                  Szerkesztés
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => torles(felhasznalo.id)}
                  disabled={betoltes}
                >
                  Törlés
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {szerkesztettFelhasznalo && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Felhasználó szerkesztése</Card.Title>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Név</Form.Label>
                <Form.Control
                  type="text"
                  value={nev}
                  onChange={(e) => setNev(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Jogosultság</Form.Label>
                <Form.Select
                  value={jogosultsag}
                  onChange={(e) => setJogosultsag(e.target.value)}
                >
                  <option value="1">Admin</option>
                  <option value="2">Tanár</option>
                  <option value="3">Tér Felelős</option>
                </Form.Select>
              </Form.Group>

              <Row>
                <Col>
                  <Button
                    variant="primary"
                    onClick={() => mentes(nev, email, jogosultsag)}
                    disabled={betoltes}
                    className="w-100"
                  >
                    Mentés
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="secondary"
                    onClick={() => setSzerkesztettFelhasznalo(null)}
                    disabled={betoltes}
                    className="w-100"
                  >
                    Mégse
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
