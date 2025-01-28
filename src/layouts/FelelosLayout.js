import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Felelos from "../pages/Felelos";
import { useAuthContext } from "../contexts/AuthContext";




export default function FelelosLayout() {
    const { user } = useAuthContext();
    return user && user.role === 3 ?  <>  <Felelos /> <Outlet /> </> : <Navigate to="/bejelentkezes" />;

}