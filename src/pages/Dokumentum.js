import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Dokumentum({ doc, index }) {
  console.log(doc)
  const handleDownload = () => {
    // Instead of opening a new tab, trigger a download with window.location.href
    window.location.href = `/api/documents/${doc.id}`;
  };
  return (
    <div>
      <tr key={index}>
        <td>{doc.document_name}</td>
        <td>{doc.teacher_name}</td>
        <td>{doc.aspect_item_name}</td>
        <td>
          <button onClick={handleDownload} className="btn btn-primary btn-sm">
            Megnyitás
          </button>
        </td>
      </tr>
    </div>
  );
}

export default Dokumentum;
