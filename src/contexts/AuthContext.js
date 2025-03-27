import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myAxios } from "./MyAxios";

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [celok, setCelok] = useState([]);
  const [pedagogusok, setPedagogusok] = useState([]);
  const [szempontok, setszempontok] = useState([]);
  const [tanarPont, setTanarPont] = useState([]);
  const [dokumentumById, setDokumentumById] = useState([]);
  const [dokumentumok, setDokumentumok] = useState([]);
  const [felhasznalok, setFelhasznalok] = useState([]);
  const [szerkesztettFelhasznalo, setSzerkesztettFelhasznalo] = useState(null);
  const [uzenet, setUzenet] = useState("");
  const [betoltes, setBetoltes] = useState(false);

  const csrf = async () => {
    await myAxios.get("/sanctum/csrf-cookie");
  };

  useEffect(() => {
    fetchCelok();
    if (!user) {
      getUser();
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
      alert("Hibás bejelentkezési adatok!");
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
    setLoading(true);
    try {
      const { data } = await myAxios.get("/api/user");
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error("Felhasználó lekérdezési hiba:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCelok = async () => {
    try {
      const response = await myAxios.get("/api/performanceGoals");
      setCelok(response.data);
    } catch (error) {
      console.error("Hiba a célok lekérdezésekor:", error);
    }
  };

  const fetchSzempontok = async () => {
    try {
      const response = await myAxios.get("/api/aspectItem");
      setszempontok(response.data);
    } catch (error) {
      console.error("Hiba a szempontok lekérdezésekor:", error);
    }
  };

  const fetchPedagogusok = async () => {
    try {
      const response = await myAxios.get("/api/teachers");
      setPedagogusok(response.data);
    } catch (error) {
      console.error("Hiba a pedagógusok lekérdezésekor:", error);
    }
  };

  const fetchCelokById = async (userId) => {
    try {
      const response = await myAxios.get(`/api/getGoalsByUserId/${userId}`);
      setCelok(response.data);
    } catch (error) {
      console.error("Hiba a célok lekérdezésekor:", error);
    }
  };
  const fetchDokumentumokById = async (userId) => {
    try {
      const response = await myAxios.get(`/api/documentbyid/${userId}`);
      setDokumentumById(response.data);
    } catch (error) {
      console.error("Hiba a célok lekérdezésekor:", error);
    }
  };
  const fetchDokumentumok = async () => {
    try {
      const response = await myAxios.get(`/api/document`);
      setDokumentumok(response.data);
    } catch (error) {
      console.error("Hiba a célok lekérdezésekor:", error);
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

  const patchPontozas = async (id, score, evaluator) => {
    try {
      await myAxios.patch(`/api/score/${id}/${score}/${evaluator}`);
      console.log("Siker!");
      window.location.reload();
    } catch (error) {
      console.error("Feltöltési hiba:", error);
    }
  };

  const fetchPontszam = async () => {
    try {
      const response = await myAxios.get(`/api/scorebyteacher`);
      setTanarPont(response.data);
    } catch (error) {
      console.error("Hiba a célok lekérdezésekor:", error);
    }
  };



  const fetchFelhasznalok = async () => {
    try {
      const response = await myAxios.get("/api/admin/users");
      setFelhasznalok(response.data);
    } catch (error) {
      console.error("Hiba a felhasználók lekérdezésekor:", error);
    }
  };

  const szerkesztes = (felhasznalo) => {
    setSzerkesztettFelhasznalo(felhasznalo);
  };

  const dokumentumTorles = async (dokumentum) => {
    setBetoltes(true);
    try {
      await myAxios.delete(`/api/deletedocument/${dokumentum}`);
      window.location.reload();
    }catch(error){
        console.error("Hiba a dokumentum törlésekor")
    }
    }

  const torles = async (felhasznaloId) => {
    setBetoltes(true);
    try {
      await myAxios.delete(`/api/deleteUser/${felhasznaloId}`);
      setFelhasznalok(
        felhasznalok.filter((felhasznalo) => felhasznalo.id !== felhasznaloId)
      );
      setUzenet("Felhasználó sikeresen törölve.");
    } catch (error) {
      console.error("Hiba a felhasználó törlésekor:", error);
      setUzenet("Hiba történt a felhasználó törlésekor.");
    } finally {
      setBetoltes(false);
    }
  };

  const mentes = async (nev, email, jogosultsag) => {
    if (!nev || !email || !jogosultsag) {
      setUzenet("Kérjük, töltse ki az összes mezőt.");
      return;
    }
    setBetoltes(true);
    try {
      await myAxios.put(`/api/updateUser/${szerkesztettFelhasznalo.id}`, {
        name: nev,
        email: email,
        role: jogosultsag,
      });
      setFelhasznalok(
        felhasznalok.map((felhasznalo) =>
          felhasznalo.id === szerkesztettFelhasznalo.id
            ? { ...felhasznalo, name: nev, email: email, role: jogosultsag }
            : felhasznalo
        )
      );
      setSzerkesztettFelhasznalo(null);
      setUzenet("Felhasználó sikeresen frissítve.");
    } catch (error) {
      console.error("Hiba a felhasználó szerkesztésekor:", error);
      setUzenet("Hiba történt a felhasználó szerkesztésekor.");
    } finally {
      setBetoltes(false);
    }
  };

  const feltoltes = async (tanar) => {
    try {
      await myAxios.post(`/api/performace_goals_fill/${tanar}`, {});
      window.location.reload();
    } catch (error) {
      console.error("Hiba a felhasználó szerkesztésekor!");
    }
  };

  const uploadPdf = async (adat, vegpont) => {
    try {
        await myAxios.post(vegpont, adat) // FormData-t küldjük el
            .then((resp) => {
                console.log("Response:", resp);
            });
    } catch (error) {
        console.log("Upload error:", error);
    }
  }
    const postComment = async (id,text) => {
      try {
        await myAxios.post(`/api/comment/${id}/${text}`);
        console.log("Siker!");
      } catch (error) {
        console.error("Feltöltési hiba:", error);
      }
    };

  return (
    <AuthContext.Provider
      value={{
        postComment,
        fetchDokumentumok,
        dokumentumok,
        dokumentumTorles,
        fetchDokumentumokById,
        dokumentumById,
        fetchPontszam,
        tanarPont,
        regisztracio,
        logout,
        user,
        getUser,
        login,
        fetchCelok,
        celok,
        fetchPedagogusok,
        pedagogusok,
        fetchSzempontok,
        szempontok,
        postCel,
        fetchCelokById,
        postDokumentum,
        feltoltes,
        loading,
        fetchFelhasznalok,
        felhasznalok,
        szerkesztes,
        torles,
        mentes,
        szerkesztettFelhasznalo,
        setSzerkesztettFelhasznalo,
        uzenet,
        betoltes,
        patchPontozas,
        uploadPdf
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
