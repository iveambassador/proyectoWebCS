import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import { Card, Form, Button } from 'react-bootstrap'

const Login = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const { loginUser,user }=useContext(UserContext)
    const navegate = useNavigate();
    
    useEffect(() => {
       if(user){
        navegate("/")
       }
    }, [user]);
    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            await loginUser(email,password);

            navegate("/")
        }catch(error){
            if(error.code === "auth/wrong-password"){
                alert("Contraseña incorrecta")
            }else{
                alert("Esta cuenta no esta registrada")
            }
            //console.log(error.code);
            

        }
    }

    return(
        <div style={{ justifyContent:'center', display:'flex', marginTop:'150px'}}>
        <Card style={{ width: "100%", height: "auto", maxWidth: "400px", borderRadius: '10px'}}>
            <Card.Header style={{ backgroundColor: "#012345" ,borderRadius: '10px 10px 0 0'}}>
                <h3 className="text-center mb-2 py-1" style={{color:'white'}}>Iniciar sesión</h3>
            </Card.Header>
            <Card.Body style={{ backgroundColor: '#5668d1',borderRadius: '0 0 10px 10px'}}>
                <Form  onSubmit={handleSubmit} >
                <Form.Group id="email">
                    <Form.Label><h5>Correo electrónico</h5></Form.Label>
                    <Form.Control placeholder="Ingrese su correo" type="email" required onChange={e=>setEmail(e.target.value)}/>
                </Form.Group>
                <br/>
                <Form.Group id="password" >
                    <Form.Label><h5>Contraseña</h5></Form.Label>
                    <Form.Control placeholder="Ingrese su contraseña" type="password" required minLength={6} onChange={e=>setPassword(e.target.value)}/>
                </Form.Group>
                <br/>
                <Form.Group className="text-center">
                    <Button className="w-50" type="submit" variant='dark'>
                        Entrar
                    </Button>
                </Form.Group>
                </Form>
                
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