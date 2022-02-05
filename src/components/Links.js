import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify'; //Importamos el método toast
import LinkForm from "./LinkForm";
//! Importamos la base de datos que exportamos en firebase
import { db } from '../firebase/firebaseConfig'
import { doc, addDoc, updateDoc, deleteDoc, collection, onSnapshot, query } from 'firebase/firestore'; //! Importamos los modulos de firestore

const Links = () => {
  //! FUNCIONES

  const [links, setLinks] = useState([]);
  const [currentID, setCurrentID] = useState('');
  //* FUNCION addOrEditLink() PARA AGREGAR O MODIFICAR DATOS
  //? Esta funcion resive el objeto creado con los datos ingresados
  //? la funcion es asincrona, o sea que mientras se guardan los datos, pueda hacer otras funciones
  //? por eso se usa el 'async'.
  const addOrEditLink = async (linkObject) => {
    try {
      if (currentID === "") {
        //* METODO PARA AGREGAR NUEVOS DATOS
        // await se pone aquí cuando se usa el async
        await addDoc(collection(db,"links"),linkObject); // Con esta linea se crea una coleccion llamada links en nuestra base de datos
        toast.success('Nuevo link agregado', {theme: "dark", autoClose: 2000});
      } else {
        //* METODO PARA ACTUALIZAR UN DATO YA EXISTENTE.
        await updateDoc(doc(db, "links", currentID),linkObject);
        toast.info('Link actualizado', {
          theme: "dark", 
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCurrentID('');
      }
    } catch (error) {
      console.error(error);
    }
  }

  //*FUNCION PARA CONSULTAR LOS DATOS DE NUESTRA BASE.
  const getLinks = async () => {
    //Este codigo tambien obtiene datos, pero el que usaremos, muestra los datos en tiempo real.
    //// Pedimos los datos a la base con esta linea y la guardamos en una variable de nombre querrySnapshot
    //// const querySnapshot = await getDocs(collection(db, "links"));
    //// querySnapshot.forEach((doc) => {
    ////   console.log(doc.id, " => ", doc.data());
    //// });
    try {
      onSnapshot(query(collection(db, "links")), (querySnapshot) => {
        // Creamos nuestro arreglo para guardar los datos.
        const docs = [];
        querySnapshot.forEach((doc) => {
          // Aqui agregamos los datos al array docs.
          docs.push({...doc.data(), id:doc.id});
        });
        // Guardamos docs en links
        setLinks(docs);
        console.log(docs);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //* Función para eliminar un link.
  const deleteLink = async id => {
    try {
      if (window.confirm('¿Estás seguro de eliminar este link?')) {
        await deleteDoc(doc(db, "links", id));
        toast.error('Link borrado', {
          theme: "dark", 
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { // Usamos useEffect() para que cuando cargue la página, se haga una consulta al servidor
    getLinks();
  },[]);

  return (
    <>
      <div className="col-md-4 p-2">
        <LinkForm {...{addOrEditLink, currentID, links}}/>
      </div>
      <div className="col-md-8 p-2">
        {links.map(link => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i onClick={()=>deleteLink(link.id)} className="material-icons text-danger">close</i>
                  <i onClick={()=>setCurrentID(link.id)} className="material-icons">create</i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noreferrer">Go to webside</a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Links;