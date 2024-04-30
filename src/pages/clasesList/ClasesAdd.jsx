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

 const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ materiaId: materiaS });
  }, [materiaS]);
  

  
    const  onFinish =  async (data) => {console.log(data);
   
  const first = await fetch(`${URL}/clase`,{
  method: 'POST',
  body: JSON.stringify(data),
  headers:{
    'Content-Type':'application/json'
  }
  }
  );
const newClaseFromDB = await first.json();
console.log(newClaseFromDB);


  

  


}


  return (
    
    <Form
    {...formItemLayout}
    variant="filled"
    style={{
      maxWidth: 600,
    }}
    onFinish={onFinish}
    form={form}
    
  >
 <Form.Item name="materiaId"  hidden
    >
        <Input />
      </Form.Item>



    <Form.Item
      label="Fecha"
      name="fecha"
      rules={[
        {
          
          message: 'Please input!',
        },
      ]}
    >

      
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
