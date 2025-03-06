import React, { useState, useEffect } from 'react';
import { Table, Card } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';

function Felelos() {
  const [openRow, setOpenRow] = useState(null);
  const { celok } = useAuthContext();

  // Filter only those goals that have not been scored yet (scored is null)
  const unscoredCelok = celok.filter((cel) => cel.scored === null);
  const toggleRow = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

  return (
    <div>
      <h1>Pontozás</h1>
      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Tanár neve</th>
                <th>Aspektus neve</th>
                <th>Pontszám</th>
                <th>Maximális pontszám</th>
                <th>Dokumentumok</th>
              </tr>
            </thead>
            <tbody>
              {unscoredCelok.map((cel) => (
                <tr key={cel.id}>
                  <td>{cel.teacher_name}</td>
                  <td>{cel.aspect_name}</td>
                  <td>{cel.score}</td>
                  <td>{cel.max_score}</td>
                </tr>
              ))}
              {openRow === celok.id && (
                <p>Igen</p>
                )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Felelos;
