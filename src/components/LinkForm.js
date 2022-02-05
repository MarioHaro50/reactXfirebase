import React, { useState, useEffect } from 'react';
//! Importamos la base de datos que exportamos en firebase
import { db } from '../firebase/firebaseConfig'
import { doc, getDoc } from "firebase/firestore"; //! Importamos los modulos de firestore


const LinkForm = props => {

  //* Creamos un objeto donde iran los valores de nuestros campos
  const initialStateValues = {
    url: "",
    name: "",
    description: "",
  }

  //* Usamos un {useState} para definir los valores
  const [values, setValues] = useState(initialStateValues);  

  //* Con esta funcion guardamos los valores cuando se altere el estado
  const handleInputChange = e => {
    const {name,value} = e.target;
    setValues({...values,[name]:value}); //* Aqui se guardan los valores, los tres puntos (...values), es para que se guarde cuando se altera el estado
  }

  //* Esta funcion es para que envien los datos a la base de datos
  const handleSubmit = e => {
    e.preventDefault();
    props.addOrEditLink(values);
    setValues({...initialStateValues});
  }

  //* Funcion para editar datos.
  const getLink = async id => {
    const docSnap = await getDoc(doc(db, "links", id));
    setValues({...docSnap.data()});
  }

  useEffect(()=> {
    if (props.currentID === '') {
      setValues({...initialStateValues});
    } else {
      console.log(props.currentID);
      getLink(props.currentID);
    }
  },[props.currentID]);

  return (
    <form className='card card-body' onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          onChange={handleInputChange}
          type="text" 
          className="form-control" 
          placeholder='https://linkQueQuieresGuardar.com'
          name="url"
          value={values.url}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
          <input
            onChange={handleInputChange}
            type="text" 
            className="form-control" 
            placeholder='Nombre'
            name="name"
            value={values.name}
          />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleInputChange}
          name="description" 
          rows="3" 
          className="form-control"
          placeholder="Escribe una descripción"
          value={values.description}
        />
      </div>
      <button className="btn btn-primary btn-block">
        {props.currentID === '' ? 'Guardar' : 'Actualizar'}
      </button>
    </form>
  );
}

export default LinkForm;