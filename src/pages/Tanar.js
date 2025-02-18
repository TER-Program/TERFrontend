import { Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";

const Tanar = () => {
  
  const {user,logout, celok, fetchCelokById } = useAuthContext();
  useEffect(() => {
    fetchCelokById(user.id);
  }, []);
  
  return (
    <Card className="p-4">
      <h2 className="mb-4">Teljesítmény Célok</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tanár</th>
            <th>Szempont</th>
            <th>Pontszám</th>
            <th>Teljesítve</th>
          </tr>
        </thead>
        <tbody>
          {celok.map((cel) => (
            <tr key={cel.id}>
              <td>{cel.teacher_name}</td>
              <td>{cel.aspect_name}</td>
              <td>{cel.score}</td>
              <td>{cel.completed || "-"}</td>
            </tr>
          ))}
        </tbody>
        
      </Table>
    </Card>
    
  );
};

export default Tanar;
