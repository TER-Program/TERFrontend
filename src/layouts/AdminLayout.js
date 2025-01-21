import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext"

function AdminLayout() {
    const {user} = useAuthContext();
  return user ? <Outlet /> : <Navigate to="bejelentkezes" />
}

export default AdminLayout
