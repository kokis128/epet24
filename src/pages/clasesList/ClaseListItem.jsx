import React from 'react'
import { useState,useEffect } from 'react';
import './clasesListItem.css';
import {DeleteOutlined,SelectOutlined} from '@ant-design/icons'
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
    <li key={clasesm._id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <span className="font-semibold text-gray-700">{clasesm.tema}</span>
        <span className="text-gray-500">{clasesm.fecha ? formatDate(clasesm.fecha) : null}</span>
        <span className="text-gray-600">{clasesm.observaciones}</span>
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