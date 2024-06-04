import React, { useState, useEffect} from 'react'



export const MatricularEstudiante = ({materiaS}) => {
  const [dni, setDni] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [idEstudiante, setIdEstudiante] = useState('');
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [apellidoEstudiante, setApellidoEstudiante] = useState('');
  const [error, setError] = useState(null);
 
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
        console.log(data);
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
      setNombreEstudiante(estudianteEncontrado.nombre)
      setApellidoEstudiante(estudianteEncontrado.apellido)
      setError(null);
    } else {
      setError('Estudiante no encontrado');
      setIdEstudiante('');
    }
  };

  const matricular = async () => {

   
      const materiaId =materiaS;
    console.log(materiaId)

    const URL = 'http://localhost:3000/api'

    fetch(`${URL}/estudiante/${idEstudiante}/matricular`,{
       
      method: 'PUT',
      body: JSON.stringify({materiaId}),
      headers:{
        'Content-Type':'application/json'
      }

      })
      .then(response =>{ console.log(idEstudiante)
        if(!response.ok){
         
          return response.json();
          
        }
       
        return response.json();
        
      })
      .then (data=>{
        console.log(data)
        if(data.err){
        alert(data.err);
        }
        
        
      })
      .catch( error =>{
        console.error('Algo fallo al matricular al estudiante')
      })
  };

  return (
    <div>
      <h1>Búsqueda de Estudiante por DNI</h1>
      <input
        type="text"
        value={dni}
        onChange={handleInputChange}
        placeholder="Ingrese el DNI"
      />
      <button onClick={buscarEstudiante}>Buscar</button>
      {error && <p>{error}</p>}
      {idEstudiante && <p>estudiante encontrado: {nombreEstudiante} {apellidoEstudiante} </p>}
    
      <button onClick={matricular}>Matricular</button>
    
        </div>
    
  );
};
