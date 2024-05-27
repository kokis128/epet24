import React from 'react'
import { useState, useEffect } from 'react';
export const ContarAusencias = ({materiaS}) => {

const [ausenciasData, setAusenciasData] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = 'http://localhost:3000/api';
  const fetchAusencias = async (materiaS) => {
    console.log(materiaS)
    setLoading(true);
    try {
      const response = await fetch(`${URL}/count_absences/${materiaS}`);
      if (!response.ok) {
        throw new Error('Error al obtener las ausencias');
      }
      const data = await response.json();
      setAusenciasData(data.data);
      console.log(data)
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
    <div>
      {loading && <p>Cargando ausencias...</p>}
      {!loading && (
        <ul>
          {ausenciasData.map(({ estudiante, ausencias }) => (
            <li key={estudiante._id}>
              {estudiante.nombre} {estudiante.apellido}: {ausencias} ausencias
              {console.log(ausencias)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )};


 

