import React from 'react'
import { Layout, Typography ,Button, Modal,message  } from 'antd';
import logo from "../assets/logo24.png";
import { GrLocation } from "@react-icons/all-files/gr/GrLocation";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { IoMdMail } from "@react-icons/all-files/io/IoMdMail";
import { ClasesList } from '../pages/clasesList/ClasesList';
import { ClasesAdd } from '../pages/clasesList/ClasesAdd';
import { MatricularEstudiante} from '../pages/estudiantes/MatricularEstudiante';
import { DesmatricularEstudiante} from '../pages/estudiantes/DesmatricularEstudiante';
//import { CargarEstudiantes } from '../pages/estudiantes/CargarEstudiantes';
import { useState, useEffect } from 'react';
import '../pages/clasesList/clasesListItem.css'
import { MdHeight } from 'react-icons/md';
import { ContarAusencias} from '../pages/estudiantes/ContarAusencias';
import { AgregarMateria} from '../pages/materias/AgregarMateria';
import { BorrarMateria} from '../pages/materias/BorrarMateria';
import { PlanillaToPrint} from '../components/PlanillaToPrint';
import { PlanillaToPrintMaterias} from '../components/PlanillaToPrintMaterias';
import TextArea from 'antd/es/input/TextArea';

export const PlanillasSeguimiento = () => {
  
  const [materias, setMaterias] = useState([]);
  const [clases, setClases] = useState([]); 
  const [estudiantesBd, setEstudiantesBd] = useState([]); 
  const [cantidadClases, setCantidadClases] = useState(0);
  const [error, setError] = useState(null);
  const [msgSeleccionar, setMsgSeleccionar]=useState('Debes Seleccionar una Materia')
  const [ausentes, setAusentes] = useState([]);
  const [reload, setReload] = useState(false);
  const [reload2, setReload2] = useState(false);
  const [reload3, setReload3] = useState(false);
  const [anotaciones, setAnotaciones] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
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
    fetch(`${API_URL}/materias`)
      .then(handleResponseMaterias)
      .then(data => {         
        setMaterias(data);
        if (!materiaSeleccionada && data.length > 0) {
          const firstMateriaId = data[0]._id;
          console.log('primerMateria',firstMateriaId);
          setMateriaSeleccionada(firstMateriaId);
          localStorage.setItem('selectedMateriaId', firstMateriaId);
        }
        
        return data; // Retorna los datos para el siguiente then
      })
      .then(data=>(console.log(data)))    
      .catch(handleError);
  }, [reload,reload2]);

  useEffect(() => {
    if (selectedMateriaId) {
      setMateriaSeleccionada(selectedMateriaId);
    }
  }, [selectedMateriaId]);



  useEffect(() => {
    fetch(`${API_URL}/clases`)
      .then(handleResponseclases)
      .then(data => setClases(data))
      .catch(handleError);
  }, [reload3]);
  
  
 

  useEffect(() => {
    fetchEstudiantes();
  }, [materiaSeleccionada,reload,reload2]);

  const fetchEstudiantes = async () => {
    try {
      const response = await fetch(`${API_URL}/estudiantes`);
      if (!response.ok) throw new Error('Error al obtener estudiantes');
      const data = await response.json();
      setEstudiantesBd(data);
    } catch (error) {
      console.error('Error al cargar estudiantes:', error);
    }
  };

 

  const user = JSON.parse(localStorage.getItem('user'))

  const { Header, Footer, Sider, Content } = Layout;

 



const navButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#595959',
  fontSize: '16px',
  fontWeight: '500',
};

 
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
    if (!materiaSeleccionada) {
      alert('Debes seleccionar haber una materia Seleccionada.');
      return; // No abrir el modal si no hay materia seleccionada
    }
    if (materiaSeleccionada){ 
      setMsgSeleccionar('Matricular Estudiante');
       }
    setIsModalOpen(true);
  };

  const [isModalOpenInasistencias, setIsModalOpenInasistencias] = useState(false);
  const showModalInasistencias = () => {
    if (!materiaSeleccionada) {
      alert('Debes seleccionar haber una materia Seleccionada.');
      return; // No abrir el modal si no hay materia seleccionada
    }
    setIsModalOpenInasistencias(true);
  };

  const [isModalOpenMaterias, setIsModalOpenMaterias] = useState(false);
  const showModalMaterias = () => {
    setIsModalOpenMaterias(true);
  };


  const [isModalBorrarMateria, setIsModalBorrarMateria] = useState(false);
  const showModalBorrarMateria = () => {
    setIsModalBorrarMateria(true);
  };

  const [isModalOpenIprimir, setIsModalOpenImprimir] = useState(false);
  const showModalImprimir = () => {
    if (!materiaSeleccionada) {
      alert('Debes seleccionar haber una materia Seleccionada.');
      return; // No abrir el modal si no hay materia seleccionada
    }
    setIsModalOpenImprimir(true);
  };
  const [isModalOpenRegistros, setIsModalOpenRegistros] = useState(false);
  const showModalRegistros = () => {
    if (!materiaSeleccionada) {
      alert('Debes seleccionar haber una materia Seleccionada.');
      return; // No abrir el modal si no hay materia seleccionada
    }
    setIsModalOpenRegistros(true);
  };
  const [isModalOpenModificarAnotacion, setIsModificarAnotacion] = useState(false);
  const showModificarAnotacion = () => {
    setIsModificarAnotacion(true);
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
  const handleOkBorrarMateria = () => {
    setIsModalBorrarMateria(false);
  };


  const handleOkImprimir = () => {
    setIsModalOpenImprimir(false);
  };
  const handleOkRegistros = () => {
    setIsModalOpenRegistros(false);
  };
  const handleOkModificarAnotaciones = () => {
    setIsModificarAnotacion(false);
  };
  

  const handleCancel = () => {
    setIsModalOpen(false);
   

    
    };
  const handleCancelMaterias = () => {
    setIsModalOpenMaterias(false);
  };
  const handleCancelBorrarMateria = () => {
    setIsModalBorrarMateria(false);
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
  const handleCancelModificarAnotacion = () => {
    isModalOpenModificarAnotacion(false);     
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
        message.error('Ya existe una clase con esta fecha en la materia seleccionada.');
        return false;
      }
      console.log('Clase agregada:', nuevaClase);
      setClases([...clases, nuevaClase]);  // Agrega la nueva clase al estado de clases
      return true;
     
      
    };


    
   


  return (
    <Layout style={layoutStyle} className=''>
      <Header className='overflow-hidden h-full w-full p-0 bg-gradient-to-r from-indigo-600  ' style={headerStyle}>



        <div className='flex items-center justify-center flex-col'>
          <div>
        <h1 className='text-black text-xl text-center inline font-mono'>EPET 24</h1>
        <img src={logo} alt="logo epet24" className='w-7 h-6 pl-3 text-center inline' />
        </div>
        
       
        <div className='font-sans text-gray-700 pr-6 underline decoration-solid text-center inline '>Gestión de Clases</div>
        </div>
        <span className='flex flex-row-reverse pr-5 text-gray-500 font-sans inline text-xs'>Usuario: {user.nombre} {user.apellido}</span>
        
        
        
               
    <ul className='flex bg-slate-500  ' >
    <li><Button className=' h-full border-none bg-slate-500 rounded-none overflow-hidden'   onClick={showModalMaterias}>
     Agregar Materia
     </Button ></li>
     <li><Button className=' h-full border-none bg-slate-500 rounded-none overflow-hidden'   onClick={showModalBorrarMateria}>
     <BorrarMateria materiaS={materiaSeleccionada} setReload2={setReload2} setMateriaSeleccionada={setMateriaSeleccionada} materias={materias}/> 
     </Button ></li>

     <li><Button className=' h-full border-none bg-slate-500 rounded-none overflow-hidden '  onClick={showModal}>
     Matricular Estudiantes
     </Button></li>

     <li><Button className=' h-full border-none bg-slate-500 rounded-none'  onClick={showModalInasistencias}>
     Desmatricular Estudiantes
     </Button></li>

     <li><Button className='h-full border-none bg-slate-500 rounded-none'  onClick={showModalImprimir}>
     Planillas
     </Button></li>
     
     <li><Button className='h-full border-none bg-slate-500 rounded-none'  onClick={showModalRegistros}>
     Registro De Clases
     </Button></li>
     



     </ul> 
    
     <Modal title={msgSeleccionar} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  footer={[<Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
          // Puedes agregar más botones si es necesario
        ]}>
     {materiaSeleccionada  && <MatricularEstudiante materiaS={materiaSeleccionada} setReload={setReload}   />}
           
     </Modal>

     <Modal  title={'Desmatricular'} open={isModalOpenInasistencias} onOk={handleOkInasistencias}  onCancel={handleCancelInasistencias} >
     {materiaSeleccionada  && <DesmatricularEstudiante materiaS={materiaSeleccionada} setReload2={setReload2}  />}
      </Modal>

    
    <Modal  title={'Agregar Materia'} open={isModalOpenMaterias} onOk={handleOkMaterias} onCancel={handleCancelMaterias}>
    <AgregarMateria materiaS={materiaSeleccionada} setReload2={setReload2}/>           
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
           
        <ul className='bg-gradient-to-r from-indigo-400 '  >
         
          <li  onClick={() => onSelectMateria(materia._id)} key={materia._id}
           style={{ cursor: 'pointer', margin: '0px 0px'} } className={materia._id===materiaSeleccionada?'font-sans select':''} > { materia.userId === user._id && materia.name}
           </li>
         
            
         
          </ul>
        
        ))}
        
        
      </div>
         
      
        </Sider>

        <Layout style={contentStyle} >

        <Layout className='flex-row  ' style={contentStyle} >

          
        <Content className='border-solid border-2 border-blue-700 w-[24%]'  >
        
          <Typography.Title level={5}>Clases</Typography.Title>   

          
          {materiaSeleccionada && <ClasesAdd cantidadClases={cantidadClases} materiaS={materiaSeleccionada} ausentes={ausentes} estudianteSeleccionado={estudianteSeleccionado}  setClases={setClases} handleAgregarClase={handleAgregarClase} setAnotaciones={setAnotaciones} estudiantesBd={estudiantesBd} anotaciones={anotaciones}/>}
     
          </Content  >
          

      <div className="border-solid border-2 border-blue-700 px-2 rounded-lg shadow-md w-full sm:w-[30%]">
      
      
      <Typography.Title level={5}> 
      </Typography.Title>
      <div>
      {estudiantesBd.map((estudianteBd) => (
        <ul  key={estudianteBd._id}   >
          {materias.map((materia, index) => (
            <li key={index} >
              {materiaSeleccionada === materia._id &&
                materia.estudiantes.map((estudiante, idx) => (
                  <ul key={idx}  >
                    {estudiante === estudianteBd._id  &&(
                      <li
                      onClick={() => onSelectEstudiante(estudianteBd._id)}
                      className={`flex items-center justify-between p-2 cursor-pointer border rounded-lg ${
                        ausentes.includes(estudianteBd._id) ? 'bg-red-400' : 'bg-gradient-to-r from-indigo-400 border-gray-700'
                      }`}
                    >
                        <span className=" text-gray-600 font-sans text-xs mx-2">
                          {estudianteBd.nombre} {estudianteBd.apellido}
                        </span>
                        <ul className="flex flex-row-reverse items-center overflow-x-hidden max-w-[180px] mr-2 ">
  <li className="flex flex-col   ">
    <TextArea
      placeholder="Tomar Nota"
      className="text-xs  rounded-md border border-gray-300 shadow-inner focus:ring focus:ring-blue-200"
      value={anotaciones.find(anotacion => anotacion.student_id === estudianteBd._id)?.anotacion || ''}
      onChange={(e) => handleAnotacionChange(e, estudianteBd._id)}
    /> 
  </li>
  <li className="flex flex-col items-center mr-2">
    
      <input
        type="checkbox"
        onChange={(e) => onChange(e, estudianteBd._id)}
        className="form-checkbox h-4 w-4 accent-red-500 focus:ring focus:ring-red-300"
      />
   
  
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
                      materiaSeleccionada={materiaSeleccionada}
                      setReload3={setReload3}  />
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

      
      
    
     
      <footer style={footerStyle} className='md:col-span-4 bg-slate-300  '>
        <div className="flex  md:flex-row justify-between px-5">
          
        <div className='pt-[5px]'>
        <i><GrLocation className="inline-block mr-1 " style={{height:'40', color:'text-red-500'}} /></i>
          <p className='text-[10px] inline-block text-bolt'>Jose Hernandez 941 - Rincón de los Sauces - Neuquén</p>
          
          
        </div>
        <div className='pt-[5px]'>
          
          <ul className='flex px-2'   >
            
            <li className='pr-2' ><a href="https://wa.me/+5492995866948" target='blank' className="flex items-center"><FaWhatsapp  style={{height:'40',color:'green'}} /><div className='text-[10px] inline-block text-bolt px-1'> 2995866948</div></a></li>
            <li ><a href="mailto:epet024@neuquen.edu.ar" className="flex items-center"><IoMdMail  style={{height:'40',color:'black'}} /><div className='text-[10px] inline-block text-bolt px-1'> epet024@neuquen.edu.ar</div></a></li>
            
            
          </ul>
        </div>
      </div>
      <div className="text-center pb-2 text-xs">
    <p>© {new Date().getFullYear()} EPET 24 RDLS. Todos los derechos reservados.</p>
  </div>


      </footer>  

    </Layout>
   
  )
}
