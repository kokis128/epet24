import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { AreasPrint } from './AreasPrint';
import {
  Button
   
} from 'antd';
export const AreasRender = ({ cursoId }) => {
  const [areas, setAreas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [informesGuardados, setInformesGuardados] = useState({});
  const [formData, setFormData] = useState({});
  const [areaSeleccionada, setAreaSeleccionada] = useState(null);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetch('http://localhost:3000/api/areas')
      .then(response => response.json())
      .then(data => setAreas(data))
      .catch(error => console.error('Error fetching areas:', error));
  }, []);

  useEffect(() => {
    if (areaSeleccionada) {
      fetch(`http://localhost:3000/api/estudiantes/${cursoId}`)
        .then(response => response.json())
        .then(data => setEstudiantes(data))
        .catch(error => console.error('Error fetching students:', error));
    }
  }, [cursoId, areaSeleccionada]);


  useEffect(() => {
    if (areaSeleccionada) {
      fetch(`http://localhost:3000/api/areaEstudiante?cursoId=${cursoId}&areaId=${areaSeleccionada}`)
        .then(response => response.json())
        .then(data => {
          const informesMap = data.reduce((acc, informe) => {
            acc[informe.estudianteId] = informe;
            return acc;
          }, {});
          setInformesGuardados(informesMap);
          setFormData(informesMap);
        })
        .catch(error => console.error('Error fetching informes:', error));
    } else {
      setFormData({});
    }
  }, [cursoId, areaSeleccionada]);

  const handleInformeChange = (id, value) => {
    setFormData(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        informe: value,
        areaId: areaSeleccionada,
      }
    }));
  };

  const handleNotaChange = (id, value) => {
    setFormData(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        nota: value,
        areaId: areaSeleccionada,
      }
    }));
  };

  const handleFirmaChange = (id, value) => {
    setFormData(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        firma: value,
        areaId: areaSeleccionada,
      }
    }));
  };

  const actualizarInformes = (id, informeActualizado) => {
    setInformesGuardados(prevState => ({
      ...prevState,
      [id]: informeActualizado
    }));
    setFormData(prevState => ({
      ...prevState,
      [id]: informeActualizado
    }));
  };

  const enviarInforme = (id) => {
    const nuevoInforme = { ...formData[id], areaId: areaSeleccionada };

    fetch('http://localhost:3000/api/areaEstudiante', {
      method: 'POST',
      body: JSON.stringify(nuevoInforme),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        actualizarInformes(id, data);
      })
      .catch(error => console.error('Error sending report:', error));
  };

  const modificarInforme = (id) => {
    const informeActualizado = { ...formData[id], areaId: areaSeleccionada };
    const informeId = informesGuardados[id]?._id;

    if (!informeId) {
      console.error(`No se encontró el ID del informe para el estudiante con ID: ${id}`);
      return;
    }

    fetch(`http://localhost:3000/api/areaEstudiante/${informeId}`, {
      method: 'PUT',
      body: JSON.stringify(informeActualizado),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        actualizarInformes(id, data);
      })
      .catch(error => console.error('Error updating report:', error));
  };

  return (
    <>
    <Button  onClick={() => setOpen(true)}>
    Imprimir Informes
  </Button>
  <AreasPrint setOpen={setOpen} open={open} areas={areas} estudiantes={estudiantes} formData={formData}/>
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/4">
        <h2 className="text-lg font-semibold mb-4">Áreas</h2>
        <ul className="space-y-2">
          {areas.map(area => (
            <li
              key={area._id}
              onClick={() => setAreaSeleccionada(area._id)}
              className={`p-4 border rounded cursor-pointer ${areaSeleccionada === area._id ? 'bg-blue-200' : 'hover:bg-gray-100'}`}
            >
              <p className="font-bold">{area.area}</p>
              <p>{area.materias}</p>
              <p>{area.informeDescripcion}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-full">
        <h2 className="text-lg font-semibold mb-2">Estudiantes</h2>
        <ul className="justify-start">
          {areaSeleccionada && estudiantes.map(estudiante => (
            <li key={estudiante._id} className={`flex flex-col justify-around md:flex-row gap-1 border rounded ${estudianteSeleccionado === estudiante._id ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
              <div className="flex cursor-pointer" onClick={() => setEstudianteSeleccionado(estudiante._id)}>
                <p className='text-[10px]'>{estudiante.dni}</p>
                <p>{estudiante.nombre} {estudiante.apellido}</p>
              </div>
              <div className="flex-initial w-full px-2">
             
                 
                  
            <textarea
                    name='informe'
                    type='text'
                    value={ formData[estudiante._id]?.areaId===areaSeleccionada &&  formData[estudiante._id]?.informe || ''}
                    onChange={(e) => handleInformeChange(estudiante._id, e.target.value)}
                    className="flex-initial w-full p-2 border rounded"
                    
            />

                
              
              </div>
              <div className="flex-initial w-5 mr-5">
               
                  <input
                    type="text"
                    value={(formData[estudiante._id]?.areaId===areaSeleccionada) && formData[estudiante._id]?.nota ||''}
                    onChange={(e) => handleNotaChange(estudiante._id, e.target.value)}
                    className=" p-4 border rounded h-full w-20"
                    placeholder="Nota"
                  />
               
              </div>
              <div className="flex-initial ml-8 ">
                
                  <input
                    type="text"
                    value={(formData[estudiante._id]?.areaId===areaSeleccionada) && formData[estudiante._id]?.firma||''}
                    onChange={(e) => handleFirmaChange(estudiante._id, e.target.value)}
                    className="flex-initial w-12 h-full  ml-2 border rounded"
                    placeholder="Firma"
                  />
              
              </div>
              <button
                onClick={() => {
                  if (informesGuardados[estudiante._id]) {
                    modificarInforme(estudiante._id);
                  } else {
                    enviarInforme(estudiante._id);
                  }
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                { informesGuardados[estudiante._id]?.areaId===areaSeleccionada && informesGuardados[estudiante._id]?.informe   ? 'Modificar' : 'Guardar'}
                {console.log(informesGuardados[estudiante._id])}

              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

