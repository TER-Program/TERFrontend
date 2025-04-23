import { useState, useEffect } from "react";
import { Card, Table, Button, Form } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";
import CelSor from "./CelSor";

const Tanar = () => {
  const { user, celok, fetchCelokById, postDokumentum } = useAuthContext();

  useEffect(() => {
    fetchCelokById(user.id);
    console.log(celok)
  }, []);

  return (
    <Card className="p-4">
      <h2 className="mb-4">Teljesítmény Célok</h2>
      <Table striped bordered hover>
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
  );
};

export default Tanar;
