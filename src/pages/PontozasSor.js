import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Button } from "react-bootstrap";

function PontozasSor({ cel }) {
  const { patchPontozas, user, postComment, fetchCommentekById, commentek } = useAuthContext();
  const [score, setScore] = useState("");
  const [openRow, setOpenRow] = useState(false);
  const [commentText, setCommentText] = useState("");

  // Handle score change
  const handleScoreChange = (e) => {
    setScore(e.target.value);
  };

  // Handle Pontozas submission
  const handlePontozas = () => {
    if (score !== "") {
      patchPontozas(cel.id, score, user.id);
    } else {
      alert("Kérjük, adjon meg egy pontszámot!");
    }
  };

  // Handle comment submission
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
    if (!openRow) {
      fetchCommentekById(cel.id);
    }
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
            {/* Comment form */}
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

            <div className="mt-3">
              {commentek && commentek.length > 0 ? (
                commentek.map((comment, index) => (
                  <div key={index} className="border p-2 mb-2">
                    <strong>{comment.name}</strong> <small>({comment.date})</small>
                    <p className="commentText">{comment.text}</p>
                    {comment.evaluator === user.id && (
                      <Button variant="primary" type="submit" className="torlesGomb">
                          Törlés
                      </Button>
                    )
                    }
                  </div>
                ))
              ) : (
                <p>Nincs hozzászólás.</p>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default PontozasSor;
