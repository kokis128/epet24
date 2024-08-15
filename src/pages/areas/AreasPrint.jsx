import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button, Modal } from 'antd';

import { format, parse, isValid ,parseISO} from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { es, tr } from 'date-fns/locale';
import { addDays } from 'date-fns';
const timeZone = 'America/Argentina/Buenos_Aires';
export const AreasPrint = ({setOpen,open,areas, estudiantes, formData}) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

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
    
  return (
    <>
      
      <Modal
        title="Imprimir Informes"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}        
      >
          <div ref={componentRef} className='pl-4'>
        <div >

        <thead>

        

        <tr className="border-collapse border border-gray-400">
          <td className='text-sm font-mono border-collapse border border-gray-400'>EPET 24</td>
          <td className='font-mono text-[11px]'>fecha: {formatDate(new Date().toISOString())}</td>
        </tr>
        <tr>
          <td className='text-sm font-mono'></td>
          <td className='font-mono text-[11px]'></td>
        </tr>

        </thead>

       
        
        
        
        
        </div>
        <tbody>
        <tr className="space-y-2">
          
            <>
            <tr>
            <tr>
                <td className='text-[11px] font-mono border-collapse border border-gray-400'>
                <span>Areas</span>
               
                </td>
                
                <td className='text-[11px] text-sm font-mono border-collapse border border-gray-400'>
                <span>Asignaturas</span>
                </td>
                </tr>
                
 {areas.map(area => (<tr className='w-50'><td className='text-[11px] font-mono border-collapse border border-gray-400 break-words max-w-[100px]'>{(area.area)}</td><td className='text-[11px] font-mono border-collapse border border-gray-400 break-words max-w-[90px]'>{(area.materias)}</td> </tr>))}
 
           
           
            </tr>
            
           
           
           
            
            
           
           
            </>
        </tr>
        </tbody>
        
        <div className="text-blue-300 text-[10px] flex mb-3 gap-1 justify-between">
          
          
       
        </div>
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="text-[10px] border border-gray-400">Fecha</th>
              
            </tr>
            <tr>
              <th className="border border-gray-400 text-[10px]">Actividad</th>
             
             
               
                  <th >
                    
                  </th>
             
            </tr>
          </thead>
          <tbody>
           
          </tbody>
        </table>
      </div>
      <button onClick={handlePrint} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Imprimir
      </button>


      
      </Modal>
    </>
  );
};









