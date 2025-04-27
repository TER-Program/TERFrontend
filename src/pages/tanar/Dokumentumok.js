import React, { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Dokumentum from "./Dokumentum";
import { Card, Container, Table } from "react-bootstrap";
function Dokumentumok() {
  const { fetchDokumentumokById, dokumentumById, user } = useAuthContext();
  useEffect(() => {
    fetchDokumentumokById(user.id);
  }, []);
  return (
    <Container className="mt-4">
      <h2>Dokumentumok</h2>
      <Card className="p-4">
        {dokumentumById.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Dokumentum neve</th>
                <th>Tanár</th>
                <th>Szempont</th>
                <th>Link</th>
                {user.role === 0 && <th>Törlés</th>}
              </tr>
            </thead>
            <tbody>
              {dokumentumById.map((doc, index) => (
                <Dokumentum key={index} doc={doc} />
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-muted">Nincsenek dokumentumok.</p>
        )}
      </Card>
    </Container>
  );
}

export default Dokumentumok;
