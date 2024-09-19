import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

export const MatricularEstudiante = ({ materiaS, setReload }) => {
  const [modo, setModo] = useState('individual');
  const [estudiante, setEstudiante] = useState({ dni: '', nombre: '', apellido: '' });
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [estudiantesCurso, setEstudiantesCurso] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    fetchCursos();
    
  }, []);

  useEffect(() => {
    setStatus({ type: '', message: '' });
    setEstudiante({ dni: '', nombre: '', apellido: '' });
    setCursoSeleccionado('');
   
  }, [modo]);

  const fetchCursos = async () => {
    try {
      const response = await fetch(`${API_URL}/cursos`);
      if (!response.ok) throw new Error('Error al obtener los cursos');
      const data = await response.json();
      setCursos(data);
      
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEstudiante(prev => ({ ...prev, [name]: value }));
  };

  const buscarEstudiante = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/estudiantes/buscar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(estudiante)
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

  const matricularEstudiante = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/materia/${materiaS}/matricular`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estudiantes: [estudiante._id] })
      });
      if (!response.ok) throw new Error('Error al matricular estudiante');
      setReload(true);
      setStatus({ type: 'success', message: 'Estudiante matriculado con éxito' });
     
     

    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsLoading(false);
      
    }
    
  };
  setReload(false);


  const buscarEstudiantesPorCurso = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/estudiantes/curso/${cursoSeleccionado}`);
      if (!response.ok) throw new Error('Error al obtener los estudiantes del curso');
      const data = await response.json();
      setEstudiantesCurso(data);
      setStatus({ type: 'success', message: 'Estudiantes encontrados'})
      
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const matricularEstudiantesPorCurso = async () => {
    setIsLoading(true);
    try {
      const estudiantesIds = estudiantesCurso.map(e => e._id);
      const response = await fetch(`${API_URL}/materia/${materiaS}/matricular`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estudiantes: estudiantesIds })
      });
      if (!response.ok) throw new Error('Error al matricular estudiantes');
      setReload(true)
      setStatus({ type: 'success', message: 'Estudiantes matriculados con éxito' });
      
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsLoading(false);
      setReload(true);
    }
   
  };
  setReload(false);
  

 

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-4">Matricular Estudiantes</h1>
    
      <select
        value={modo}
        onChange={(e) => setModo(e.target.value)}
        className="w-full p-2 mb-4 border rounded-md"
      >
        <option value="individual">Por estudiante</option>
        <option value="curso">Por curso</option>
      </select>

      {modo === 'individual' ? (
        <>
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
          {estudiante._id && (
            <button
              onClick={matricularEstudiante}
              disabled={isLoading}
              className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-green-300"
            >
              {isLoading ? 'Matriculando...' : 'Matricular Estudiante'}
            </button>
          )}
        </>
      ) : (
        <>
          <select
            value={cursoSeleccionado}
            onChange={(e) => setCursoSeleccionado(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Seleccione un curso</option>
            {cursos.map((curso) => (
              <option key={curso._id} value={curso._id}>
                {curso.curso} {curso.division}
              </option>
            ))}
          </select>
          <button
            onClick={buscarEstudiantesPorCurso}
            disabled={isLoading || !cursoSeleccionado}
            className="w-full p-2 mb-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {isLoading ? 'Buscando...' : 'Buscar Estudiantes del Curso'}
          </button>
          {estudiantesCurso.length > 0 && (
            <>
              <ul className="mb-4 max-h-40 overflow-y-auto">
                {estudiantesCurso.map((e) => (
                  <li key={e._id} className="mb-1">
                    {e.nombre} {e.apellido} (DNI: {e.dni})
                  </li>
                ))}
              </ul>
              <button
                onClick={matricularEstudiantesPorCurso}
                disabled={isLoading}
                className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-green-300"
              >
                {isLoading ? 'Matriculando...' : 'Matricular Estudiantes del Curso'}
              </button>
            </>
          )}
        </>
      )}

      {status.message && (
        <div className={`mt-4 p-2 rounded-md ${status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          <p className="font-bold">{status.type === 'error' ? 'Error' : 'Éxito'}</p>
          <p>{status.message}</p>
        </div>
      )}
    </div>
  );
};