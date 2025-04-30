import React, { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Card, Container } from "react-bootstrap";

function TanarPont() {
  const { user, tanarPontById, fetchTanarPontById } = useAuthContext();
  useEffect(() => {
    fetchTanarPontById(user.id);
  }, []);
  const pontKategoria = (pont) => {
    if (pont >= 80) return "Kiemelkedő";
    if (pont >= 50) return "Átlagos";
    return "Fejlesztendő";
  };
  return (
    <Container className="mt-5">
      {tanarPontById.map((pont, index) => (
        <Card className="mt-4" key={index}>
          <Card.Body>
            <Card.Title>{pont.name}</Card.Title>
            <Card.Text style={{ textAlign: "left" }}>Pontszám: {pont.score_count}</Card.Text>
            <Card.Text style={{ textAlign: "left" }}>Besorolás: {pontKategoria(pont.score_count)}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default TanarPont;
