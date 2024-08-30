import React from 'react'
import { Layout, Typography ,Flex,Button, Modal,Checkbox,Input  } from 'antd';
import logo from "../assets/logo24.png";
import { ClasesList } from '../pages/clasesList/ClasesList';
import { ClasesAdd } from '../pages/clasesList/ClasesAdd';
import { MatricularEstudiante} from '../pages/estudiantes/MatricularEstudiante';
//import { CargarEstudiantes } from '../pages/estudiantes/CargarEstudiantes';
import { useState, useEffect } from 'react';
import '../pages/clasesList/clasesListItem.css'
import { MdHeight } from 'react-icons/md';
import { ContarAusencias} from '../pages/estudiantes/ContarAusencias';
import { AgregarMateria} from '../pages/materias/AgregarMateria';
import { PlanillaToPrint} from '../components/PlanillaToPrint';
import { PlanillaToPrintMaterias} from '../components/PlanillaToPrintMaterias';
import TextArea from 'antd/es/input/TextArea';

export const PlanillasSeguimiento = () => {

  const [materias, setMaterias] = useState([]);
  const [clases, setClases] = useState([]); 
  const [estudiantesBd, setEstudiantesBd] = useState([]); 
 
  const [error, setError] = useState(null);
  const [msgSeleccionar, setMsgSeleccionar]=useState('Debes Seleccionar una Materia')
  const [ausentes, setAusentes] = useState([]);
  const [reload, setReload] = useState(false);
  const [anotaciones, setAnotaciones] = useState([]);
  const [claseCss, setClaseCss] = useState();

  const [cantidadClases, setCantidadClases] = useState(0);

  const incrementarCantidad = () => {
    setCantidadClases((prevCount) => prevCount + 1);
  };

  const decrementarCantidad = () => {
    setCantidadClases((prevCount) => prevCount - 1);
  };
  console.log(cantidadClases);
  const handleResponseclases = (response) => {
    if (!response) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };

  const handleResponseEstudiantes = (response) => {
    if (!response) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };
  // Define una función para manejar errores de la solicitud fetch
  
  const handleResponseMaterias = (response) => {
    if (!response) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };

let [selectedMateriaId,setSelectedMateriaId] = useState();
  const handleError = (error) => {
    console.error('Error fetching data:', error);
  };
  
  selectedMateriaId = localStorage.getItem('selectedMateriaId');
  
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(() => {
    return localStorage.getItem('selectedMateriaId') || null;
  });
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState('');
  
   
  
  
  
  useEffect(() => {
    fetch('http://localhost:3000/api/materias')
      .then(handleResponseMaterias)
      .then(data => {         
        setMaterias(data);
        if (!materiaSeleccionada && data.length > 0) {
          const firstMateriaId = data[0]._id;
          setMateriaSeleccionada(firstMateriaId);
          localStorage.setItem('selectedMateriaId', firstMateriaId);
        }
        
        return data; // Retorna los datos para el siguiente then
      })
      .then(data=>(console.log(data)))    
      .catch(handleError);
  }, []);


  useEffect(() => {
    fetch('http://localhost:3000/api/clases')
      .then(handleResponseclases)
      .then(data => setClases(data))
      .catch(handleError);
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/estudiantes')
      .then(handleResponseEstudiantes)
      .then(data => setEstudiantesBd(data))
      .catch(handleError);
  }, []); 

  const user = JSON.parse(localStorage.getItem('user'))

  const { Header, Footer, Sider, Content } = Layout;

 
  const headerStyle = {
    textAlign: 'center',
    color: '#fff',    
    paddingInline: 0,
    lineHeight: '20px',
    backgroundColor: '#7196ff',
  };
  const contentStyle = {
    textAlign: 'center',
    minHeight:120,
    lineHeight: '60px',
    color: '#fff',
    backgroundColor: '#0958d9',
  };
  const siderStyle = {
    textAlign: 'center',
    lineHeight: '60px',
    color: '#fff',
    backgroundColor: '#1677ff',
  };
  const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
  };
  const layoutStyle = {
    borderRadius: 2,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    maxHeight:'5%',
  };

  const [isSlected, setIsSlected] = useState(null);  
 
const onSelectMateria = (materiaId) => {    
 setMateriaSeleccionada(materiaId)
 localStorage.setItem('selectedMateriaId', materiaId);
 
}

  const onSelectEstudiante = (estudianteId) => {    
    setEstudianteSeleccionado(estudianteId)
    console.log(estudianteId)
  }   

  const [isModalOpen, setIsModalOpen] = useState(false);  
  const showModal = () => {
    if (materiaSeleccionada){ 
      setMsgSeleccionar('Matricular Estudiante');
       }
    setIsModalOpen(true);
  };

  const [isModalOpenInasistencias, setIsModalOpenInasistencias] = useState(false);
  const showModalInasistencias = () => {
    setIsModalOpenInasistencias(true);
  };

  const [isModalOpenMaterias, setIsModalOpenMaterias] = useState(false);
  const showModalMaterias = () => {
    setIsModalOpenMaterias(true);
  };

  const [isModalOpenIprimir, setIsModalOpenImprimir] = useState(false);
  const showModalImprimir = () => {
    setIsModalOpenImprimir(true);
  };
  const [isModalOpenRegistros, setIsModalOpenRegistros] = useState(false);
  const showModalRegistros = () => {
    setIsModalOpenRegistros(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  
  };
  const handleOkInasistencias = () => {
    setIsModalOpenInasistencias(false);
  };
  
  const handleOkMaterias = () => {
    setIsModalOpenMaterias(false);
  };
  const handleOkImprimir = () => {
    setIsModalOpenImprimir(false);
  };
  const handleOkRegistros = () => {
    setIsModalOpenRegistros(false);
  };
  

  const handleCancel = () => {
    setIsModalOpen(false);
   

    
    };
  const handleCancelMaterias = () => {
    setIsModalOpenMaterias(false);
  };
  const handleCancelInasistencias = () => {
    setIsModalOpenInasistencias(false);     
  }; 

   const handleCancelImprimir = () => {
    setIsModalOpenImprimir(false);     
  };
  const handleCancelRegistros = () => {
    setIsModalOpenRegistros(false);     
  };

  const onChange = (e, id) => {
    if (e.target.checked) {
      setAusentes([...ausentes, id]);
    } else {
      setAusentes(ausentes.filter(ausenteId => ausenteId !== id));
    }
  };

  const handleAnotacionChange = (e, estudianteId) => {
   
    const nuevaAnotacion = { student_id: estudianteId, anotacion: e.target.value };
    setAnotaciones(prevAnotaciones => {
      const index = prevAnotaciones.findIndex(anotacion => anotacion.student_id === estudianteId);
      if (index !== -1) {
        // Actualizar anotación existente
        const updatedAnotaciones = [...prevAnotaciones];
        updatedAnotaciones[index] = nuevaAnotacion;
        return updatedAnotaciones ;
      } else {
        // Agregar nueva anotación
        return [...prevAnotaciones, nuevaAnotacion];
      }
    })};

    console.log(anotaciones)    
    
  
    const handleAgregarClase = (nuevaClase) => {
      const clasesMateriaSeleccionada = clases.filter(clase => clase.materiaId && clase.materiaId._id === materiaSeleccionada);
      
      const existeClaseConFecha = (fecha) => {
        return clasesMateriaSeleccionada.some(clase => new Date(clase.fecha).toDateString() === new Date(fecha).toDateString());
      };
      if (existeClaseConFecha(nuevaClase.fecha)) {
        alert('Ya existe una clase con esta fecha en la materia seleccionada.');
        return false;
      }
      console.log('Clase agregada:', nuevaClase);
      setClases([...clases, nuevaClase]);  // Agrega la nueva clase al estado de clases
      return true;
     
      
    };


  return (
    <Layout style={layoutStyle} className=''>
      <Header className='overflow-hidden h-full w-full p-0 bg-gradient-to-r from-indigo-600  ' style={headerStyle}>        
        <div className='flex items-center justify-center'>
        <h1 className='text-black text-3xl text-center inline font-mono'>EPET 24</h1>
        <img src={logo} alt="logo epet24" className='w-10 h-8 pl-3 text-center inline' />
     
        </div>
       
        <span className='font-sans text-gray-700 pr-6 underline decoration-solid text-center inline'>Gestión de Clases</span>
        <span className='flex flex-row-reverse pr-5 text-gray-500 font-mono inline text-xs'>Bienvenido {user.username}</span>
        
        
        
               
    <ul className='flex bg-slate-500  ' >
    <li><Button className=' h-full border-none bg-slate-500 rounded-none overflow-hidden'   onClick={showModalMaterias}>
     Agregar Materia
     </Button ></li>

     <li><Button className=' h-full border-none bg-slate-500 rounded-none overflow-hidden '  onClick={showModal}>
     Matricular Estudiantes
     </Button></li>

     <li><Button className='border-none bg-slate-500 rounded-none'  onClick={showModalInasistencias}>
     Ver inasistencias
     </Button></li>

     <li><Button className='border-none bg-slate-500 rounded-none'  onClick={showModalImprimir}>
     Imprimir Planillas
     </Button></li>
     
     <li><Button className='border-none bg-slate-500 rounded-none'  onClick={showModalRegistros}>
     Registro De Clases
     </Button></li>



     </ul> 
    
     <Modal title={msgSeleccionar} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  footer={[<Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
          // Puedes agregar más botones si es necesario
        ]}>
     {materiaSeleccionada &&  <MatricularEstudiante materiaS={materiaSeleccionada} />}
           
     </Modal>

     <Modal  title={'inasistencias'} open={isModalOpenInasistencias} onOk={handleOkInasistencias}  onCancel={handleCancelInasistencias} >
     {materiaSeleccionada && <ContarAusencias materiaS={materiaSeleccionada} />}
      </Modal>

    
    <Modal  title={'Agregar Materia'} open={isModalOpenMaterias} onOk={handleOkMaterias} onCancel={handleCancelMaterias}>
    <AgregarMateria user={user}/>           
     </Modal> 

      <Modal  title={'Planilla de Seguimiento'} style={{ top: 0 ,height: '110vh', padding: 0, overflow: 'hidden' }}
        width="100vw" className="full-screen-modal"  open={isModalOpenIprimir} onOk={handleOkImprimir} onCancel={handleCancelImprimir}>
    <PlanillaToPrint materiaS={materiaSeleccionada} clases={clases}/>           
     </Modal>  
    
    <PlanillaToPrintMaterias materiaS={materiaSeleccionada} clases={clases} setOpen={setIsModalOpenRegistros} isModalOpenRegistros={isModalOpenRegistros} handleOkRegistros={handleOkRegistros} handleCancelRegistros={handleCancelRegistros}/>           
           
        </Header>
       
      <Layout>
        <Sider width="25%" style={siderStyle}>        
      
      <div>                         
      <Typography.Title level={5}>Materias</Typography.Title>            
        
        {materias.map((materia,index) => (        
           
        <ul className='bg-gradient-to-r from-indigo-400'  >
         
          <li  onClick={() => onSelectMateria(materia._id)} key={materia._id}
           style={{ cursor: 'pointer', margin: '0px 0px' } } className={materia._id===materiaSeleccionada?'font-sans select':''} > {materia.userId === user._id && materia.name}
           </li>
         
            
         
          </ul>
        
        ))}
        
        
      </div>
         
      
        </Sider>

        <Layout style={contentStyle} >

        <Layout className='flex-row  ' style={contentStyle} >

          
        <Content className='border-solid border-2 border-blue-700 w-[20%]'  >
        
          <Typography.Title level={5}>Clases</Typography.Title>   

          
          {materiaSeleccionada && <ClasesAdd cantidadClases={cantidadClases} materiaS={materiaSeleccionada} ausentes={ausentes} estudianteSeleccionado={estudianteSeleccionado} anotaciones={anotaciones} setClases={setClases} handleAgregarClase={handleAgregarClase} />}
     
          </Content  >
          

          <div className="border-solid border-2 border-blue-700 px-2 rounded-lg shadow-md">
      
      
      <Typography.Title level={5}>
        Estudiantes
      </Typography.Title>
      <div style={{ minWidth: '250px' }} > 
      {estudiantesBd.map((estudianteBd) => (
        <ul  key={estudianteBd._id}   >
          {materias.map((materia, index) => (
            <li key={index} >
              {materiaSeleccionada === materia._id &&
                materia.estudiantes.map((estudiante, idx) => (
                  <ul key={idx}  >
                    {estudiante === estudianteBd._id && (
                      <li
                      onClick={() => onSelectEstudiante(estudianteBd._id)}
                      className={`flex items-center justify-between p-2 cursor-pointer border rounded-lg ${
                        ausentes.includes(estudianteBd._id) ? 'bg-red-400' : 'bg-gradient-to-r from-indigo-400 border-gray-700'
                      }`}
                    >
                        <span className=" text-gray-600 font-sans text-xs">
                          {estudianteBd.nombre} {estudianteBd.apellido}
                        </span>
                        <ul className='flex flex-row-reverse overflow-x-hidden '  style={{ maxWidth: '140px' }} >
                        <li ><TextArea
                            placeholder="Anotación"
                            className="ml-3"
                            value={anotaciones.find(anotacion => anotacion.student_id === estudianteBd._id)?.anotacion || ''}
                            onChange={(e) => handleAnotacionChange(e, estudianteBd._id)}
                            
                          
                          /></li>
                        
                        <li>
  <label className="inline-flex items-center pl-5">
    <input 
      type="checkbox" 
      onChange={(e) => onChange(e, estudianteBd._id)} 
      className="form-checkbox h-4 w-4 accent-red-500"
    />
  </label>
</li>
                       
                        </ul>

                      </li>
                    )}
                  </ul>
                ))}
            </li>
          ))}
        </ul>
      ))}
      </div>
    </div>

          </Layout >
     
     
    
      {user._id  && (
        <div className='resizable'>         
         
          <h5>Clases:</h5>
          {
            
            <div >            
         
          {clases.map((clase,index) => (
               
                 
               <ul key={index} >
               
                <li >{ clase.materiaId && clase.materiaId._id === materiaSeleccionada
                  
                &&(   
                  <>            
                  <div  >     
                 <ClasesList clases={clase}
                      incrementarCantidad={incrementarCantidad}
                      decrementarCantidad={decrementarCantidad}
                      setClases={setClases}
                      materiaSeleccionada={materiaSeleccionada} />
                 </div> 
                 
                 </> 
             
                )                
            }</li>
          
              </ul>
             
            ))}
             
         
         </div>
         
         }
         
        </div>
         
      )}      
       
            
          
          
          </Layout>
         
      </Layout>
      
    
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
   
  )
}
