import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Bejelentkezes() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    let adat = {
      email: email,
      password: password,
    };
    console.log(adat);
    login(adat);
  }

  return (
    <div className="m-auto" style={{ maxWidth: "400px" }}>
      <h1 className="text-center">Bejelentkezés</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control"
            id="email"
            placeholder="Email"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">
            Jelszó:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control"
            id="pwd"
            placeholder="Jelszó"
            name="pwd"
          />
        </div>


        <button type="submit" className="btn btn-primary w-100">
          Bejelentkezés
        </button>
      </form>
    </div>
  );
}