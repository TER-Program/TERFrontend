import { useState, useEffect } from "react";
import { Card, Table, Button, Form, Container } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";
import CelSor from "./CelSor";

const Tanar = () => {
  const { user, celok, fetchCelokById, postDokumentum } = useAuthContext();

  useEffect(() => {
    fetchCelokById(user.id);
  }, []);

  return (
    <Container className="mt-4">
    <h2 className="mb-4">Teljesítmény Célok</h2>
    <Card className="p-4">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tanár</th>
            <th>Szempont</th>
            <th>Pontszám</th>
            <th>Pontozva</th>
            <th>Dokumentum</th>
          </tr>
        </thead>
        <tbody>
          {celok.map((cel, index) => (
            <CelSor cel={cel} key={index} />
          ))}
        </tbody>
      </Table>
    </Card>
    </Container>
  );
};

export default Tanar;
