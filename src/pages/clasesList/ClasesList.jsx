import React from 'react'
import { useState,useEffect } from 'react';

import { ClaseListItem } from './ClaseListItem';
import { clasesFromDb } from '../../constant/Clases';
export const ClasesList =  ({clases}) => {
console.log(clases);
  const [clasesm, setClases] = useState(clases);
  
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
   
   if (index !==1) {
    // Insertar el nuevo elemento en esa posición
    setClases(...nArray1,nClase);
    nArray1.splice(index, 1, nClase);
    
   
   
     setClases(...nArray1);
} 


    
   
    
  };
 
  

  // Define una función para manejar la respuesta de la solicitud fetch
 

  // Realiza la solicitud fetch cuando el componente se monta
  
  const delClase = (id) => {
    const clasesArray = [clasesm];
    const nArray = clasesArray.filter(item=>item._id!==id)
    
    
    setClases(nArray)
 

  }
    
 
 

 

 
  
    return (
    <>
    
    <ul>
   
    
    <ul className='custom-ul'>

  
    
    
    <li><ClaseListItem clases={clases} clasesm={clasesm} del={delClase} update={updateClase} nClase={nClase}/></li>
    
    
    </ul>

    </ul>
 

    
    
       
    

  </>
  
  );
}
