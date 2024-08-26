import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { PlanillaEstudiante } from '../components/PlanillaEstudiante';
import { PlanillaAnotacion } from '../components/PlanillaAnotacion';
import { format, parse, isValid ,parseISO} from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import { addDays } from 'date-fns';
import './styles/tailwind.css'
const timeZone = 'America/Argentina/Buenos_Aires';

export const PlanillaToPrint = ({ materiaS, clases }) => {
  const [data, setData] = useState(null);
  const componentRef = useRef();
  
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

  const formatearFecha = (fecha) => {
    // Intentar parsear la fecha en diferentes formatos conocidos
    const formatosPosibles = ['dd/MM/yyyy', 'yyyy-MM-dd'];
    let date;
  
    for (const formato of formatosPosibles) {
      date = parse(fecha, formato, new Date());
      if (isValid(date)) {
        break;
      }
    }
  
    // Verificar si la fecha es válida
    if (!isValid(date)) {
      return 'Invalid Date';
    }
  
    // Formatear la fecha en el formato "dd/MM/yy"
    return format(date, 'dd/MM/yy', { locale: es });
  };
  
  

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!data) return <div>Cargando...</div>;

  const fechasUnicas = [...new Set(data.anotaciones
    .filter(anotacion => data.materia._id === anotacion.materia_id)
    .map(anotacion => formatDate(anotacion.fecha))
    .filter(fecha => fecha) // Filtrar fechas vacías
  )].sort((a, b) => new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-')));




  const clasesPorFechaArray = clases
  .filter(clase => clase.materiaId._id === materiaS,) // Filtra clases por materia
  .map(clase => ({
    fecha: formatDate(clase.fecha),
    registros: [clase.registro],
    
   
  }));
 
  


  return (
    <>
      <div ref={componentRef} className='print-container pl-4'>
      <span className='text-sm font-mono'>EPET 24</span>
        <div className="flex justify-start pt-[-10px] gap-4">
          
          <span className='flex-none font-mono  text-sm'>Planilla de Seguimiento -</span>
          <span className='font-mono text-sm '>fecha: {formatDate(new Date().toISOString())}</span>
        </div>
        <div className=" text-xs flex mb-3 gap-1 ">
         
          <h2 className='font-mono'>Materia: {data.materia.name} - </h2>
          <h3 className='font-mono'>Curso: {data.materia.curso} División: {data.materia.curso}</h3>
        </div>
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="text-[10px] border border-gray-400">Fecha</th>
              {fechasUnicas.map((fecha, index) => (
                <th key={`${fecha}-${index}`} className="border border-gray-400 text-bold text-[8px]">{formatearFecha(fecha)}</th>
              ))}
            </tr>
            <tr>
              <th className="border border-gray-400 text-[10px]">Actividad</th>
             
              {fechasUnicas.map((fecha, index) => {
                const clasePorFecha = clasesPorFechaArray.find(clase =>  clase.fecha === fecha);
                return (
                  <th key={`actividad-${index}`} className="border border-gray-400 text-bold text-[8px]">
                    {clasePorFecha ? clasePorFecha.registros.join(', ') : ''}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.materia.estudiantes.map((estudiante) => (
              <tr key={estudiante._id}>
                <td className="border border-gray-400">
                  <PlanillaEstudiante estudiante={estudiante} />
                </td>
                {fechasUnicas.map(fecha => {
                  const anotacion = data.anotaciones.find(
                    anotacion => anotacion.student_id === estudiante._id && formatDate(anotacion.fecha) === fecha && data.materia._id === anotacion.materia_id
                  );
                  return (
                    <td key={fecha} className="border border-gray-400">
                      {anotacion ? <PlanillaAnotacion anotacion={anotacion} /> : ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='page-break'></div>
      </div>
      <button onClick={handlePrint} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Imprimir
      </button>
    </>
  );
};
