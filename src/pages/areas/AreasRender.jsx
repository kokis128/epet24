import React, { useEffect, useState } from 'react';
import { Input, Button,Select,Collapse  } from 'antd';
import { AreasPrint } from './AreasPrint';

export const AreasRender = ({ cursoId, cursos,items,mostrarForm, defaultActiveKey, onChange }) => {
  const [areas, setAreas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [informesGuardados, setInformesGuardados] = useState({});
  const [formData, setFormData] = useState({});
  const [areaSeleccionada, setAreaSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEstudiantes, setFilteredEstudiantes] = useState([]);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState(undefined);
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch('http://localhost:3000/api/areas')
      .then(response => response.json())
      .then(data => setAreas(data))
      .catch(error => console.error('Error fetching areas:', error));
  }, []);

  useEffect(() => {
    if (areaSeleccionada) {
      fetch(`${API_URL}/estudiantes/curso/${cursoId}`)
        .then(response => response.json())
        .then(data => setEstudiantes(data))
        .catch(error => console.error('Error fetching students:', error));

      fetch(`${API_URL}/areaEstudiante?cursoId=${cursoId}&areaId=${areaSeleccionada}`)
        .then(response => response.json())
        .then(data => {
          const informesMap = data.reduce((acc, informe) => {
            if (!acc[informe.estudianteId]) {
              acc[informe.estudianteId] = {};
            }
            acc[informe.estudianteId][informe.areaId] = informe;
            return acc;
          }, {});
          setInformesGuardados(prevState => ({...prevState, ...informesMap}));
          setFormData(prevState => ({...prevState, ...informesMap}));
        })
        .catch(error => console.error('Error fetching informes:', error));
    }
  }, [cursoId, areaSeleccionada]);

  useEffect(() => {
    if (estudiantes.length > 0) {
      const filtered = estudiantes.filter(estudiante => 
        estudiante.dni.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${estudiante.nombre} ${estudiante.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEstudiantes(filtered);
    }
  }, [searchTerm, estudiantes]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInformeChange = (estudianteId, value) => {
    setFormData(prevState => ({
      ...prevState,
      [estudianteId]: {
        ...prevState[estudianteId],
        [areaSeleccionada]: {
          ...prevState[estudianteId]?.[areaSeleccionada],
          informe: value,
        }
      }
    }));
  };

  const handleNotaChange = (estudianteId, value) => {
    setFormData(prevState => ({
      ...prevState,
      [estudianteId]: {
        ...prevState[estudianteId],
        [areaSeleccionada]: {
          ...prevState[estudianteId]?.[areaSeleccionada],
          nota: value,
        }
      }
    }));
  };

  const handleFirmaChange = (estudianteId, value) => {
    setFormData(prevState => ({
      ...prevState,
      [estudianteId]: {
        ...prevState[estudianteId],
        [areaSeleccionada]: {
          ...prevState[estudianteId]?.[areaSeleccionada],
          firma: value,
        }
      }
    }));
  };

  const enviarInforme = (estudianteId) => {
    const nuevoInforme = formData[estudianteId]?.[areaSeleccionada];
    if (!nuevoInforme) return;
    console.error(`No se encontró el ID del informe para el estudiante con ID: ${estudianteId} y área: ${areaSeleccionada}`);

    const informeParaEnviar = {
      ...nuevoInforme,
      estudianteId,
      areaId: areaSeleccionada,
    };

    fetch('http://localhost:3000/api/areaEstudiante', {
      method: 'POST',
      body: JSON.stringify(informeParaEnviar),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
        actualizarInformes(estudianteId, areaSeleccionada, data);
      } else {
        console.error('Error: la respuesta del servidor está vacía');
      }
      })
      .catch(error => console.error('Error sending report:', error));
  };

  useEffect(() => {
    console.log(formData);  // Revisa si el estado se actualiza correctamente
  }, [formData]); 

  const modificarInforme = (estudianteId) => {
    const informeActualizado = formData[estudianteId]?.[areaSeleccionada];
    if (!informeActualizado) return;

    const informeId = informesGuardados[estudianteId]?.[areaSeleccionada]?._id;
    if (!informeId) {
      console.error(`No se encontró el ID del informe para el estudiante con ID: ${estudianteId} y área: ${areaSeleccionada}`);
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
        actualizarInformes(estudianteId, areaSeleccionada, data);
      })
      .catch(error => console.error('Error updating report:', error));
  };

  const actualizarInformes = (estudianteId, areaId, informeActualizado) => {
    setInformesGuardados(prevState => ({
      ...prevState,
      [estudianteId]: {
        ...prevState[estudianteId],
        [areaId]: informeActualizado
      }
    }));
    setFormData(prevState => ({
      ...prevState,
      [estudianteId]: {
        ...prevState[estudianteId],
        [areaId]: informeActualizado
      }
    }));
  };

  const handlePrintIndividual = (estudiante) => {
    setSelectedEstudiante(estudiante);
    setPrintModalOpen(true);
  };

  const periodo=['Primer Cuatrimestre','Segundo Cuatrimestre'];
 
  const handleChange = (value) => {
    setPeriodoSeleccionado(value)
   
  };
  
console.log(formData)


  return (
    <>
    
    <div className='flex justify-end pt-2 gap-3 '>
    
    <div className='absolute left-0 top-0 z-10 w-full '>
    <Collapse 
      items={items} 
      defaultActiveKey={['0']}     
      onChange={onChange} 
      className='h-10 w-80 border   ' 
    />
  </div>
  
    
      <Button onClick={() => setOpen(true)} className='relative '>
        Imprimir Informes
      </Button>
      <Select
      mode="simple"
      placeholder='Selecciona Periodo'
      onChange={handleChange} 
      value={periodoSeleccionado} 
      className='relative'
    >
      <Select.Option value="Primer Cuatrimestre">
      Primer Cuatrimestre
      </Select.Option>
      <Select.Option value="Segundo Cuatrimestre">
      Segundo Cuatrimestre
      </Select.Option>
    </Select>
      </div>

      <AreasPrint setOpen={setPrintModalOpen} open={printModalOpen} areas={areas} estudiantes={selectedEstudiante ? [selectedEstudiante] : []} formData={formData} informesGuardados={informesGuardados} cursos={cursos} periodo={periodoSeleccionado}  />
      <AreasPrint setOpen={setOpen} open={open} areas={areas} estudiantes={estudiantes} formData={formData} informesGuardados={informesGuardados} cursos={cursos} periodo={periodoSeleccionado}  />

      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Áreas section */}
       
        <div className="w-full md:w-1/4">
          <h2 className="text-lg font-semibold mb-4">Áreas</h2>
          <ul className="justify-start">
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

        {/* Estudiantes section */}
        <div className="w-full md:w-full">
          <div className='flex w-20 gap-5 justify-start'>
          <h2 className="text-lg font-semibold mb-2">Estudiantes</h2>
          
          
          </div>
          <Input
            placeholder="Buscar por DNI, nombre o apellido"
            value={searchTerm}
            onChange={handleSearch}
            className="mb-4 w-112"
          />
          

          <ul className="justify-start overflow-x-auto">
            {filteredEstudiantes.map(estudiante => (
              <li key={estudiante._id} className="flex flex-col justify-around md:flex-row  border rounded border-gray-400 hover:bg-gray-100 ">
                <div className="flex-col flex-1 flex justify-center text-center cursor-pointer px-1">
                  <p className='text-[9px] text-lime-500  '>{estudiante.dni}</p>
                  <p className='text-xs '>{estudiante.nombre} {estudiante.apellido}</p>
                </div>
                <div className="flex w-full  border-gray-400  ">
                  <textarea
                    name='informe'
                    type='text'
                    value={formData[estudiante._id]?.[areaSeleccionada]?.informe || ''}
                    onChange={(e) => handleInformeChange(estudiante._id, e.target.value)}
                    className="flex-grow w-full h-full p-1 border rounded border-x-gray-400 text-xs "
                    maxLength={600}
                  />
                </div>
                <div className=" mx-1 ">
                  <input
                    type="text"
                    value={formData[estudiante._id]?.[areaSeleccionada]?.nota || ''}
                    onChange={(e) => {
                      const input = e.target.value;
                      // Permite solo números y máximo de 2 dígitos
                      if (/^\d{0,2}$/.test(input)) {
                        handleNotaChange(estudiante._id, input);
                      }
                    }}
                    maxLength={2} 
                    className=" border rounded h-full md:w-10 w-full text-center "
                    placeholder="Nota"
                  />
                </div>
                <div className="text-center mr-1 ">
  <textarea
    value={formData[estudiante._id]?.[areaSeleccionada]?.firma || ''}
    onChange={(e) => handleFirmaChange(estudiante._id, e.target.value)}
    className="md:w-12 w-full h-full text-center border rounded text-xs resize-none pt-5"
    placeholder="Firma"
    rows={2} // Establece la cantidad de líneas visibles
    maxLength={20}
  />
</div>
                <button
                  onClick={() => {
                    if (informesGuardados[estudiante._id]?.[areaSeleccionada]) {
                      modificarInforme(estudiante._id);
                    } else {
                      enviarInforme(estudiante._id);
                    }
                  }}
                  className="px-2 py-2 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                >
                  {informesGuardados[estudiante._id]?.[areaSeleccionada] ? 'Modificar' : 'Guardar'}
                </button>
                <button
                  onClick={() => handlePrintIndividual(estudiante)}
                  className="px-2 py-2 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                >
                  Imprimir
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
