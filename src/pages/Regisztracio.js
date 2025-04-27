import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Button, Card, Container, Form } from 'react-bootstrap';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const { regisztracio } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    let adat = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };
    console.log(adat);
    regisztracio(adat);
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <h1 className="text-center mb-4">Regisztráció</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Név</Form.Label>
            <Form.Control
              type="text"
              placeholder="Név"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control
              type="password"
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
  
          <Form.Group className="mb-4" controlId="passwordConfirmation">
            <Form.Label>Adja meg jelszavát újra</Form.Label>
            <Form.Control
              type="password"
              placeholder="Adja meg jelszavát újra"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </Form.Group>
  
          <Button variant="primary" type="submit" className="w-100">
            Regisztrálok
          </Button>
        </Form>
      </Card>
    </Container>
  );
}