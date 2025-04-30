import React, { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';

function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  const {changePassword} = useAuthContext();

  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setFieldErrors({});

    const response = await changePassword(formData);

    if (response.status === 200) {
      setFormData({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      });
    } else if (response.status === 422 || response.status === 403) {
      const data = response.data;
      if (data.errors) {
        setFieldErrors(data.errors);
      } else if (data.message) {
        setErrorMessage(data.message);
      }
    } else {
      setErrorMessage('Váratlan hiba történt.');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h4>Jelszó módosítása</h4>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Jelenlegi jelszó</Form.Label>
          <Form.Control
            type="password"
            name="current_password"
            value={formData.current_password}
            onChange={handleChange}
            isInvalid={!!fieldErrors.current_password}
            required
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.current_password?.[0]}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Új jelszó</Form.Label>
          <Form.Control
            type="password"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            isInvalid={!!fieldErrors.new_password}
            required
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.new_password?.[0]}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Új jelszó megerősítése</Form.Label>
          <Form.Control
            type="password"
            name="new_password_confirmation"
            value={formData.new_password_confirmation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Mentés
        </Button>
      </Form>
    </Container>
  );
}

export default ChangePasswordForm;
