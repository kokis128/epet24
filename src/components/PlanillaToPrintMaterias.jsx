import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import { addDays } from 'date-fns';
import './styles/tailwind.css';
import { Button, Modal } from 'antd';

const timeZone = 'America/Argentina/Buenos_Aires';

export const PlanillaToPrintMaterias = ({ materiaS, clases, showModalRegistros, open,setIsModalOpenRegistros,issModalOpenRegistros}) => {
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
    
    useEffect(() => {
      fetch(`http://localhost:3000/api/planillas/${materiaS}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener la lista de estudiantes');
          }
          return response.json();
        })
        .then(data => {
          setData(data);
          console.log('Datos recibidos:', data);      
        })
        .catch(error => {
          console.error('Error al obtener la lista de estudiantes:', error);
        });
    }, [materiaS]);

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    const clasesSeleccionadas = clases.filter(clase => clase.materiaId._id === materiaS);
    console.log(clasesSeleccionadas[0])
    return (
        <>

<Modal
        title="Imprimir Registro de Clases"
        centered
        open={open}
        onOk={() => setIsModalOpenRegistros(false)}
        onCancel={() => setIsModalOpenRegistros(false)}
        width={1000}
        footer={null}     
      
      >
            <div ref={componentRef} className="print-container">
                {/* Header del informe */}
                <div className="gap-2">
                    <div className="font-mono">PROVINCIA DE NEUQUEN-CONSEJO PROVINCIAL DE EDUCACION</div>
                    <span className="text-sm underline">Registros de Clases Dictadas</span>
                </div>
                <div className="flex gap-3 items-center font-bold">
                    <span className='text-[7px] font-mono leading-tight'>Establecimiento <br /> Educativo</span>
                    <div className='text-sm font-mono'>ESCUELA PROVINCIAL DE ENSEÑANZA TÉCNICA 24</div>
                    <div><span className="font-mono text-[9px]">{formatDate(new Date().toISOString())}</span></div>
                </div>
                <div className='font-mono gap-2'>
                    <span className='font-mono text-xs font-bold'>Curso: </span>
                    <span className='font-mono text-sm'>{clasesSeleccionadas[0]?.materiaId.curso} - </span>
                    <span className='font-mono text-xs font-bold'>División: </span>
                    <span className='font-bold text-sm'>{clasesSeleccionadas[0]?.materiaId.division}</span>
                    <span className='font-mono text-xs font-bold'> - Materia: {clasesSeleccionadas[0]?.materiaId.name}</span>
                </div>
                
                {/* Tabla de registros */}
                <table className="mt-4 border-collapse border border-gray-600">
                    <thead>
                        <tr className="border border-gray-600">
                            <th className="text-[11px] font-mono border border-gray-400 break-words max-w-[100px]">Fecha</th>
                            <th className="text-[11px] font-mono border border-gray-400 px-2">N° Clase</th>
                            <th className="text-[11px] font-mono border border-gray-400 px-1">Unidad Didactica N°</th>
                            <th className="text-[11px] font-mono border border-gray-400 break-words w-[200px] p-0">Tema</th>
                            <th className="text-[11px] font-mono border border-gray-400 text-center w-[200px]">Contenidos</th>
                            <th className="text-[11px] font-mono border border-gray-400 max-w-[200px] text-center w-[150px]">Actividades Del Día</th>
                            <th className="text-[11px] font-mono border border-gray-400 max-w-[200px] text-center w-[150px]">Observaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clasesSeleccionadas.map((clase, index) => (
                            <tr key={clase._id} className="w-50">
                                <td className="text-xs font-mono border border-gray-400 break-words max-w-[100px] text-center">{formatDate(clase.fecha)}</td>
                                <td className="text-xs font-mono border border-gray-400 break-words max-w-[100px] text-center">{clase.numero}</td>
                                <td className="text-xs font-mono border border-gray-400 break-words max-w-[100px] text-center">{clase.numero}</td>
                                <td className="text-xs font-mono border border-gray-400 break-words max-w-[550px] text-center">{clase.tema}</td>
                                <td className="text-xs font-mono border border-gray-400 break-words max-w-[50px] text-center">{clase.contenidos}</td>
                                <td className="text-[9px] font-mono border border-gray-400 text-center align-bottom pb-4">{clase.actividades}</td>
                                <td className="text-[9px] font-mono border border-gray-400 text-center align-bottom pb-4">{clase.observaciones}</td>
                            </tr>
                        ))}
                    </tbody>
                   
                </table>
                <div className="page-break" style={{ margin: 0, padding: 0 }}></div>
            
                <Button onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded mx-2">
      Imprimir
    </Button>
    <Button key="cancel" onClick={() => setIsModalOpenRegistros(false)} className="bg-black text-white px-4 py-2 rounded mx-2 ">
      Cancelar
    </Button>
    
    
   
   
  </div>
  </Modal>
            
        </>
    );
}

