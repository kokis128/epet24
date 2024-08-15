import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {
  Button,
  Form,
  Input,  
} from 'antd';

export const AgregarMateria = () => {
  const { id} = useParams();
  const cursoId=id;
  const [form] = Form.useForm();
const URL = 'http://localhost:3000/api'
const [reload, setReload] = useState(false);

  const  onFinish =  async (data) => {console.log(data);

    const dataWithId = { ...data, cursoId};
try {
    const first = await fetch(`${URL}/materia`,{
    method: 'POST',
    body: JSON.stringify(dataWithId),
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
const user = JSON.parse(localStorage.getItem('user'))
useEffect(() => {
  form.setFieldsValue({userId: user._id,cursoId:id});
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

