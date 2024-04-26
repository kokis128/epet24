import React from 'react'
import { Layout, Typography ,Flex } from 'antd';
import { ClasesList } from '../pages/clasesList/ClasesList';
import { ClasesAdd } from '../pages/clasesList/ClasesAdd';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PlanillasSeguimiento = () => {
  
  const [materias, setMaterias] = useState([]);
  const [clases, setClases] = useState([]);



 

  const handleResponseclases = (response) => {
    if (!response) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };


  // Define una función para manejar errores de la solicitud fetch
  const handleErrorc = (error) => {
    console.error('Error fetching data:', error);
  };


  
  const handleResponseMaterias = (response) => {
    if (!response) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };

  const handleError = (error) => {
    console.error('Error fetching data:', error);
  };


  useEffect(() => {
    fetch('http://localhost:3000/api/materias')
      .then(handleResponseMaterias)
      .then(data => setMaterias(data))
      .then(data => console.log(data))
      .catch(handleError);
  }, []);


  useEffect(() => {
    fetch('http://localhost:3000/api/clases')
      .then(handleResponseclases)
      .then(data => setClases(data))
      .catch(handleErrorc);
  }, []);

 
 
  




  const { Header, Footer, Sider, Content } = Layout;
const user = JSON.parse(localStorage.getItem('user'))
 
  const headerStyle = {
    textAlign: 'center',
    color: '#fff',    
    paddingInline: 5,
    lineHeight: '120px',
    backgroundColor: '#4096ff',
  };
  const contentStyle = {
    textAlign: 'center',
    minHeight:120,
    lineHeight: '90px',
    color: '#fff',
    backgroundColor: '#0958d9',
  };
  const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#1677ff',
  };
  const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
  };
  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    maxHeight:'100%',
  };

 
  
    
  const primeraMateria=null;

  

  

  const [materiaSeleccionada, setMateriaSeleccionada] = useState();

  const onSelectMateria = (materiaId) => {
    setMateriaSeleccionada(materiaId);


  }

  useEffect(() => {
    // Verificar si hay materias y clases disponibles
    if (materias.length > 0 && clases.length > 0) {
      let primeraMateria = null;
      // Iterar sobre las materias
      for (let i = 0; i < materias.length; i++) {
        const materia = materias[i];
        // Iterar sobre las clases
        for (let j = 0; j < clases.length; j++) {
          const clase = clases[j];
          // Verificar si hay una coincidencia entre materia._id y clase.materiaId._id
          if (clase.materiaId && materia._id === clase.materiaId._id) {
            primeraMateria = materia._id;
            break; // Salir del bucle interior si se encuentra una coincidencia
          }
        }
        // Salir del bucle exterior si se encontró la primera materia
        if (primeraMateria) {
          break;
        }
      }
      // Establecer la primera materia encontrada como materia seleccionada
      setMateriaSeleccionada(primeraMateria);
    }
  }, [materias, clases]);
  
 
  
  


  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Layout>
        <Sider width="25%" style={siderStyle}>
        <span>Bienvenido {user.username}</span>         
      
      <div>
        <h3>Materias:</h3>
        
        {materias.map((materia,index) => (
           
          <ul className='border-first' >
         
          <li  key={materia._id}  onClick={() => onSelectMateria(materia._id)} > {materia.userId === user._id && materia.name }</li>
         
            
         
          </ul>
        ))}
        
      </div>
         
      
        </Sider>

       

        <Content style={contentStyle}>
          <Typography.Title level={1}>Clases</Typography.Title>
          <ClasesAdd materiaS={materiaSeleccionada}/>         
     
     
     
      {user._id  && (
        <div>


          
         
          <h5>Clases:</h5>
          {
            
            <div >   



               {materias.map((materia,index) => (
           
          <ul >
         
          
         
          {clases.map((clase,index) => (
               
                 
               <ul>
               
                <li>{clase.materiaId && clase.materiaId._id === materiaSeleccionada && clase.materiaId._id===materia._id 
                
              
                &&(                
                             
                 <ClasesList clases={clase}/>
             
                )
                
            }</li>
          
              </ul>
             
            ))}
         
          </ul>
        ))}  
              
              
            </div>
         }
        </div>
        
      )}

 
    
         

       
          
          
         
        

      
        

        


        
        
          
          
         
    
          
          

       
          
          
         
        


        
          </Content>
      </Layout>
      
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
   
  )
}
