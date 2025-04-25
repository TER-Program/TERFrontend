import React, { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Container, Table, Alert } from "react-bootstrap";
import Dokumentum from "../tanar/Dokumentum";

function DokumentumokErtekelo() {
  const { fetchDokumentumok, dokumentumok, user } = useAuthContext();

  useEffect(() => {
    fetchDokumentumok();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Dokumentumok</h2>
      {dokumentumok.length > 0 ? (
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
            {dokumentumok.map((doc, index) => (
              <Dokumentum key={index} doc={doc} />
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="secondary">Nincsenek dokumentumok.</Alert>
      )}
    </Container>
  );
}

export default DokumentumokErtekelo;
