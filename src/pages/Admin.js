import React, { useState, useEffect } from 'react';
import { myAxios } from '../contexts/MyAxios';
import { useAuthContext } from '../contexts/AuthContext';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const { user, logout } = useAuthContext(); 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await myAxios.get('/api/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Hiba a felhasználók lekérdezésekor:', error);
      }
    };

    fetchUsers();
  }, []);
  console.log(user)
  return (
    <div className="admin-container">
      <h1>Admin Felület</h1>
      <p>Üdvözöljük az admin felületen!</p>
      <h2>Felhasználók</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-warning">Szerkesztés</button>
                <button className="btn btn-danger">Törlés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={logout}>Kijelentkezés</button>
    </div>
  );
}