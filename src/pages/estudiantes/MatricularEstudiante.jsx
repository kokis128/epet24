import React, { useState, useEffect } from 'react';

export const MatricularEstudiante = ({ materiaS }) => {
  const [dni, setDni] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [idEstudiante, setIdEstudiante] = useState('');
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [apellidoEstudiante, setApellidoEstudiante] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
 
  const handleInputChange = (event) => {
    setDni(event.target.value);
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/estudiantes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener la lista de estudiantes');
        }
        return response.json();
      })
      .then(data => {
        setEstudiantes(data);
      })
      .catch(error => {
        setError('Error al obtener la lista de estudiantes');
        console.error('Error al obtener la lista de estudiantes:', error);
      });
  }, []);

  const buscarEstudiante = () => {
    const estudianteEncontrado = estudiantes.find(estudiante => estudiante.dni === dni);
    if (estudianteEncontrado) {
      setIdEstudiante(estudianteEncontrado._id);
      setNombreEstudiante(estudianteEncontrado.nombre);
      setApellidoEstudiante(estudianteEncontrado.apellido);
      setError(null);
      setSuccess(null);
    } else {
      setError('Estudiante no encontrado');
      setIdEstudiante('');
      setSuccess(null);
    }
  };

  const matricular = async () => {   
    const materiaId = materiaS;
    const URL = 'http://localhost:3000/api';
    setDni('');
    fetch(`${URL}/estudiante/${idEstudiante}/matricular`, {
      method: 'PUT',
      body: JSON.stringify({ materiaId }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        return response.json()
        .then(errorData => {
          throw new Error(JSON.stringify(errorData));
        });
      }
      return response.json();
    })
    .then(data => {
      if (data.err) {
        setError(data);
        setSuccess(null);
        console.log(data.err)
      } else {
        setError(null);
        setSuccess('Estudiante matriculado con éxito');
      }
    })
    .catch(error => {
      console.error('Algo falló al matricular al estudiante:', error);
      setError(error.message);
      setSuccess(null);
      console.log(error)
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-4">Búsqueda de Estudiante por DNI</h1>
      <input
        type="text"
        value={dni}
        onChange={handleInputChange}
        placeholder="Ingrese el DNI"
        className="w-full p-2 mb-4 border rounded-md"
      />
      <button
        onClick={buscarEstudiante}
        className="w-full p-2 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Buscar
      </button>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {idEstudiante && (
        <p className="text-green-500 text-center mb-4">
          Estudiante encontrado: {nombreEstudiante} {apellidoEstudiante}
        </p>
      )}
      <button
        onClick={matricular}
        className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Matricular
      </button>
      {success && <p className="text-green-500 text-center mt-4">{success}</p>}
    </div>
  );
};
