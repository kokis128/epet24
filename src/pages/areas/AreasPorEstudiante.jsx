import React, { useEffect, useState } from 'react'


import { useParams } from 'react-router-dom';
import {
  Button,
  Form,
  Input,  
} from 'antd';

export const AreasPorEstudiante = () => {
  const { id} = useParams();
  const estudianteId=id;
  const [form] = Form.useForm();
const URL = 'http://localhost:3000/api'
const [reload, setReload] = useState(false);
const[cursos,setCursos]=useState();

  const  onFinish =  async (data) => {console.log(data);

    const dataWithId = { ...data, estudianteId};
try {
    const first = await fetch(`${URL}/areaEstudinate`,{
    method: 'POST',
    body: JSON.stringify(dataWithId),
    headers:{
      'Content-Type':'application/json'
    }
    });
  const newNota = await first.json();
  console.log(newNota);
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
    fetch('http://localhost:3000/api/areas')
      .then(response=>response.json())
      .then(data => setCursos(data))
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
  form.setFieldsValue({areaId:id});
  
}, []);


useEffect(() => {
    if (reload) {
      
      window.location.reload('/cursos'); // Recarga la página si reload es true
    }
  }, [reload]);

  return (

    <>
    <div className='my-5 text-center'>Cargar Area</div>
  
    <Form
    
    variant="filled"
    style={{
      maxWidth: 500,
    }}

    onFinish={onFinish}
    form={form}   
  >
    <Form.Item name="areaId"  hidden
    >
        <Input />
      </Form.Item>    
      <Form.Item name="estudianteId"  hidden
    >
        <Input />
      </Form.Item>  

   

    

    <Form.Item
      label="informe Cualitativo"
      name="informe"
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
      label="Nota"
      name="nota"
      rules={[
        {          
          message: 'ingresar Nota del Area',
        },
      ]}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="firma"
      name="firma"
      rules={[
        {
         
          message: 'Subir archivo en formato jpg',
        },
      ]}
    >
      <Input/>
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
