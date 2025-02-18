import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";

const CelSor = ({ cel }) => {
  const [openRow, setOpenRow] = useState(null);
  const [documents, setDocuments] = useState(""); // Fájl vagy szöveg adat

  const { postDokumentum } = useAuthContext();
  const toggleRow = (id) => {
    setOpenRow(openRow === id ? null : id);
  };
  function handleSubmit(e) {
    e.preventDefault();
    let adat = {
      documents: documents,
      performanceGoal: cel.id
    };
    console.log(adat);
    postDokumentum(adat);
  }
 

  return (
    <>
      <tr key={cel.id}>
        <td>{cel.teacher_name}</td>
        <td>{cel.aspect_name}</td>
        <td>{cel.score}</td>
        <td>{cel.scored || "-"}</td>
        <td className="text-center">
          <Button
            variant="link"
            onClick={() => toggleRow(cel.id)}
            className="p-0"
          >
            {openRow === cel.id ? "▲" : "▼"}
          </Button>
        </td>
      </tr>
      {openRow === cel.id && (
        <tr>
          <td colSpan="5">
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Írj be valamit..."
                  value={documents}
                  onChange={(e) => setDocuments(e.target.value)} // Szöveg input
                />
              </Form.Group>
              <Button variant="primary" onClick={handleSubmit}>
                Közzététel
              </Button>
            </Form>
          </td>
        </tr>
      )}
    </>
  );
};

export default CelSor;