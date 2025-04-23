import useAuthContext from "../../contexts/AuthContext";
import Tanar from "./Tanar";

export default function KezdolapFelelos() {
     const { user } = useAuthContext(); 

    return (
        <div>
            <h1>Kezdőlap Tanár</h1>
            <p>Bejelentkezett felhasználó: { user==null?"Nincs bejelentkezett felhasználó!":user.name }</p>
            <Tanar />
        </div>
    );
}