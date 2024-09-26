import React, { useEffect, useState } from 'react'

import {
  Button,
  Form,
  Input,  
} from 'antd';

export const MateriasPorCurso = ({user}) => {
  const [form] = Form.useForm();
const URL = 'http://localhost:3000/api'
const API_URL = process.env.REACT_APP_API_URL;
const [reload, setReload] = useState(false);

  const  onFinish =  async (data) => {console.log(data);
try {
    const first = await fetch(`${API_URL}/materia`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type':'application/json'
    }
    });
  const newMateria = await first.json();
  console.log(newMateria);
  setReload(true);  
  
  } catch (error) {
    console.error('Error al enviar datos:', error)
  }
} 
useEffect(() => {
  if (reload) {
    alert('Materia Agregada Correctamente')
    window.location.reload();
  }
}, [reload]);

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
  form.setFieldsValue({userId: user._id});
  console.log(user._id)
}, [user]);


useEffect(() => {
    if (reload) {
      
      window.location.reload('/seguimiento'); // Recarga la página si reload es true
    }
  }, [reload]);

  return (

    <>
    <div className='my-5 text-center'>Cargar Materia</div>
  
    <Form
    
    variant="filled"
    style={{
      maxWidth: 500,
    }}

    onFinish={onFinish}
    form={form}
    
    
  >
    <Form.Item name="userId"  hidden
    >
        <Input />
      </Form.Item>    

    <Form.Item
      label="Nombre"
      name="name"
      rules={[
        {
          required: true,
          message: 'Debes Completar!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Curso"
      name="curso"
      rules={[
        {
          required: true,        
          message: 'Debes Completar!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Division"
      name="division"
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
      label="Turno"
      name="turno"
      rules={[
        {
          required: true,
          message: 'Debes Completar!',
        },
      ]}
    >
      <Input />
    </Form.Item>   

    <Form.Item
      label="Dias"
      name="dias"
      rules={[
        {          
          message: 'Por favor Ingresa los dias, que se dicta esta materia',
        },
      ]}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="Horarios"
      name="horarios"
      rules={[
        {
         
          message: 'Por favor Ingresa los horarios de esta materia',
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