import React, { useState, useEffect } from "react";
import { Table, Card } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";
import PontozasSor from "./PontozasSor";

function Felelos() {
  const { celok, pedagogusok, fetchPedagogusok } = useAuthContext();
  const [selectedPedagogusId, setSelectedPedagogusId] = useState("");
  const filteredCelok = celok.filter(
    (cel) =>
      cel.scored === null &&
      (!selectedPedagogusId || cel.teacherId === parseInt(selectedPedagogusId))
  );
  useEffect(() => {
    fetchPedagogusok();
  }, []);
  return (
    <div>
      <h1>Pontozás</h1>
      <Card>
        <Card.Header>
          <select
            className="form-select"
            value={selectedPedagogusId}
            onChange={(e) => {
              setSelectedPedagogusId(e.target.value);
            }}
          >
            <option value="">Válassz tanárt</option>
            {pedagogusok.map((ped, index) => (
              <option key={index} value={ped.id}>
                {ped.name}
              </option>
            ))}
          </select>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Tanár neve</th>
                <th>Szempont neve</th>
                <th>Pontszám</th>
                <th>Maximális pontszám</th>
                <th>Pontozás</th>
              </tr>
            </thead>
            <tbody>
              {filteredCelok.map((cel, index) => (
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
