import { Button } from "bootstrap";
import { useAuthContext } from "../contexts/AuthContext";


export default function Kezdolap() {
     const { user, logout } = useAuthContext(); 
        return (
            <div>
                <h1>Kezdőlap</h1>
                <p>Bejelentkezett felhasználó: { user==null?"Nincs bejelentkezett felhasználó!":user.name }</p>
                <button onClick={logout}>Kijelentkezés</button>
            </div>
        );
     }

