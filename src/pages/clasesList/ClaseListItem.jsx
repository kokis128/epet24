import React from 'react'
import { useState,useEffect } from 'react';
import { ClasesAdd } from './ClasesAdd';
import './clasesListItem.css';
import {DeleteOutlined,SelectOutlined} from '@ant-design/icons'
import {Button, Modal }from 'antd';
import { format, parse, isValid, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import { addDays } from 'date-fns';
export const ClaseListItem = ({clases,clasesm, del, update,deletedItemId,incrementarCantidad,decrementarCantidad,mostrar,selectedClase,setClases,saveUpdatedClase,materiaSeleccionada})=> {
  const timeZone = 'America/Argentina/Buenos_Aires';
  const [currentMateriaId, setCurrentMateriaId] = useState(materiaSeleccionada);
  
  useEffect(() => {
    const savedMateriaId = localStorage.getItem('selectedMateriaId');
    if (savedMateriaId) {
      setCurrentMateriaId(savedMateriaId);
    }
  }, []);




  const formatDate = (fecha) => {
    if (!fecha) return null;
    try {
      const date = addDays(parseISO(fecha), 1); 
      return formatInTimeZone(date, timeZone, 'dd/MM/yyyy', { locale: es });
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return null;
    }
  };

  
 


 
 
 useEffect(() => {
  if (!deletedItemId) {
    incrementarCantidad();   
   
  }
  return () => {
    if (!deletedItemId) {
      decrementarCantidad();
     
    }
  };
}, [deletedItemId, incrementarCantidad, decrementarCantidad]);

if (deletedItemId) {
  return null;

}

const confirmDelete = (id) => {
  Modal.confirm({
    title: '¿Estás seguro de que quieres eliminar esta clase?',
    content: 'Esta acción no se puede deshacer.',
    okText: 'Sí',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      del(id);
    },
  });
};



  return (
    
    <ul className="max-w-2xl mx-auto my-4 p-4 bg-white rounded-lg shadow-md">
    <li key={clasesm._id} className=" border md:flex-row md:items-center justify-between border-b border-gray-200">
      <div className=" md: flex flex-col md:items-center">
      <div className="font-semibold text-gray-700 h-6">Clase N°: {clasesm.numero}</div>
        <span className="text-gray-500 h-6">Fecha:{clasesm.fecha ? formatDate(clasesm.fecha) : null}</span>
        <span className="font-semibold text-gray-700 h-6">Tema: {clasesm.tema}</span>
        <span className="font-semibold text-gray-500 h-6">Unidad: {clasesm.unidad}</span>     
        
        <span className="font-semibold text-gray-500 h-6">Contenido: {clasesm.contenidos}</span>
        <span className="font-semibold text-gray-500 h-6">Actividades: {clasesm.actividades}</span>
        <span  className="font-semibold text-gray-700h h-6">Evaluación: {clasesm.registro}</span>

        <span className="text-gray-700 h-6"> Obs: {clasesm.observaciones}</span>
      </div>
      <div className="flex gap-2 mt-2 md:mt-0">
        <Button type="primary" danger onClick={() => confirmDelete(clasesm._id)}>
          <DeleteOutlined />
        </Button>
        <Button type="default" onClick={() => update(clasesm._id) }>
          <SelectOutlined />
        </Button>
      </div>
    </li>
    <div >
  
    { mostrar && <ClasesAdd  
      materiaS={currentMateriaId}
      selectedClase={selectedClase}      
      anotaciones={selectedClase?.anotaciones}
      clases={clases}
      setClases={setClases}
      handleAgregarClase={saveUpdatedClase} 
    />}
  
</div>
  </ul>
  );
};