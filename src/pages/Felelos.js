import React, { useState, useEffect } from 'react';
import { Table, Card } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';
import PontozasSor from './PontozasSor';

function Felelos() {

  const { celok, patchPontozas, user } = useAuthContext();
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
              {unscoredCelok.map((cel, index) => (
                <PontozasSor cel={cel} key={index} />
              ))}

            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Felelos;
