import React from "react";
import { Navigate, Outlet } from "react-router-dom";



export default function FelelosLayout() {
    const { user } = useAuthContext();
    return user && user.role === 3 ?  <>  <NavigacioUser /> <Outlet /> </> : <Navigate to="/bejelentkezes" />;


}