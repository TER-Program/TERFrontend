import { Card, Table } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";

function Tanarok() {

    const { tanarPont, fetchPontszam, user, getUser } = useAuthContext();

    useEffect(() => {
        fetchPontszam();
        getUser();
    }, []);
    const pontKategoria = (pont) => {
        if (pont >= 80) return 'Kiemelkedő';
        if (pont >= 50) return 'Átlagos';
        return 'Fejlesztendő';
    };

    return (
        <div>
            <Card className="p-4">
                <h2 className="mb-4">Tanári teljesítményértékelés</h2>
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
                            </tr>
                        ))}
                        {
                            user.role === 0 && (
                                <tr>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => console.log("Siker!")}
                                        >
                                            Feltöltés
                                        </button>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </Table>
            </Card>
        </div>
    );
}

export default Tanarok;