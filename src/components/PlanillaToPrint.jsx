import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { PlanillaEstudiante } from '../components/PlanillaEstudiante';
import { PlanillaAnotacion } from '../components/PlanillaAnotacion';
import { format, parse, isValid, parseISO } from 'date-fns';
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
       
      return formatInTimeZone(fecha, timeZone, 'dd/MM/yyyy', { locale: es });
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return null;
    }
  }; 

  const formatearFecha = (fecha) => {
    const formatosPosibles = ['dd/MM/yyyy', 'yyyy-MM-dd'];
    let date;
  
    for (const formato of formatosPosibles) {
      date = parse(fecha, formato, new Date());
      if (isValid(date)) {
        break;
      }
    }
  
    if (!isValid(date)) {
      return 'Invalid Date';
    }
  
    return format(addDays(date,1), 'dd/MM', { locale: es });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!data) return <div className="flex  h-screen">
    <div className="animate-spin rounded-full  border-t-2 border-b-2 border-gray-900"></div>
  </div>;

  const clasesFiltradas = clases
    .filter(clase => clase.materiaId?._id === materiaS)
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  return (
    <div className="mx-auto sm:px-6 lg:px-8">
  <div ref={componentRef} className="bg-white shadow-md rounded-lg overflow-hidden my-8">
    <div className="p-6">
      <div className="flex justify-between">
        <span className="text-lg font-semibold text-gray-800">EPET 24</span>
        <span className="text-sm text-gray-600">Fecha: {formatDate(new Date().toISOString())}</span>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Planilla de Seguimiento</h2>
        <div className="">
          <span className="text-sm text-gray-600 border">Materia: {data.materia.name}</span>
          <span className="text-sm text-gray-600 ml-4">Curso: {data.materia.curso}</span>
          <span className="text-sm text-gray-600 ml-4">División: {data.materia.curso}</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className=" text-left text-[8px] font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              {clasesFiltradas.map((clase, index) => (
                <th key={`${clase._id}-${index}`} scope="col" className=" text-center text-[8px] border border-gray-200 font-medium text-gray-500  tracking-wider">
                  {formatearFecha(formatDate(clase.fecha))}
                </th>
              ))}
            </tr>
            <tr>
              <th scope="col" className=" text-left text-xs  text-gray-500 ">
                Actividad
              </th>
              {clasesFiltradas.map((clase, index) => (
                <th key={`actividad-${clase._id}-${index}`} scope="col" className=" text-center text-[8px] font-thin text-gray-500  border border-gray-300">
                  {clase.registro}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.materia.estudiantes.map((estudiante, estudianteIndex) => (
              <tr key={estudiante._id} className={estudianteIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-1 py-1 text-xs font-medium border border-gray-300 text-gray-900">
                  <PlanillaEstudiante estudiante={estudiante} />
                </td>
                {clasesFiltradas.map(clase => {
                  const anotacion = data.anotaciones.find(
                    anotacion =>
                      anotacion.student_id === estudiante._id &&
                      formatDate(anotacion.fecha) === formatDate(clase.fecha) &&
                      data.materia._id === anotacion.materia_id
                  );
                  return (
                    <td key={`${estudiante._id}-${clase._id}`} className=" text-[8px]  border border-gray-300">
                      {anotacion ? <PlanillaAnotacion anotacion={anotacion} /> : ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div className="flex justify-center mt-8 print:hidden">
    <button
      onClick={handlePrint}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Imprimir
    </button>
  </div>
</div>
  
  );
};

