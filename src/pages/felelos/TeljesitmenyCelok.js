import React, { useEffect, useState } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";
import TeljesitmenyCel from "./TeljesitmenyCel";

function TeljesitmenyCelok() {
  const { user, fetchPontozottCelById, osszesPontozottCelById } =
    useAuthContext();
  useEffect(() => {
    fetchPontozottCelById(user.id);
    console.log(osszesPontozottCelById);
  }, []);

  return (
    <Container className="mt-4">
      <h2>Pontozott teljesítménycélok</h2>
      <Card>
        <Card.Body>
          <Table bordered hover responsive className="mt-4">
            <thead>
              <tr>
                <th>Tanár neve</th>
                <th>Szempont neve</th>
                <th>Leírás</th>
                <th>Pontszám</th>
                <th>Akciók</th>
              </tr>
            </thead>
            <tbody>
              {osszesPontozottCelById.map((cel, index) => (
                <TeljesitmenyCel cel={cel} key={index} />
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TeljesitmenyCelok;
