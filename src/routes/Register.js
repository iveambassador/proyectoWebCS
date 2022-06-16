import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { Card, Form, Button } from "react-bootstrap";
import { app } from "../confs/firebaseConf";
import { firestore } from "../confs/firebaseConf";
import { collection, getDocs, addDoc, setDoc, doc, Timestamp } from "firebase/firestore";
import { getAuth} from 'firebase/auth';
import { HmacSHA256 } from "crypto-js";
const SHA256 = require('crypto-js/sha256');

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [ci, setCi] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");

  const [UsuarioComun, setUsuarioComun] = useState([]);

  const usuarioCollection = collection(firestore, "UsuarioComun");
  const navegate = useNavigate();
  const { registerUser } = useContext(UserContext);

  async function HMACSHA256() {
    let listita = [];
    const allUsers = await getDocs(collection(firestore, "BlockChain"));
      allUsers.forEach((doc) => {
        listita.push(doc.id)
      });

    let hashGenerado = (SHA256(JSON.stringify()).toString()).slice(0,-32);
    
    while(listita.includes(hashGenerado)){
      hashGenerado = (SHA256(hashGenerado).toString()).slice(0,-32);
    }
    return hashGenerado;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      let HashSemillaGenerado = await HMACSHA256();
      navegate("/");
      let fecha = new Date()
      let bady = parseInt(Math.random() * (10000000))
      await setDoc(doc(firestore, "BlockChain", HashSemillaGenerado), {
        HashSemilla : HashSemillaGenerado,
        HashPrevio : '',
        Data : 0,
        Fecha : fecha,
        Body : bady,
        Transaccion : 'Registro',
      });
      console.log(`HashSemilla : ${HashSemillaGenerado}`)
      console.log(`HashPrevio : init`)
      console.log(` Fecha : ${fecha}`)
      console.log(`Body : ${bady}`)
      console.log(`Transaccion : Registro`)

      const user = getAuth(app).currentUser.uid;
      await setDoc(doc(firestore, "UsuarioComun", user), {
        Apellido: apellido,
        CI: ci,
        Celular: celular,
        Correo: email,
        Direccion: direccion,
        HashSemilla:"",
        Nombre: nombre,
        PostularEstado:false,
        PuedePostular : true,
        PostularNombrePartido:"",
        PostularSigla:"",
        VotoBlanco:0,
        VotoEstado:false,
        VotoFecha:"",
        VotoHash:"",
        PostularHash : "",
        RegistroHash : "",
        VotoNulo:0,
        VotoPartidoSigla:"",
        HashSemilla: HashSemillaGenerado,
        HashVoto : '',
        HashPostular : '',
        HashResponse : '',
      });
    } catch (error) {
      console.log(error.code);
      alert("Esta cuenta ya esta registrada")
    }
  };


  return (
    <div style={{ justifyContent: "center", display: "flex", marginTop: "70px" }}>
      <Card style={{ width: "100%", height: "auto", maxWidth: "420px",borderRadius: '10px' }} className='mb-5'>
        <Card.Header style={{ backgroundColor: "#012345" ,borderRadius: '10px 10px 0 0'}}>
          <h3 className="text-center mb-2 py-1" style={{ color: "white" }}>
            Registrarse
          </h3>
        </Card.Header>
        <Card.Body style={{ backgroundColor: '#5668d1',borderRadius: '0 0 10px 10px'}}>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="nombre">
              <Form.Label><h5 className="mb-0 mt-2">Nombre(s)</h5></Form.Label>
              <Form.Control
                placeholder="Ingrese su nombre"
                type="text"
                required
                pattern="^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$"
                title="Solo letras"
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
            <br/>
            <Form.Group id="apellido">
            <Form.Label><h5 className="mb-0 mt-0">Apellido(s)</h5></Form.Label>
              <Form.Control
                placeholder="Ingrese su apellido"
                type="text"
                required
                pattern="^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$"
                title="Solo letras"
                onChange={(e) => setApellido(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="ci">
              <Form.Label><h5 className="mb-0 mt-3">Nro. C.I.</h5></Form.Label>
              <Form.Control
                placeholder="Ingrese su número de CI"
                type="text"
                required
                pattern="[0-9]+$"
                minLength={7}
                title="Solo números como mínimo 7 caracteres"
                onChange={(e) => setCi(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label><h5 className="mb-0 mt-3">Correo electrónico</h5></Form.Label>
              <Form.Control
                placeholder="Ingrese su correo"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="direccion">
              <Form.Label><h5 className="mb-0 mt-3">Dirección</h5></Form.Label>
              <Form.Control
                placeholder="Ingrese su dirección"
                type="text"
                required
                onChange={(e) => setDireccion(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="celular">
              <Form.Label><h5 className="mb-0 mt-3">Número de teléfono</h5></Form.Label>
              <Form.Control
                placeholder="Ingrese su número de teléfono"
                type="text"
                required
                pattern="[0-9]+$"
                minLength={8}
                title="Solo números como mínimo 8 caracteres"
                onChange={(e) => setCelular(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label><h5 className="mb-0 mt-3">Contraseña</h5></Form.Label>
              <Form.Control
                placeholder="Ingrese su contraseña"
                type="password"                
                required
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <br />
            <Form.Group className="text-center">
              <Button className="w-50" type="submit" variant="dark">
                Registrarse
              </Button>
            </Form.Group>
          </Form>
          {/* <div className="w-100 text-center mt-3"></div> */}
        </Card.Body>
      </Card>
    </div>
    
  );
};

export default Register;
