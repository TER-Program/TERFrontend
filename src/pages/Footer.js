// Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; 2025 Minden jog fenntartva.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
