import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

function PontozasSor({ cel }) {
  const { patchPontozas, user } = useAuthContext();
  const [score, setScore] = useState('');

  const handleScoreChange = (e) => {
    setScore(e.target.value);
  };

  const handlePontozas = () => {
    if (score !== '') {
      patchPontozas(cel.id, score, user.id)
    } else {
      alert('Kérjük, adjon meg egy pontszámot!');
    }
  };

  return (
    <tr key={cel.id}>
      <td>{cel.teacher_name}</td>
      <td>{cel.aspect_name}</td>
      <td className='pontszam'>
        <input
          type="number"
          min={0}
          max={cel.max_score}
          value={score}
          onChange={handleScoreChange}
        />
      </td>
      <td>{cel.max_score}</td>
      <td>Dokumentumok</td>
      <td>
        <button onClick={handlePontozas}>Pontozás</button>
      </td>
    </tr>
  );
}

export default PontozasSor;