import React, { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Card, Container } from 'react-bootstrap';

function Megjegyzesek(cel) {
  const { user, fetchCommentekById, commentekById } = useAuthContext();
  useEffect(() => {
    fetchCommentekById(user.id);
  }, []);
  return (
    <Container className="my-5">
        <h4 className="mb-4">Megjegyzések</h4>
        {commentekById.map((comment) => (
            <Card key={comment.comment_id} className="mb-3 shadow-sm">
                <Card.Body>
                    <Card.Title className="mb-1">{comment.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
                        Értékelő: {comment.evaluator_name}
                    </Card.Subtitle>
                    <Card.Text style={{ whiteSpace: 'pre-line' }}>
                        {comment.comment_text}
                    </Card.Text>
                    <Card.Footer className="text-muted text-end" style={{ fontSize: '0.8rem', background: 'transparent', borderTop: 'none' }}>
                        {new Date(comment.comment_date).toLocaleString()}
                    </Card.Footer>
                </Card.Body>
            </Card>
        ))}
    </Container>
);
}

export default Megjegyzesek;
