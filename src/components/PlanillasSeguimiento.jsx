import React from 'react'
import { Layout, Typography ,Flex,Button, Modal  } from 'antd';
import { ClasesList } from '../pages/clasesList/ClasesList';
import { ClasesAdd } from '../pages/clasesList/ClasesAdd';
import { MatricularEstudiante} from '../pages/estudiantes/MatricularEstudiante';
//import { CargarEstudiantes } from '../pages/estudiantes/CargarEstudiantes';

import { useState, useEffect } from 'react';
import '../pages/clasesList/clasesListItem.css'
import { MdHeight } from 'react-icons/md';

export const PlanillasSeguimiento = () => {
  
  const [materias, setMaterias] = useState([]);
  const [clases, setClases] = useState([]); 
  const [estudiantesBd, setEstudiantesBd] = useState([]); 
  const [idEstudiante, setIdEstudiante] = useState('');
  const [error, setError] = useState(null);
  const [msgSeleccionar, setMsgSeleccionar]=useState('Debes Seleccionar una Materia')

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

  const handleError = (error) => {
    console.error('Error fetching data:', error);
  };
  const selectedMateriaId = localStorage.getItem('selectedMateriaId');
  console.log(selectedMateriaId)
  const [materiaSeleccionada, setMateriaSeleccionada] = useState();
  
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
      .then(data => setMaterias(data))
      .then(data => console.log(data))
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
 if (!selectedMateriaId){ 
 setMsgSeleccionar('Matricular Estudiante');
  }}

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  


  return (
    <Layout style={layoutStyle}>
      <Header className='h-20' style={headerStyle}>
        
        
        <h1 className='text-black text-3xl text-center'>EPET 24</h1>
        <span className='text-left'  >Bienvenido {user.username}</span>
        
        <div className='flex'>
        
        
     
     <Button type="primary" onClick={showModal}>
     Matricular Estudiantes
     </Button>
     <Modal  title={msgSeleccionar} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
     {  materiaSeleccionada &&  <MatricularEstudiante materiaS={materiaSeleccionada} />}
           
     </Modal>
     </div>
     
   
        
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
          {materiaSeleccionada && <ClasesAdd materiaS={materiaSeleccionada}/>}
     
          </Content  >

          <Content className='border-solid border-2 border-blue-700  ' >
          <Typography.Title level={5}>Estudiantes</Typography.Title> 
          

          



          {console.log(estudiantesBd)}
            
          { estudiantesBd.map((estudianteBd)=>(
            <ul key={estudianteBd._id} className='flex-col'>
              {materias.map((materia,index)=>(

                
                            <li key={index}>{materiaSeleccionada === materia._id && materia.estudiantes.map((estudiante,index)=>(
                              <ul key={index} className='flex-col'>
                               {estudiante===estudianteBd._id && <li> { estudianteBd.nombre} { estudianteBd.apellido}</li> }
                               
                               
                               </ul>)
                              
                              )
                               }</li>
                            
                          ))}
              
              
            </ul>
            
          ))}

          

          </Content>

          </Layout >
     
     
    
      {user._id  && (
        <div>         
         
          <h5>Clases:</h5>
          {
            
            <div >            
         
          {clases.map((clase,index) => (
               
                 
               <ul key={index}>
               
                <li >{ clase.materiaId && clase.materiaId._id === materiaSeleccionada
               
              
                &&(   
                  <>            
                  <div >     
                 <ClasesList clases={clase} />
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
