import React, { useState } from 'react'

export const CargarEstudiantes = () => {

const URL = 'http://localhost:3000/api'
const [estudiantes,setEstudiantes]=useState();
 const estudiantesMaterias=async()=>{
try {
    const first = await fetch(`${URL}/estudiante`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type':'application/json'
    }
    });
  const newEstudiante = await first.json();
  console.log(newEstudiante);
  
  
  } catch (error) {
    console.error('Error al enviar datos:', error)
  }
}
  




  return (
    <div>CargarEstudiantes</div>
    import {
        Button,
        DatePicker,
        Form,
        Input,
        InputNumber,
        Mentions,
        Select,
        
      } from 'antd';
      const { RangePicker } = DatePicker;
      const formItemLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 6,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 14,
          },
        },
      };
      
      
    
    
  )
}
