import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
const Login = () =>{
    const [email, setEmail] = useState('rigo@test.com')
    const [password, setPassword] = useState('123123')
    
    //const {user, setUser}=useContext(UserContext)
    const { loginUser }=useContext(UserContext)
    const navegate = useNavigate();
    /*const handleClickLogin=()=>{
        setUser(true)
        navegate("/")
    }*/

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log("procesando form:" , email, password);
        try{
            await loginUser(email,password);
            console.log("usuario logeado");
            navegate("/")
        }catch(error){
            console.log(error.code);
            //alert("Esta email ya esta registrado")
        }
    }

    return(
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Ingrese email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Ingrese password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </>

        /*<>
            <h1>Login</h1>
            <h2>{  user ? 'Online' : 'Offline' }</h2>
            <button onClick={handleClickLogin}>Acceder</button>
        </>*/
    )
}

export default Login