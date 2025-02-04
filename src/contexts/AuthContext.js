import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { myAxios } from './MyAxios';

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const csrf = async () => {
    await myAxios.get("/sanctum/csrf-cookie");
  };



  const regisztracio = async (adat) => {
    await csrf();
    try {
      await myAxios.post("/register", adat);
      console.log("Siker!");
      getUser();
      navigate("/");
    } catch (error) {
      console.error("Regisztrációs hiba:", error);
    }
  };
  const login = async (adat) => {
    await csrf();
    try {
      await myAxios.post("/login", adat);
      console.log("Siker!");
      getUser();
      navigate("/");
    } catch (error) {
      console.error("Bejelentkezési hiba:", error);
    }
  };

  const logout = async () => {
    await csrf();
    try {
      await myAxios.post("/logout");
      console.log("Sikeres kijelentkezés!");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Kijelentkezési hiba:", error);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await myAxios.get("/api/user");
      setUser(data);
      console.log(data)
    } catch (error) {
      console.error("Felhasználó lekérdezési hiba:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ regisztracio, logout, user, getUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuthContext = () => {
  return useContext(AuthContext);
};