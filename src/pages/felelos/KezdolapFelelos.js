
import useAuthContext from "../../contexts/AuthContext";

export default function KezdolapFelelos() {
     const { user } = useAuthContext(); 

    return (
        <div>
            <h1>Kezdőlap Felelős</h1>
            <p>Bejelentkezett felhasználó: { user==null?"Nincs bejelentkezett felhasználó!":user.name }</p>
        </div>
    );
}