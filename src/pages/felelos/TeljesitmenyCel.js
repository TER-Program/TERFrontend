import React from 'react'
import { Button } from 'react-bootstrap';
import { useAuthContext } from '../../contexts/AuthContext';

function TeljesitmenyCel(cel) {
  const {resetScore} = useAuthContext();
    return (
        <tr key={cel.cel.id}>
          <td>{cel.cel.teacher_name}</td>
          <td>{cel.cel.evaluator_name}</td>
          <td>{cel.cel.aspect_name}</td>
          <td>{cel.cel.aspect_description}</td>
          <td>{cel.cel.score}</td>
          <td>
            <Button variant="warning" onClick={() => resetScore(cel.cel.id)}>Visszaállítás</Button>
          </td>
        </tr>

      );
}

export default TeljesitmenyCel