import React, { useRef } from "react";
import Pie from "../components/charts/pie";
import Bar from "../components/charts/bar";
import Tabla from "../components/charts/tabla";

import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../confs/firebaseConf";
import { Container, Spinner } from "react-bootstrap";
import ReactToPrint from "react-to-print";

const Home = () => {
  const [isStart, setStart] = useState(true);
  const [users, setUsers] = useState([]);
  const [nombre, setNombreEleccion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const usersCollectionRef = collection(firestore, "PartidosAceptados");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      const q = query(
        collection(firestore, "AdministrarFechas"),
        where("Activo", "==", true)
      );
      const lafecha = await getDocs(q);
      lafecha.forEach((doc) => {
        let id = doc.id;
        let tituloEleccion = doc.data().DescripcionEleccion;
        let nombreEleccion = doc.data().NombreEleccion;
        setNombreEleccion(nombreEleccion);
        setDescripcion(tituloEleccion);
      });
      setStart(false);
    };
    getUsers();
  }, []);

  // obtener datos de firestore
  const resultados = users.map((persona) => {
    const info = {
      id: persona.HashSemilla,
      name: persona.NombreCandidato,
      partido: persona.Sigla,
      votos: persona.Cant,
    };
    return info;
  });

  //obtener partidos de resultados []
  const partidos = resultados.map((p) => {
    return p.partido;
  });

  //obtener votos de resultados []
  const conteo = resultados.map((p) => {
    return p.votos;
  });
  //obtener color de firestore
  const colores = users.map((p) => {
    return p.Color;
  });

  //tabla de resultados
  const list = resultados;

  //graficas de resultsados
  const data = {
    labels: partidos,
    datasets: [
      {
        label: "Votos",
        data: conteo,
        backgroundColor: colores,
        borderWidth: 1,
      },
    ],
  };
  const componentRef = useRef();
  const esta = () => {
    if (users.length === 0) {
      return false;
    } else {
      return true;
    }
  };
  if (isStart) {
    return (
      <div className="Container">
        <Spinner animation="border" roles="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <h4 className="p-1">Cargando...</h4>
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <ReactToPrint
            trigger={() => {
              return (
                <a href="#">
                  <h5 class="text-center mb-4 mt-2" >🖨️Imprimir</h5>
                </a>
              );
            }}
            content={() => componentRef.current}
            documentTitle="TALLER DE SIMULACION DE SISTEMAS"
            pageStyle="print"
          />
        </Container>
        <Container ref={componentRef}>
          {esta() ? (
            <>
              <h2 className="text-center mb-4 mt-2" style={{ fontWeight:'bold'}}>{nombre}</h2>
              <Tabla listas={list} />
              <Pie datos={data} />
              <Bar datos={data} />
            </>
          ) : (
            <>
              <div className="Container">
                <h2>Bienvenido a iVote</h2>
                <h2>
                  Los resultados de la votación aún no se encuentran
                  disponibles.
                </h2>
                <h2>¿Por qué no intentas más tarde?</h2>
              </div>
            </>
          )}
        </Container>
        
      </div>
    );
  }
};

export default Home;
