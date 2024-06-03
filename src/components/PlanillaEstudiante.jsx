import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export const PlanillaEstudiante = ({estudiante}) => {
    
console.log(estudiante.nombre)
 
    
    

      const formatDate = (fecha) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-AR', options);
      };

  

   




  return (
    <td key={estudiante._id} className="text-[10px]">
      {estudiante.nombre} {estudiante.apellido}
      
    </td>
  );
};
  

