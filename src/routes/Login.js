import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import { Card, Form, Button } from 'react-bootstrap'

const Login = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
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
            navegate("/user")
        }catch(error){
            console.log(error.code);
            alert("Esta cuenta no esta registrado")
            //alert("Esta email ya esta registrado")
        }
    }

    return(
        <div style={{ justifyContent:'center', display:'flex', marginTop:'150px'}}>
        <Card border="dark" style={{width: '100%', height: 'auto', maxWidth:'400px', }}>
            <Card.Header style={{ backgroundColor: '#012345'}}>
                <h3 className="text-center mb-2" style={{color:'white'}}>Iniciar Sesión</h3>
            </Card.Header>
            <Card.Body style={{ backgroundColor: '#5668d1'}}>
                <Form  onSubmit={handleSubmit} >
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={e=>setEmail(e.target.value)}/>
                </Form.Group>
                <br/>
                <Form.Group id="password" >
                    <Form.Label>Contraseñas</Form.Label>
                    <Form.Control type="password" required minLength={6} onChange={e=>setPassword(e.target.value)}/>
                </Form.Group>
                <br/>
                <Button className="w-100" type="submit" variant='dark'>
                    Entrar
                </Button>
                </Form>
                <div className="w-100 text-center mt-3"></div>
            </Card.Body>
        </Card>
        </div>
        /*<>
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