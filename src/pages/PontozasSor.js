import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Form } from "react-router-dom";
import { Button } from "react-bootstrap";

function PontozasSor({ cel }) {
  const { patchPontozas, user, postComment} =
    useAuthContext();
  const [score, setScore] = useState("");
  const [openRow, setOpenRow] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleScoreChange = (e) => {
    setScore(e.target.value);
  };

  const handlePontozas = () => {
    if (score !== "") {
      patchPontozas(cel.id, score, user.id);
    } else {
      alert("Kérjük, adjon meg egy pontszámot!");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      alert("A hozzászólás nem lehet üres!");
      return;
    }
    try {
      await postComment(cel.id, commentText);
      setCommentText("");
      console.log("Hozzászólás sikeresen elküldve!");
    } catch (error) {
      console.error("Hiba történt a hozzászólás beküldése közben:", error);
    }
  };
  const toggleRow = () => {
    setOpenRow(!openRow);
  };

  return (
    <>
      <tr key={cel.id}>
        <td>{cel.teacher_name}</td>
        <td>{cel.aspect_name}</td>
        <td className="pontszam">
          <input
            type="number"
            min={0}
            max={cel.max_score}
            value={score}
            onChange={handleScoreChange}
          />
        </td>
        <td>{cel.max_score}</td>
        <td>
          <button onClick={handlePontozas}>Pontozás</button>
        </td>
        <td className="text-center">
          <button onClick={toggleRow} className="p-0">
            {openRow ? "▲" : "▼"}
          </button>
        </td>
      </tr>
      {openRow && (
        <tr>
          <td colSpan="6">
            <form onSubmit={handleCommentSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Írja be a hozzászólást..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </div>
              <Button variant="primary" type="submit">
                Hozzászólás
              </Button>
            </form>
          </td>
        </tr>
      )}
    </>
  );
}

export default PontozasSor;
