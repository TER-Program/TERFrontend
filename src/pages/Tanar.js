import { Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";

const Tanar = () => {
  
  const {logout, celok, getCelok } = useAuthContext();
  useEffect(() => {
    getCelok();
  }, []);
  
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
