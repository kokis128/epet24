import React from 'react'
import { useState,useEffect } from 'react';
import './clasesListItem.css';
import {DeleteOutlined,SelectOutlined} from '@ant-design/icons'
import { formatInTimeZone } from 'date-fns-tz';

import {Button, Space }from 'antd';
export const ClaseListItem = ({clases,clasesm, del, update,deletedItemId,incrementarCantidad,decrementarCantidad})=> {
  const formatDate = (fecha) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-AR', options);
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

  return (
    
    <ul className="max-w-2xl mx-auto my-4 p-4 bg-white rounded-lg shadow-md">
    <li key={clasesm?._id} className=" border md:flex-row md:items-center justify-between border-b border-gray-200">
      <div className=" md: flex flex-col md:items-center">
      <div className="font-semibold text-gray-700 h-6">Clase N°: {clasesm?.numero}</div>
        <span className="text-gray-500 h-6">Fecha:{clasesm?.fecha ? formatDate(clasesm.fecha) : null}</span>
        <span className="font-semibold text-gray-700 h-6">Tema: {clasesm?.tema}</span>
        <span className="font-semibold text-gray-500 h-6">Unidad: {clasesm?.unidad}</span>     
        
        <span className="font-semibold text-gray-500 h-6">Contenido: {clasesm?.contenidos}</span>
        <span className="font-semibold text-gray-500 h-6">Actividades: {clasesm?.actividades}</span>
        <span  className="font-semibold text-gray-700h h-6">Evaluación: {clasesm?.registro}</span>

        <span className="text-gray-700 h-6"> Obs: {clasesm?.observaciones}</span>
      </div>
      <div className="flex gap-2 mt-2 md:mt-0">
        <Button type="primary" danger onClick={() => del(clasesm._id)}>
          <DeleteOutlined />
        </Button>
        <Button type="default" onClick={() => update(clasesm._id)}>
          <SelectOutlined />
        </Button>
      </div>
    </li>
  </ul>
  );
};