import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { useAuthContext } from "../contexts/AuthContext";

const Tanar = () => {
  const [celok, setCelok] = useState([]);
  const [betolt, setBetolt] = useState(true);
  const { user, logout } = useAuthContext();

  useEffect(() => {
    fetch("/api/goals")
      .then((response) => response.json())
      .then((data) => {
        setCelok(data);
        setBetolt(false);
      })
      .catch((error) => {
        console.error("Hiba a célok lekérésekor:", error);
        setBetolt(false);
      });
  }, []);

  if (betolt) {
    return <div className="d-flex justify-content-center mt-4"><Spinner animation="border" /></div>;
  }

  return (
    <Card className="p-4">
      <h2 className="mb-4">Teljesítmény Célok</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Név</th>
            <th>Pontszám</th>
            <th>Állapot</th>
            <th>Teljesítve</th>
            <th>Dokumentum</th>
          </tr>
        </thead>
        <tbody>
          {celok.map((cel) => (
            <tr key={cel.id}>
              <td>{cel.name}</td>
              <td>{cel.score}</td>
              <td>{cel.status === 1 ? "Teljesítve" : "Folyamatban"}</td>
              <td>{cel.completed || "-"}</td>
              <td>
                {cel.document ? (
                  <a href={cel.document} className="text-primary" target="_blank" rel="noopener noreferrer">Megtekintés</a>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <button className="btn btn-primary" onClick={logout}>Kijelentkezés</button>
      </Table>
    </Card>
    
  );
};

export default Tanar;
