import React, { useState, useEffect } from 'react';

export const ContarAusencias = ({ materiaS }) => {
  const [ausenciasData, setAusenciasData] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = 'http://localhost:3000/api';

  const fetchAusencias = async (materiaS) => {
    console.log(materiaS);
    setLoading(true);
    try {
      const response = await fetch(`${URL}/count_absences/${materiaS}`);
      if (!response.ok) {
        throw new Error('Error al obtener las ausencias');
      }
      const data = await response.json();
      setAusenciasData(data.data);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (materiaS) {
      fetchAusencias(materiaS);
    }
  }, [materiaS]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {loading && <p className="text-center text-blue-500">Cargando ausencias...</p>}
        {!loading && (
          <ul className="space-y-4">
            {ausenciasData.map(({ estudiante, ausencias }) => (
              <li key={estudiante._id} className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
                <span className="font-medium text-gray-700">{estudiante.nombre} {estudiante.apellido}:</span>
                <span className="text-red-500 font-semibold">{ausencias} ausencias</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
