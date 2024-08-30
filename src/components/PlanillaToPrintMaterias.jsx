import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import { addDays } from 'date-fns';
import './styles/tailwind.css';
import { Button, Modal } from 'antd';

const timeZone = 'America/Argentina/Buenos_Aires';

export const PlanillaToPrintMaterias = ({materiaS, clases, open,setIsModalOpenRegistros,isModalOpenRegistros,handleCancelRegistros,handleOkRegistros}) => {
  console.log('msteriaS', materiaS);
  console.log('clases',clases);
    
  const [data, setData] = useState(null);
    const componentRef = useRef();

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
    
    

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    const clasesSeleccionadas = clases.filter(clase =>clase.materiaId?._id === materiaS);
    
    console.log(clasesSeleccionadas.map(clase=>clase.tema))
    return (
        <>
<Modal
    title="Imprimir Registro de Clases"
    centered
    open={isModalOpenRegistros}
    onOk={handleOkRegistros}
    onCancel={handleCancelRegistros}
    width={1000}
    footer={null}
>
    <div ref={componentRef} className="print-container  bg-white rounded-lg shadow-md mx-4 ">
    <div className="text-[7px] font-ligth text-gray-600 ">
                {formatDate(new Date().toISOString())}
            </div>
        <div className="text-center ">
            <div className="font-mono text-gray-700">PROVINCIA DE NEUQUEN-CONSEJO PROVINCIAL DE EDUCACION</div>
            <div className='text-sm font-mono text-gray-800'>ESCUELA PROVINCIAL DE ENSEÑANZA TÉCNICA 24</div>
            <span className="text-sm underline font-semibold text-gray-900">Registro de Clases Dictadas</span>
        </div>
        <div className="flex justify-between items-center mb-1">
            
            
        </div>
        <div className='font-mono text-sm mb-2'>
            <span className='semibold text-xs'>Curso: </span>
            <span>{clasesSeleccionadas[0]?.materiaId.curso} - </span>
            <span className='semibold text-xs'>División: </span>
            <span>{clasesSeleccionadas[0]?.materiaId.division}</span>
            <span className='semibold text-xs'> - Materia: {clasesSeleccionadas[0]?.materiaId.name}</span>
        </div>
        
        {/* Tabla de registros */}
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="text-[10px] font-medium border border-gray-300 px-2 py-1 text-left">Fecha</th>
                    <th className="text-[10px] font-medium border border-gray-300 px-2 py-1 text-left">N° Clase</th>
                    <th className="text-[10px] font-medium border border-gray-300 px-2 py-1 text-left">Unidad Didactica N°</th>
                    <th className="text-[10px] font-medium border border-gray-300 px-2 py-1 text-left">Tema</th>
                    <th className="text-[10px] font-medium border border-gray-300 px-2 py-1 text-left">Contenidos</th>
                    <th className="text-[10px] font-medium border border-gray-300 px-2 py-1 text-left">Actividades Del Día</th>
                    <th className="text-[10px] font-medium border border-gray-300 px-2 py-1 text-left">Observaciones</th>
                </tr>
            </thead>
            <tbody>
                {clasesSeleccionadas.map((clase, index) => (
                    <tr key={clase._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="text-[10px] font-medium border border-gray-200 px-2 py-1">{formatDate(clase.fecha)}</td>
                        <td className="text-[10px] font-medium border border-gray-200 px-2 py-1">{clase.numero}</td>
                        <td className="text-[10px] font-medium border border-gray-200 px-2 py-1">{clase.numero}</td>
                        <td className="text-[10px] font-medium border border-gray-200 px-2 py-1">{clase.tema}</td>
                        <td className="text-[10px] font-medium border border-gray-200 px-2 py-1">{clase.contenidos}</td>
                        <td className="text-[10px] font-medium border border-gray-200 px-2 py-1">{clase.actividades}</td>
                        <td className="text-[10px] font-medium border border-gray-200 px-2 py-1">{clase.observaciones}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="mt-6 flex justify-end space-x-4">
            <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 focus:outline-none">
                Imprimir
            </button>
            <button onClick={handleCancelRegistros} className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700 focus:outline-none">
                Cancelar
            </button>
        </div>
    </div>
</Modal>

            
        </>
    );
}

