import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";



export default function TanarLayout() {
    const { user } = useAuthContext();
    return user && user.role === 2 ?  <>  <NavigacioTanar /> <Outlet /> </> : <Navigate to="/bejelentkezes" />;


}