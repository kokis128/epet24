import React from 'react'
import { Layout, Typography ,Flex,Button, Modal,Checkbox,Input  } from 'antd';
import { ClasesList } from '../pages/clasesList/ClasesList';
import { ClasesAdd } from '../pages/clasesList/ClasesAdd';
import { MatricularEstudiante} from '../pages/estudiantes/MatricularEstudiante';
//import { CargarEstudiantes } from '../pages/estudiantes/CargarEstudiantes';
import { useState, useEffect } from 'react';
import '../pages/clasesList/clasesListItem.css'
import { MdHeight } from 'react-icons/md';
import { ContarAusencias} from '../pages/estudiantes/ContarAusencias';
import { AgregarMateria} from '../pages/materias/AgregarMateria';
export const PlanillasSeguimiento = () => {

  
  const [materias, setMaterias] = useState([]);
  const [clases, setClases] = useState([]); 
  const [estudiantesBd, setEstudiantesBd] = useState([]); 
 
  const [error, setError] = useState(null);
  const [msgSeleccionar, setMsgSeleccionar]=useState('Debes Seleccionar una Materia')
  const [ausentes, setAusentes] = useState([]);
  const [reload, setReload] = useState(false);
  const [anotaciones, setAnotaciones] = useState([]);

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
  
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(selectedMateriaId);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState('');
  
    const selectMateriaInicio=()=>{
    if (!selectedMateriaId){
setMateriaSeleccionada(null)
return null;
    } else{ 
      return selectedMateriaId;}
  }
  
  
  
  useEffect(() => {
    fetch('http://localhost:3000/api/materias')
      .then(handleResponseMaterias)
      .then(data => {
         // Verifica los datos aquí
        setMaterias(data);
        return data; // Retorna los datos para el siguiente then
      })
      .then(data=>(console.log(data)))    
      .catch(handleError);
  }, [materiaSeleccionada]);


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
    paddingInline: 10,
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
 
 if (!selectedMateriaId){ 
 setMsgSeleccionar('Matricular Estudiante');
  }

}

  const onSelectEstudiante = (estudianteId) => {    
    setEstudianteSeleccionado(estudianteId)
    console.log(estudianteId)
  }   

  const [isModalOpen, setIsModalOpen] = useState(false);  
  const showModal = () => {
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

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleOkInasistencias = () => {
    setIsModalOpenInasistencias(false);
  };
  
  const handleOkMaterias = () => {
    setIsModalOpenMaterias(false);
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


  
   
   

  
  

  const onChange = (e, id) => {
    if (e.target.checked) {
      console.log(e.target.checked)
      setAusentes([...ausentes, id]);
     
    } else {
      setAusentes(ausentes.filter(ausenteId => ausenteId !== id));
  }};

  

  const handleAnotacionChange = (e, estudianteId) => {
    const nuevaAnotacion = { student_id: estudianteId, anotacion: e.target.value };
    setAnotaciones(prevAnotaciones => {
      const index = prevAnotaciones.findIndex(anotacion => anotacion.student_id === estudianteId);
      if (index !== -1) {
        // Actualizar anotación existente
        const updatedAnotaciones = [...prevAnotaciones];
        updatedAnotaciones[index] = nuevaAnotacion;
        return updatedAnotaciones;
      } else {
        // Agregar nueva anotación
        return [...prevAnotaciones, nuevaAnotacion];
      }
    })};

  



  return (
    <Layout style={layoutStyle} className=''>
      <Header className=' overflow-hidden h-full w-full ' style={headerStyle}>        
        
        <h1 className='text-black text-3xl text-center'>EPET 24</h1>
        <span className='text-left'>Bienvenido {user.username}</span>
        
               
    <ul className='flex bg-slate-500  ' >
    <li><Button className=' h-full border-none bg-slate-500 rounded-none overflow-hidden'   onClick={showModalMaterias}>
     Agregar Materia
     </Button ></li>

     <li><Button className=' h-full border-none bg-slate-500 rounded-none overflow-hidden '  onClick={showModal}>
     Matricular Estudiantes
     </Button></li>

     <li><Button className='border-none bg-slate-500 rounded-none   '  onClick={showModalInasistencias}>
     Ver inasistencias
     </Button></li>
     </ul> 
    
     <Modal  title={msgSeleccionar} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
     {materiaSeleccionada &&  <MatricularEstudiante materiaS={materiaSeleccionada} />}
           
     </Modal>

     <Modal  title={'inasistencias'} open={isModalOpenInasistencias} onOk={handleOkInasistencias} onCancel={handleCancelInasistencias}>
     {materiaSeleccionada && <ContarAusencias materiaS={materiaSeleccionada} />}
      </Modal>

    
    <Modal  title={'Agregar Materia'} open={isModalOpenMaterias} onOk={handleOkMaterias} onCancel={handleCancelMaterias}>
    <AgregarMateria user={user}/>           
     </Modal>     
        
        </Header>
       
      <Layout>
        <Sider width="25%" style={siderStyle}>
                
      
      <div>                         
                
        <h3>Materias:</h3>       
        
        {materias.map((materia,index) => (        
           
        <ul  >
         
          <li  onClick={() => onSelectMateria(materia._id)} key={materia._id}
           style={{ cursor: 'pointer', margin: '1px 0px' } } className={materia._id===materiaSeleccionada?'select':''} > { materia.userId === user._id && materia.name }
                
           </li>
         
            
         
          </ul>
        
        ))}
        
        
      </div>
         
      
        </Sider>

        <Layout style={contentStyle} >

        <Layout className='flex-row ' style={contentStyle} >

          
        <Content className='border-solid border-2 border-blue-700 w-[20%]'  >
        
          <Typography.Title level={5}>Clases</Typography.Title>   

          
          {materiaSeleccionada && <ClasesAdd cantidadClases={cantidadClases} materiaS={materiaSeleccionada} ausentes={ausentes} estudianteSeleccionado={estudianteSeleccionado} anotaciones={anotaciones}/>}
     
          </Content  >
          

          <div className="border-solid border-2 border-blue-700 p-4 rounded-lg shadow-md">
      
      
      <Typography.Title level={5}>
        Estudiantes
      </Typography.Title>
      {estudiantesBd.map((estudianteBd) => (
        <ul key={estudianteBd._id}  >
          {materias.map((materia, index) => (
            <li key={index} className="mb-2 ">
              {materiaSeleccionada === materia._id &&
                materia.estudiantes.map((estudiante, idx) => (
                  <ul key={idx} >
                    {estudiante === estudianteBd._id && (
                      <li
                        onClick={() => onSelectEstudiante(estudianteBd._id)}
                        className={`flex items-center justify-between p-2 cursor-pointer border rounded-lg ${
                          estudianteBd._id === estudianteSeleccionado ? 'bg-blue-300 border-blue-800' : 'bg-blue-200 border-gray-700'
                        }`}
                      >
                        <span className="font-medium text-gray-700">
                          {estudianteBd.nombre} {estudianteBd.apellido}
                        </span>
                        <ul className='flex flex-row-reverse overflow-x-hidden'>
                        <li><Input
                            placeholder="Anotación"
                            className="ml-4"
                            value={anotaciones.find(anotacion => anotacion.student_id === estudianteBd._id)?.anotacion || ''}
                            onChange={(e) => handleAnotacionChange(e, estudianteBd._id)}
                            
                          
                          /></li>
                        
                       <li> <Checkbox onChange={(e) => onChange(e, estudianteBd._id)} className="pl-5"></Checkbox></li>
                       
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
                      decrementarCantidad={decrementarCantidad} />
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
