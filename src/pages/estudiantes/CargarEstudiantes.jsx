import React, { useEffect, useState } from 'react'


import {
  Button,
  Form,
  Input,
  
  
} from 'antd';

const materiaId=localStorage.getItem('selectedMateriaId')

export const CargarEstudiantes = () => {
  const [form] = Form.useForm();
const URL = 'http://localhost:3000/api'



  const  onFinish =  async (data) => {console.log(data);
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

useEffect(() => {
  form.setFieldsValue({ materiaId: materiaId });
}, []);



  return (

    <>
    <div className='my-5 text-center'>Cargar Estudiantes</div>
  
    <Form
    
    variant="filled"
    style={{
      maxWidth: 500,
    }}

    onFinish={onFinish}
    form={form}
    
    
  >   

    <Form.Item
      label="Apellido"
      name="apellido"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Nombre"
      name="nombre"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>

   

    <Form.Item
      label="DNI"
      name="dni"
      rules={[
        {
          required: true,
          message: 'Por favor Ingrese el Nombre',
        },
      ]}
    >
      <Input/>
    </Form.Item>


     <Form.Item
      label="Observaciones"
      name="observaciones"
      rules={[
        {
         
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>    
    <Form.Item hidden
      label="materiaId"
      name="materiaId"
      
      
    >
      <Input />
    </Form.Item>  

  
    <Form.Item
      wrapperCol={{
        offset: 6,
        span: 16,
      }}
    >
      <Button  htmlType="submit">
        Guardar
      </Button>
    </Form.Item>
  </Form>
   
   
  </>
      
    
    
  )
}
