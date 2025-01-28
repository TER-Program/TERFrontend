import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import useAuthContext from "../contexts/AuthContext";
import Admin from "../pages/Admin";


export default function AdminLayout() {
    const { user } = useAuthContext();
    return user && user.role===1  ? <>  <Admin /> <Outlet /> </> : <Navigate to="/bejelentkezes" />;
}