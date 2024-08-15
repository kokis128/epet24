import React, { useEffect, useState } from 'react'
import { AreasPorEstudiante } from './AreasPorEstudiante';
import { AreasRender } from './AreasRender';

import { useParams } from 'react-router-dom';
import {
  Button,
  Form,
  Input,  
} from 'antd';

export const AreasPorCurso = () => {
  const { id} = useParams();
  const cursoId=id;
  const [form] = Form.useForm();
const URL = 'http://localhost:3000/api'
const [reload, setReload] = useState(false);
const [mostrarForm, setMostrarForm] = useState(false);
const [mostrarData, setMostrarData] = useState(false);
const[cursos,setCursos]=useState();

const mostrar = () =>{
  
  if (!mostrarForm){    
    setMostrarForm(true);
  }else{
    console.log(mostrarForm);
    setMostrarForm(false);
  }

} ;


  const  onFinish =  async (data) => {console.log(data);

    const dataWithId = { ...data, cursoId};
try {
    const first = await fetch(`${URL}/area`,{
    method: 'POST',
    body: JSON.stringify(dataWithId),
    headers:{
      'Content-Type':'application/json'
    }
    });
  const newArea = await first.json();
  console.log(newArea);
  setReload(true);  
  
  } catch (error) {
    console.error('Error al enviar datos:', error)
  }
} 
useEffect(() => {
  if (reload) {
    alert('Area Agregada Correctamente')
    window.location.reload();
  }
}, [reload]);

useEffect(() => {
    fetch('http://localhost:3000/api/cursos')
      .then(response=>response.json())
      .then(data => setCursos({data}))
      .then(data=>console.log(data))      
     
  }, []); 
  
  console.log(cursos)

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
  form.setFieldsValue({cursoId:id});
  
}, [cursoId]);


useEffect(() => {
    if (reload) {
      
      window.location.reload('/cursos'); // Recarga la página si reload es true
    }
  }, [reload]);
 
  return (

    <>
    <Button onClick={mostrar} className='my-5 text-center mr-2'>Cargar Area</Button>
   
  
    <Form
    
    variant="filled"
    style={{
      maxWidth: 500,
    }}

    onFinish={onFinish}
    form={form}   
  className={mostrarForm?'visible':'hidden'}>
    <Form.Item name="cursoId"  hidden
    >
        <Input />
      </Form.Item>  
       

    <Form.Item
      label="Area"
      name="area"
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
      label="Asignaturas"
      name="materias"
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
      label="Informe Descripcion"
      name="informeDescripcion"
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
      wrapperCol={{
        offset: 6,
        span: 16,
      }}
    >
      <Button  htmlType="submit">
        Guardar
      </Button>
      <Button onClick={mostrar} className='my-5 text-center mx-2'>
        Cancelar
      </Button>
    </Form.Item>
  </Form>

 <AreasRender cursoId={cursoId}/>   
  </> 
    
    
  )
}
