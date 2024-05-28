import React, { useEffect,useState } from 'react'
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  
  
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



const URL='http://localhost:3000/api'
export const ClasesAdd = ({ materiaS,ausentes,cantidadClases,anotaciones}) => {

 
 const [reload, setReload] = useState(false);
 const [form] = Form.useForm();


  useEffect(() => {
    
    form.setFieldsValue({ materia_id:materiaS, numero: cantidadClases+1, anotacion:anotaciones });    
   
  }, [materiaS,cantidadClases]);

  
    const  onFinish =  async (data) => {console.log(data);
      try {
  const first = await fetch(`${URL}/clase`,{
  method: 'POST',
  body: JSON.stringify(data),
  headers:{
    'Content-Type':'application/json'}      
  });

const newClaseFromDB = await first.json();
console.log(newClaseFromDB);

const response = await fetch(`${URL}/register_absences`, {

    method: 'POST',
    body: JSON.stringify({ausentes, materia_id:materiaS}),
    headers:{
      'Content-Type':'application/json'} 
});


if (!response.ok) {
  console.log(ausentes)
  console.log(materiaS)
  throw new Error('Error al registrar ausencias');
  
}
const ausenciasData = await response.json();
    if (ausenciasData.success) {
      alert('Ausencias registradas con éxito');
    } else {
      alert('Hubo un error al registrar las ausencias');
    }

    const res = await fetch(`${URL}/register_anotaciones`, {
      method: 'POST',
      body: JSON.stringify({anotaciones,materia_id:materiaS}),
      headers:{
        'Content-Type':'application/json'}
      }  
  
  );

  if (!res.ok) {
    console.log(anotaciones)
    console.log(materiaS)
    throw new Error('Error al registrar anotaciones');
  }


} catch (error) {
  console.error('Error al enviar datos:', error)
}
setReload(true);
}


useEffect(() => {
  if (reload) {
    localStorage.setItem('selectedMateriaId', materiaS);
    window.location.reload(); // Recarga la página si reload es true
  }
}, [reload,materiaS]);


const [fechaActual, setFechaActual] = useState(null); // Inicializa con null
const obtenerFechaActual = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const fecha = `${day}-${month}-${year}`;
  setFechaActual(fecha);
};  

useEffect(() => {
  obtenerFechaActual();
}, []);
  return (

    <Form
    {...formItemLayout}
    variant="filled"
    style={{
      maxWidth: '100%',
      minWidth: '115%',
      
    }}
    onFinish={onFinish}
    form={form}
    initialValues={{ numero: cantidadClases }}
        
 >
 <Form.Item name="materia_id"  hidden
    >
        <Input />
      </Form.Item>
      <Form.Item name="anotacion"  hidden
    >
        <Input />
      </Form.Item>

      <Form.Item name="fecha" label="Fecha" initialValue={fechaActual}>
        <DatePicker />
      </Form.Item>
    

    <Form.Item
      label="Tema"
      name="tema"
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
      label="Unidad"
      name="unidad"
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
      label="Clase N°"
      name="numero"      
      rules={[
        {message: 'Please input!',
        required: true,
        }
      ]}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="Contenidos Trabajados"
      name="contenidos"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input.TextArea />
    </Form.Item>


    <Form.Item
      label="Actividades"
      name="actividades"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input.TextArea />
    </Form.Item>

    <Form.Item
      label="Anotaciones"
      name="anotaciones"
      
            rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Mentions />
    </Form.Item>

    <Form.Item
      label="Observaciones"
      name="observaciones"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input.TextArea />
    </Form.Item>    

    <Form.Item
      wrapperCol={{
        offset: 6,
        span: 5,
      }}
    >
      <Button type="primary" htmlType="submit">
        Guardar Clase
      </Button>
    </Form.Item>
  </Form> 
   
   
  )
}
