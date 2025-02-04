import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useAuthContext}  from "../contexts/AuthContext";
import NavigacioFelelos from "../navigacio/NavigacioFelelos";

export default function FelelosLayout() {
    const { user } = useAuthContext();
    return user && user.role === 1 ?  <>  <NavigacioFelelos /> <Outlet /> </> : <Navigate to="/bejelentkezes" />;
}