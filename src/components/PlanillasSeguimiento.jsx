import React from 'react'
import { Layout, Typography ,Flex } from 'antd';
import { ClasesList } from '../pages/clasesList/ClasesList';
import { ClasesAdd } from '../pages/clasesList/ClasesAdd';
import { useState, useEffect } from 'react';
import '../pages/clasesList/clasesListItem.css'

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

  const selectedMateriaId = localStorage.getItem('selectedMateriaId'); 

  const selectMateriaInicio=()=>{
    if (!selectedMateriaId){
setMateriaSeleccionada(null)
return null;
    } else{ 
      return selectedMateriaId;}
  }

  const [deletedItemId, setDeletedItemId] = useState(null);

  const [materiaSeleccionada, setMateriaSeleccionada] = useState(selectMateriaInicio);
 
  const onSelectMateria = (materiaId) => {
    
 setMateriaSeleccionada(materiaId)

  }
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Layout>
        <Sider width="25%" style={siderStyle}>
        <span>Bienvenido {user.username}</span>         
      
      <div>
        <h3>Materias:</h3>
        
        {materias.map((materia,index) => (
        
           
           <ul  >
         
          <li onClick={() => onSelectMateria(materia._id)} key={materia._id}
           style={{ cursor: 'pointer', margin: '1px 0px' } } className={materia._id===materiaSeleccionada?'select':''} > { materia.userId === user._id && materia.name }
                     
           </li>
         
            
         
          </ul>
        
        ))}
        
      </div>
         
      
        </Sider>

       

        <Content style={contentStyle}>
          <Typography.Title level={1}>Clases</Typography.Title>  
          {materiaSeleccionada && <ClasesAdd materiaS={materiaSeleccionada} />}
     {console.log(materiaSeleccionada)}
      {user._id  && (
        <div>         
         
          <h5>Clases:</h5>
          {
            
            <div >            
         
          {clases.map((clase,index) => (
               
                 
               <ul key={index}>
               
                <li >{ clase.materiaId && clase.materiaId._id === materiaSeleccionada
               
              
                &&(                
                             
                 <ClasesList clases={clase}  />
             
                )
                
            }</li>
          
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
