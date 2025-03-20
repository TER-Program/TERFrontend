import React, { useEffect } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dokumentum from './Dokumentum';
function Dokumentumok() {
  const { fetchDokumentumokById, dokumentum, user } = useAuthContext();
  useEffect(() => {
    fetchDokumentumokById(user.id)
  }, []);
  return (
    <div className="container mt-4">
      {dokumentum.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Dokumentum neve</th>
              <th>Tanár</th>
              <th>Aspektus</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {dokumentum.map((doc, index) => (
              <Dokumentum  key={index} doc={doc} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">Nincsenek dokumentumok.</p>
      )}
    </div>
  );
}

export default Dokumentumok