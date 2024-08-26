import React from 'react'
import { useState,useEffect } from 'react';

import { ClaseListItem } from './ClaseListItem';
import { ClasesAdd } from './ClasesAdd';


export const ClasesList =  ({clases,incrementarCantidad,decrementarCantidad}) => {
  const timeZone = 'America/Argentina/Buenos_Aires';
  const [clasesm, setClases] = useState(clases);
  const [deletedItemId, setDeletedItemId] = useState(null);  
  const [selectedClase, setSelectedClase] = useState(null);
  
  
  
  const nClase = {
    tema:'mongoDb',
    numero:12,
    fecha:'2024-03-30',
    observaciones:'clase teórica',
    asistencia:'p',
    id:'2541'
  };  

 

  const updateClase = (id) => {   
    console.log('id',id)
    console.log('clasesm',clasesm)
    const clasesmArray = Array.isArray(clasesm) ? clasesm : [clasesm];
    const claseToEdit = clasesmArray.find(clase => clase._id === id);
    setSelectedClase(claseToEdit); 
  
  };  
 
  const saveUpdatedClase = (updatedClase) => {
    const clasesmArray = Array.isArray(clasesm) ? clasesm : [clasesm];
    const updatedClases = clasesmArray.map(clase =>
      clase._id === updatedClase._id ? updatedClase : clase
    );
    setClases(updatedClases);
    setSelectedClase(null); // Limpiar el estado después de guardar
  };
  
  const delClase = (id) => {
    const clasesArray = [clasesm];
    const nArray = clasesArray.filter(item=>item._id!==id)    
    
    setClases(nArray)
    setDeletedItemId(id);    
  }  
    return (
    <> 
    
    <ul className='custom-ul'>
        <li>
          <ClaseListItem
            clases={clases}
            clasesm={clasesm}
            del={delClase}
            update={updateClase}
            nClase={nClase}
            deletedItemId={deletedItemId}
            incrementarCantidad={incrementarCantidad}
            decrementarCantidad={decrementarCantidad}
          />
        </li>
      </ul>
      {selectedClase && (
        console.log(selectedClase.numero),
        <ClasesAdd
        fecha={selectedClase.fecha}
          materiaS={selectedClase.materiaId}
        
          cantidadClases={selectedClase.numero}
          anotaciones={selectedClase.anotaciones}
          clases={clases}
          setClases={setClases}
          handleAgregarClase={saveUpdatedClase} // Reutilizar la misma función de guardado para actualización
        />
      )}
       
    

  </>
  
  );
}