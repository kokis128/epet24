import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { PlanillaEstudiante } from '../components/PlanillaEstudiante';
import { PlanillaAnotacion } from '../components/PlanillaAnotacion';

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
  
        const fechasFormateadas = data.anotaciones
          .filter(anotacion => data.materia._id === anotacion.materia_id)
          .map(anotacion => formatDate(anotacion.fecha));
  
        console.log('Fechas formateadas:', fechasFormateadas);
  
        const fechasUnicas = [...new Set(fechasFormateadas)];
  
        console.log('Fechas únicas:', fechasUnicas);
  
        // Update state or other logic
      })
      .catch(error => {
        console.error('Error al obtener la lista de estudiantes:', error);
      });
  }, [materiaS]);
  
  const formatDate = (fecha) => {
    const date = new Date(fecha);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
};
  
  

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!data) return <div>Cargando...</div>;

  const fechasUnicas = [...new Set(data.anotaciones.filter(anotacion => data.materia._id === anotacion.materia_id).map(anotacion => formatDate(anotacion.fecha)))];
console.log(fechasUnicas);
const agruparClasesPorFecha = (clases, formatDate) => {
  const clasesPorFecha = {};
  clases.forEach(clase => {
    const fecha = clase.fecha;
    if (!clasesPorFecha[fecha]) {
      clasesPorFecha[formatDate(fecha)] = { fecha, registros: [] };
    }
    clasesPorFecha[formatDate(fecha)] && clasesPorFecha[formatDate(fecha)].registros.push(clase.registro);
  });
  return Object.values(clasesPorFecha);
};
const clasesPorFechaArray = clases.map(clase => ({
  fecha: formatDate(clase.fecha),
  registros: [clase.registro],
}));

  return (
    <>
      <div ref={componentRef} className='pl-4'>
        <div className="text-blue-300 flex justify-between pt-[-10px]">
          <span className='text-sm font-mono'>EPET 24</span><span className='font-mono text-[11px]'>fecha: {formatDate(new Date())}</span>
        </div>
        <div className="text-blue-300 text-[10px] flex mb-3 gap-1 justify-between">
          <span className='font-mono text-blue-300 text-[10px]'>Planilla de Seguimiento</span>
          <h2 className='font-mono'>Materia: {data.materia.name}</h2>
          <h3 className='font-mono'>Curso: {data.materia.curso} División: {data.materia.curso}</h3>
        </div>
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="text-[10px] border border-gray-400">Fecha</th>
              {fechasUnicas.map((fecha, index) => (
                <th key={`${fecha}-${index}`} className="border border-gray-400 text-bold text-[8px]">{fecha}</th>
              ))}
            </tr>
            <tr>
              <th className="border border-gray-400 text-[10px]">Actividad</th>
             
              {fechasUnicas.map((fecha, index) => {
                const clasePorFecha = clasesPorFechaArray.find(clase => clase.fecha === fecha);
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
      </div>
      <button onClick={handlePrint} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Imprimir
      </button>
    </>
  );
};
