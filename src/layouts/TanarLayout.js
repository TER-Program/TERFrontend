import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Tanar from "../pages/Tanar";



export default function TanarLayout() {
    const { user } = useAuthContext();
    return user && user.role === 2 ?  <>  <Tanar /> <Outlet /> </> : <Navigate to="/bejelentkezes" />;


}