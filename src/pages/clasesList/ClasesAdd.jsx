import React, { useEffect,useState } from 'react'
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


const URL='http://localhost:3000/api'
export const ClasesAdd = ({ materiaS }) => {

 console.log(materiaS);
 const [reload, setReload] = useState(false);
 const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ materiaId: materiaS });
  }, [materiaS]);
  

  
    const  onFinish =  async (data) => {console.log(data);
      try {
  const first = await fetch(`${URL}/clase`,{
  method: 'POST',
  body: JSON.stringify(data),
  headers:{
    'Content-Type':'application/json'
  }
  });
const newClaseFromDB = await first.json();
console.log(newClaseFromDB);
setReload(true);

} catch (error) {
  console.error('Error al enviar datos:', error)
}
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
      maxWidth: 500,
    }}
    onFinish={onFinish}
    form={form}
    
  >
 <Form.Item name="materiaId"  hidden
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
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <InputNumber
        style={{
          width: '100%',
        }}
      />
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
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Guardar Clase
      </Button>
    </Form.Item>
  </Form>
    
    
    
   
   
  )
}
