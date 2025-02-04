import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Navigaciotanar from "../navigacio/NavigacioTanar";




export default function TanarLayout() {
    const { user } = useAuthContext();
    return user && user.role === 2 ?  <>  <Navigaciotanar /> <Outlet /> </> : <Navigate to="/bejelentkezes" />;
}