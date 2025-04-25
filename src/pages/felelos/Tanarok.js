import { Card, Container, Table } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { myAxios } from "../../contexts/MyAxios";

function Tanarok() {
  const { tanarPont, fetchPontszam, user, getUser, feltoltes } =
    useAuthContext();

  useEffect(() => {
    fetchPontszam();
    getUser();
  }, []);
  const pontKategoria = (pont) => {
    if (pont >= 80) return "Kiemelkedő";
    if (pont >= 50) return "Átlagos";
    return "Fejlesztendő";
  };
  console.log(tanarPont);
  return (
    <div>
      <Container className="mt-4">
      <h2 className="mb-4">Tanárok</h2>
        <Card className="p-4">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Név</th>
                <th>Pontszám</th>
                <th>Besorolás</th>
                {user.role === 0 && <th>Művelet</th>}
              </tr>
            </thead>
            <tbody>
              {tanarPont.map((tanarPont, index) => (
                <tr key={index}>
                  <td>{tanarPont.name}</td>
                  <td>{tanarPont.total_score}</td>
                  <td>{pontKategoria(tanarPont.total_score)}</td>
                  {user.role === 0 && tanarPont.total_score === null ? (
                    <td>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => feltoltes(tanarPont.id)}
                      >
                        Feltöltés
                      </button>
                    </td>
                  ) : (
                    user.role === 0 && <td>Feltöltve</td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
}
export default Tanarok;
