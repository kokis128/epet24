import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

export const DesmatricularEstudiante = ({ materiaS, setReload2 }) => {
  const [estudiante, setEstudiante] = useState({ dni: '', nombre: '', apellido: '' });
  const [estudiantesMatriculados, setEstudiantesMatriculados] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEstudiante((prev) => ({ ...prev, [name]: value }));
  };

  // Buscar estudiante por DNI o nombre/apellido
  const buscarEstudiante = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/estudiantes/buscar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(estudiante),
      });
      if (!response.ok) throw new Error('Estudiante no encontrado');
      const data = await response.json();
      setEstudiante(data);
      setStatus({ type: 'success', message: 'Estudiante encontrado' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Desmatricular un estudiante
  const desmatricularEstudiante = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/materia/${materiaS}/desmatricular`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estudiantes: [estudiante._id] }),
      });
      if (!response.ok) throw new Error('Error al desmatricular estudiante');
      setReload2(true);
      setStatus({ type: 'success', message: 'Estudiante desmatriculado con éxito' });
     
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
    
    setIsLoading(false);
    }
    
  };
  setReload2(false);

  // Desmatricular todos los estudiantes de la materia
  const desmatricularTodos = async () => {
    setIsLoading(true);
    try {
      const estudiantesIds = estudiantesMatriculados.map((e) => e._id); // Obtener los IDs de todos los estudiantes matriculados
      const response = await fetch(`${API_URL}/materia/${materiaS}/desmatricular`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estudiantes: estudiantesIds }),
      });
      if (!response.ok) throw new Error('Error al desmatricular a todos los estudiantes');
      setReload2(true);
      setStatus({ type: 'success', message: 'Todos los estudiantes desmatriculados con éxito' });
      
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
    
    setIsLoading(false);
    }
    
  };
  setReload2(false);

  // Buscar todos los estudiantes matriculados
  const buscarTodosEstudiantes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/materia/${materiaS}`);
      if (!response.ok) throw new Error('Error al obtener los estudiantes matriculados');
      const data = await response.json();
      setEstudiantesMatriculados(data);
      setStatus({ type: 'success', message: 'Estudiantes encontrados' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-4">Desmatricular Estudiantes</h1>

      {/* Formulario para buscar estudiante individual */}
      <input
        type="text"
        name="dni"
        value={estudiante.dni}
        onChange={handleInputChange}
        placeholder="DNI"
        className="w-full p-2 mb-2 border rounded-md"
      />
      <input
        type="text"
        name="nombre"
        value={estudiante.nombre}
        onChange={handleInputChange}
        placeholder="Nombre"
        className="w-full p-2 mb-2 border rounded-md"
      />
      <input
        type="text"
        name="apellido"
        value={estudiante.apellido}
        onChange={handleInputChange}
        placeholder="Apellido"
        className="w-full p-2 mb-4 border rounded-md"
      />

      <button
        onClick={buscarEstudiante}
        disabled={isLoading}
        className="w-full p-2 mb-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
      >
        {isLoading ? 'Buscando...' : 'Buscar Estudiante'}
      </button>

      {/* Desmatricular estudiante encontrado */}
      {estudiante._id && (
        <button
          onClick={desmatricularEstudiante}
          disabled={isLoading}
          className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-red-300"
        >
          {isLoading ? 'Desmatriculando...' : 'Desmatricular Estudiante'}
        </button>
      )}

      <hr className="my-4" />

      {/* Botón para buscar todos los estudiantes matriculados */}
      <button
        onClick={buscarTodosEstudiantes}
        disabled={isLoading}
        className="w-full p-2 mb-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
      >
        {isLoading ? 'Buscando todos...' : 'Buscar Todos los Estudiantes Matriculados'}
      </button>

      {/* Listar todos los estudiantes matriculados */}
      {estudiantesMatriculados.length > 0 && (
        <>
          <ul className="mb-4 max-h-40 overflow-y-auto">
            {estudiantesMatriculados.map((e) => (
              <li key={e._id} className="mb-1">
                {e.nombre} {e.apellido} (DNI: {e.dni})
              </li>
            ))}
          </ul>

          {/* Botón para desmatricular todos los estudiantes */}
          <button
            onClick={desmatricularTodos}
            disabled={isLoading}
            className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-red-300"
          >
            {isLoading ? 'Desmatriculando a todos...' : 'Desmatricular Todos los Estudiantes'}
          </button>
        </>
      )}

      {status.message && (
        <div
          className={`mt-4 p-2 rounded-md ${
            status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
        >
          <p className="font-bold">{status.type === 'error' ? 'Error' : 'Éxito'}</p>
          <p>{status.message}</p>
        </div>
      )}
    </div>
  );
};


