import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";

const CelSor = ({ cel }) => {
  const [openRow, setOpenRow] = useState(null);
  const [documentFile, setDocumentFile] = useState(null); // Fájl
  const [performanceGoal, setPerformanceGoal] = useState(""); // PerformanceGoal ID
  const { uploadPdf } = useAuthContext();

  const toggleRow = (id) => {
    setOpenRow(openRow === id ? null : id);
  };
  function handleSubmit(event) {
    event.preventDefault();

    if (!documentFile) {
        alert("Kérjük, válasszon egy PDF fájlt!");
        return;
    }

    if (documentFile.type !== "application/pdf") {
        alert("Csak PDF fájlok tölthetők fel!");
        return;
    }

    if (!performanceGoal) {
        alert("A performance goal mező kitöltése kötelező!");
        return;
    }

    const formData = new FormData();
    formData.append("pdf", documentFile);
    formData.append("performanceGoal", performanceGoal);

    console.log("FormData:", formData);

    uploadPdf(formData, "/api/upload-pdf")
        .then((response) => {
            console.log("Upload successful", response);
        })
        .catch((error) => {
            if (error.response) {
                console.error("Upload error:", error.response.data);
                alert("Hiba történt a fájl feltöltése közben. Részletek: " + JSON.stringify(error.response.data.errors));
            } else {
                console.error("Error:", error.message);
                alert("Hiba történt a fájl feltöltése közben.");
            }
        });
}


  return (
    <>
      <tr key={cel.id}>
        <td>{cel.teacher_name}</td>
        <td>{cel.aspect_name}</td>
        <td>{cel.score}</td>
        <td>{cel.scored || "-"}</td>
        {cel.doc_required === 1 ? (
          <td className="text-center">
            <Button
              variant="link"
              onClick={() => toggleRow(cel.id)}
              className="p-0"
            >
              {openRow === cel.id ? "▲" : "▼"}
            </Button>
          </td>
        ) : (
          cel.doc_required === 0 && <td>Nem szükséges dokumentum</td>
        )}
      </tr>
      {openRow === cel.id && (
        <tr>
          <td colSpan="5">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  onChange={(e) => {
                    setDocumentFile(e.target.files[0]);
                    setPerformanceGoal(cel.id);
                  }}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
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
