import React, { useState, useEffect } from 'react';
import { Table, Card } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';

function Felelos() {

  const { celok } = useAuthContext();

  const unscoredCelok = celok.filter((cel) => cel.scored === null);

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
                <th>Pontozás</th>
              </tr>
            </thead>
            <tbody>
              {unscoredCelok.map((cel) => (
                <tr key={cel.id}>
                  <td>{cel.teacher_name}</td>
                  <td>{cel.aspect_name}</td>
                  <td><input className='pontszam' type="number"></input></td>
                  <td>{cel.max_score}</td>
                  <td>Dokumentumok</td>
                  <td><button>Pontozás</button></td>
                </tr>
              ))}

            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Felelos;
