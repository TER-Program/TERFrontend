import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuthContext } from "../contexts/AuthContext";

function Dokumentum({ doc, index }) {
  const { dokumentumTorles , user} = useAuthContext();
  const handleDownload = () => {
    window.location.href = `http://localhost:8000/api/documents/${doc.id}`;
  };
  const handleTorles = () =>{
    dokumentumTorles(doc.id);
    
  }
  return (
      <tr key={index}>
        <td>{doc.document_name}</td>
        <td>{doc.teacher_name}</td>
        <td>{doc.aspect_item_name}</td>
        <td>
          <button onClick={handleDownload} className="btn btn-primary btn-sm">
            Megnyitás
          </button>
        </td>
        {user.role === 0 && (
          <td>
          <button onClick={handleTorles} className="btn btn-primary btn-sm">
            Törlés
          </button>
        </td>
        )} 
      </tr>
  );
}

export default Dokumentum;
