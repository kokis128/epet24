import React from 'react'
import { Form, Input, Button  } from 'antd';
export const ClasesAdd = ({updateClase}) => {

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita que la página se recargue al enviar el formulario
        updateClase()
        // Aquí puedes realizar acciones con los datos del formulario, como enviar una solicitud al servidor
      
      };
  return (
   <>
   
   <Form className='clases-add' >
    <div className='w-75'>
    <Form.Item label="clase" name="clases" 
    rules={[{required:true,message:'El nombre de la clase es obligatorio'}]}>
      <Input />
     
    </Form.Item>
    </div>
    
    <Form>

        <Button onClick={ handleSubmit} type='primary' htmlType='submit'>cargar</Button>
       
    </Form>
    </Form>
   
   
   
   </>
  )
}
