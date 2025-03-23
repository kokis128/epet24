import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { PlanillaEstudiante } from '../components/PlanillaEstudiante';
import { PlanillaAnotacion } from '../components/PlanillaAnotacion';
import { format, parse, isValid, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import { addDays } from 'date-fns';
import './styles/tailwind.css';

const timeZone = 'America/Argentina/Buenos_Aires';

export const PlanillaToPrint = ({ materiaS, clases }) => {
  const [data, setData] = useState(null);
  const [ausentes, setAusentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const componentRef = useRef();
  const API_URL = process.env.REACT_APP_API_URL;

  // Normalizar fechas para comparación
  const normalizeDate = (date) => {
    return format(new Date(date), 'yyyy-MM-dd');
  };

  // Formatear fecha para mostrar
  const formatDate = (fecha) => {
    if (!fecha) return null;
    try {
      return formatInTimeZone(fecha, timeZone, 'dd/MM/yyyy', { locale: es });
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return null;
    }
  };

  // Formatear fecha para la tabla
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

    return format(addDays(date, 1), 'dd/MM', { locale: es });
  };

  // Fetch de datos
  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/planillas/${materiaS}`),
      fetch(`http://localhost:3000/api/ausentes`)
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        setData(data1);
        setAusentes(data2.ausentes);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [materiaS]);

  // Función para imprimir
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="animate-spin rounded-full border-t-2 border-b-2 border-gray-900 h-12 w-12"></div>
      </div>
    );
  }

  if (!data) {
    return <div>No se encontraron datos.</div>;
  }

  // Filtrar las clases para las anotaciones
  const clasesFiltradasAnotaciones = clases
    .filter((clase) => clase.materiaId?._id === materiaS)
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  return (
    <div className="mx-auto sm:px-6 lg:px-8">
      <div
        ref={componentRef}
        className="bg-white shadow-md rounded-lg overflow-hidden my-8"
      >
        <div className="p-6">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-800">EPET 24</span>
            <span className="text-sm text-gray-600">
              Fecha: {formatDate(new Date().toISOString())}
            </span>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Planilla de Seguimiento
            </h2>
            <div className="">
              <span className="text-sm text-gray-600">
                Materia: {data.materia.name}
              </span>
              <span className="text-sm text-gray-600 ml-4">
                Curso: {data.materia.curso}
              </span>
              <span className="text-sm text-gray-600 ml-4">
                División: {data.materia.division}
              </span>
              <span className="text-sm text-gray-600 ml-4">
                Turno: {data.materia.turno}
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="text-left text-[8px] font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Fecha
                  </th>
                  {clasesFiltradasAnotaciones.map((clase, index) => (
                    <th
                      key={`${clase._id}-${index}`}
                      scope="col"
                      className="text-center text-[8px] border border-gray-200 font-medium text-gray-500 tracking-wider"
                    >
                      {formatearFecha(formatDate(clase.fecha))}
                    </th>
                  ))}
                  <th scope="col" className="text-center text-[6px] border border-gray-200 font-medium text-gray-500">
                    Cant.<br /> Aus
                  </th>
                </tr>
                <tr>
                  <th
                    scope="col"
                    className="text-left text-xs text-gray-500"
                  >
                    Actividad
                  </th>
                  {clasesFiltradasAnotaciones.map((clase, index) => (
                    <th
                      key={`actividad-${clase._id}-${index}`}
                      scope="col"
                      className="text-center text-[8px] font-thin text-gray-500 border border-gray-300"
                    >
                      {clase.registro}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.materia.estudiantes.map((estudiante, estudianteIndex) => {
                  let cont = 0; // Contador de ausencias por estudiante

                  return (
                    <tr
                      key={estudiante._id}
                      className={
                        estudianteIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }
                    >
                      <td className="py-1 text-xs font-medium border border-gray-300 text-gray-900">
                        <PlanillaEstudiante estudiante={estudiante} />
                      </td>
                      {clasesFiltradasAnotaciones.map((clase) => {
                        const anotacion = data.anotaciones.find(
                          (anotacion) =>
                            anotacion?.student_id === estudiante?._id &&
                            normalizeDate(anotacion?.fecha) === normalizeDate(clase?.fecha) &&
                            clase?._id === anotacion?.clase_id
                        );

                        const ausencia = ausentes.find(
                          (falta) =>
                            falta?.student_id === estudiante?._id &&
                            falta?.materia_id === materiaS &&
                            normalizeDate(falta?.fecha) === normalizeDate(clase?.fecha)
                        );

                        if (ausencia) cont++;

                        return (
                          <td
                            key={`${estudiante._id}-${clase._id}`}
                            className="text-[8px] border border-gray-300"
                          >
                            <PlanillaAnotacion
                              anotacion={anotacion ? anotacion : ''}
                              ausencia={ausencia ? ausencia : ''}
                            />
                          </td>
                        );
                      })}
                      <td className="text-center text-[8px] border border-gray-300">
                        {cont}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Imprimir
        </button>
      </div>
    </div>
  );
};