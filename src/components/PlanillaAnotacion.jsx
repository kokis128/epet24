import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export const PlanillaAnotacion = ({anotacion, ausencia}) => {
    

  return (
    <>
   
   
   <td key={`${anotacion._id}-${ausencia._id}`} className="relative  text-[5px]   break-words max-w-[30px] ">
   <div className=' top-0 left-0 text-red-500 text-[6px]   py-0.5'>{ausencia._id ? 'A' : ''}</div>
   <div className='text-center text-[6px] font-medium text-gray-500'
     >{anotacion.anotacion }</div>
  {console.log(ausencia?._id)}
</td>


  
    </>
  );
};
  

