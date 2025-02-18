import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { myAxios } from './MyAxios';

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [celok, setCelok] = useState([]);
  const [pedagogusok, setPedagogusok] = useState([]);
  const [szempontok, setszempontok] = useState([]);
  const csrf = async () => {
    await myAxios.get("/sanctum/csrf-cookie");
  };
  useEffect(() => {
    if(!user){
      getUser()
    }
  }, []);


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

  const postCel = async (adat) => {
    try {
      await myAxios.post("/newGoal", adat);
      console.log("Siker!");
      getUser();
      navigate("/");
    } catch (error) {
      console.error("Feltöltési hiba:", error);
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


  const fetchCelok = async () => {
    try {
      const response = await myAxios.get('/api/performanceGoals');
      setCelok(response.data);
    } catch (error) {
      console.error('Hiba a célok lekérdezésekor:', error);
    }
  };

  const fetchSzempontok = async () => {
    try {
      const response = await myAxios.get('/api/aspectItem');
      setszempontok(response.data);
    } catch (error) {
      console.error('Hiba a szempontok lekérdezésekor:', error);
    }
  };

  const fetchPedagogusok = async () => {
    try {
      const response = await myAxios.get('/api/teachers');
      setPedagogusok(response.data);
    } catch (error) {
      console.error('Hiba a pedagógusok lekérdezésekor:', error);
    }
  };

  const fetchCelokById = async (userId) => {
    try {
      const response = await myAxios.get(`/api/getGoalsByUserId/${userId}`);
      setCelok(response.data);
    } catch (error) {
      console.error('Hiba a célok lekérdezésekor:', error);
    }
  };

  const postDokumentum = async (adat) => {
    try {
      await myAxios.post("/api/newDocument", adat);
      console.log("Siker!");
    } catch (error) {
      console.error("Feltöltési hiba:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ regisztracio, logout, user, getUser, login, fetchCelok, celok , fetchPedagogusok, pedagogusok, fetchSzempontok, szempontok, postCel, fetchCelokById, postDokumentum}}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuthContext = () => {
  return useContext(AuthContext);
};