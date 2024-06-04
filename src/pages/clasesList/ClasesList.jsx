import React from 'react'
import { useState,useEffect } from 'react';

import { ClaseListItem } from './ClaseListItem';
import { clasesFromDb } from '../../constant/Clases';
export const ClasesList =  ({clases,incrementarCantidad,decrementarCantidad}) => {


  const [clasesm, setClases] = useState(clases);
  const [deletedItemId, setDeletedItemId] = useState(null);  
 
console.log(clasesm)
  
  const nClase = {
    tema:'mongoDb',
    numero:12,
    fecha:'2024-03-30',
    observaciones:'clase teórica',
    asistencia:'p',
    id:'2541'
  };  

  const updateClase = (id) => {   
   
   const clasesArray = [clasesm];

   let index = clasesArray.findIndex(clase => clase._id === id);
  const nArray1 = [clasesArray];
   
   if (index !==-1) {
    // Insertar el nuevo elemento en esa posición
   
    nArray1.splice(index, 1, nClase); 
    console.log(nArray1)
     setClases(...nArray1);
    
}
    
  };  
  // Realiza la solicitud fetch cuando el componente se monta
  
  const delClase = (id) => {
    const clasesArray = [clasesm];
    const nArray = clasesArray.filter(item=>item._id!==id)    
    
    setClases(nArray)
    setDeletedItemId(id);    
  }  
    return (
    <> 
    
    <ul className='custom-ul'>
       
    <li><ClaseListItem clases={clases} clasesm={clasesm} del={delClase} update={updateClase} nClase={nClase} deletedItemId={deletedItemId} incrementarCantidad={incrementarCantidad} decrementarCantidad={decrementarCantidad}/></li>
    
    </ul>

       
    

  </>
  
  );
}