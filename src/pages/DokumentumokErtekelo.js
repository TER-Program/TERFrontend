import React, { useEffect } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dokumentum from './Dokumentum';
function DokumentumokErtekelo() {
  const { fetchDokumentumok, dokumentumok, user } = useAuthContext();
  useEffect(() => {
    fetchDokumentumok()
  }, []);
  return (
    <div className="container mt-4">
      {dokumentumok.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Dokumentum neve</th>
              <th>Tanár</th>
              <th>Aspektus</th>
              <th>Link</th>
              {user.role === 0 &&(
                <th>Törlés</th>
              )
            }
            </tr>
          </thead>
          <tbody>
            {dokumentumok.map((doc, index) => (
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

export default DokumentumokErtekelo