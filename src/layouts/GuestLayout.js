import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import {useAuthContext}  from "../contexts/AuthContext";
import NavigacioVendeg from "../navigacio/NavigacioVendeg";

export default function VendegLayout() {
    const { user } = useAuthContext(); 
      return !user ? <>    <NavigacioVendeg /> <Outlet /> </>  : <Navigate to="/" />;
}