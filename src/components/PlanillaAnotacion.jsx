import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export const PlanillaAnotacion = ({anotacion}) => {
    

 
    
    

      const formatDate = (fecha) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-AR', options);
      };

  

   




  return (
    <>
   
    <td key={anotacion._id } className="text-[8px]" >
   
      {anotacion.anotacion}
   
    </td>
    </>
  );
};
  

