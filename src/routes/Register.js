import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { Card, Form, Button } from 'react-bootstrap';

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navegate = useNavigate()

    const {registerUser} = useContext(UserContext);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log("procesando form:" , email, password);
        try{
            await registerUser(email,password);
            console.log("usuario creado");
            navegate("/user");
        }catch(error){
            console.log(error.code);
            //alert("Esta email ya esta registrado")
        }
    }

    return (
        <div style={{ justifyContent:'center', display:'flex', marginTop:'150px'}}>
        <Card border="dark" style={{width: '100%', height: 'auto', maxWidth:'400px', }}>
            <Card.Header style={{ backgroundColor: '#012345'}}>
                <h3 className="text-center mb-2" style={{color:'white'}}>Registarse</h3>
            </Card.Header>
            <Card.Body style={{ backgroundColor: '#5668d1'}}>
                <Form  onSubmit={handleSubmit} >
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={e=>setEmail(e.target.value)}/>
                </Form.Group>
                <br/>
                <Form.Group id="password">
                    <Form.Label>Contraseñas</Form.Label>
                    <Form.Control type="password" required onChange={e=>setPassword(e.target.value)}/>
                </Form.Group>
                <br/>
                <Button className="w-100" type="submit" variant='dark'>
                    Registarse
                </Button>
                </Form>
                <div className="w-100 text-center mt-3"></div>
            </Card.Body>
        </Card>
        </div>
        /**<>
            <h1>Register</h1>
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
                <button type="submit">Register</button>
            </form>
        </>*/
    )
}

export default Register