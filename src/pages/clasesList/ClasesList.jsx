import React from 'react'
import { useState,useEffect } from 'react';
import { ClasesAdd } from './ClasesAdd';
import { ClaseListItem } from './ClaseListItem';
import { addDays,format, parseISO } from 'date-fns';
export const ClasesList =  ({materiaSeleccionada,clases,incrementarCantidad,decrementarCantidad,setReload3}) => {
  const [clasesm, setClases] = useState(clases);
  const [selectedClase, setSelectedClase] = useState(null); 
  const [deletedItemId, setDeletedItemId] = useState(null);  
  const URL = 'http://localhost:3000/api';
  const [mostrar,setMostrar]=useState(false);
  const nClase = {
    tema:'mongoDb',
    numero:12,
    fecha:'2024-03-30',
    observaciones:'clase teórica',
    asistencia:'p',
    id:'2541'
  };  
  
  const updateClase = (id) => { 
      
   setMostrar(!mostrar) 
    const clasesmArray = Array.isArray(clasesm) ? clasesm : [clasesm];
    const clasesToEdit = clasesmArray.find(clase=>(clase._id===id));
    console.log('clasesToEdit',clasesToEdit)   
    setSelectedClase(clasesToEdit)
    console.log('SelectedClase',clasesToEdit)
  }; 
  
  
  const saveUpdatedClase = (updatedClase) => {
    const clasesmArray = Array.isArray(clasesm) ? clasesm : [clasesm];
    const updatedClases = clasesmArray.map(clase =>
      clase._id === updatedClase._id ? updatedClase : clase
    );
    
    setClases(updatedClases);
    setSelectedClase(null);
     // Limpiar el estado después de guardar
  };
  // Realiza la solicitud fetch cuando el componente se monta
  
  const delClase = async (id) => {
    
    
    try {
      const response = await fetch(`${URL}/clase/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Clase borrada exitosamente');

        const clasesArray = [clasesm];
    const nArray = clasesArray.filter(item=>item._id!==id)    
    
    setClases(nArray)
    setDeletedItemId(id);  
    setReload3(true);
       

       
        
        
        
      } else {
        alert('Hubo un error al borrar la clase');
      }
    } catch (error) {
      console.error('Error al borrar la materia:', error);
      alert('Ocurrió un error al intentar borrar la materia');
    } 
  }











  
    return (
    <> 
    
    <ul className='custom-ul'>
       
    <li><ClaseListItem clases={clases} clasesm={clasesm} del={delClase} update={updateClase} nClase={nClase} deletedItemId={deletedItemId} incrementarCantidad={incrementarCantidad} decrementarCantidad={decrementarCantidad} mostrar={mostrar} selectedClase={selectedClase} setClases={setClases} saveUpdatedClase={saveUpdatedClase} materiaSeleccionada={materiaSeleccionada} /></li>
    

    
    </ul>

       
    

  </>
  
  );
}