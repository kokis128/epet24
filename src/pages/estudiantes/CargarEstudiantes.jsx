import React from 'react';
import { Button, Form, Input } from 'antd';
import { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CursoContext } from '../../CursoContext';
export const CargarEstudiantes = () => {
  const { cursoDivisionBdRender, setCursoDivisionBdRender } = useContext(CursoContext);
  const [estudiantesBd, setEstudiantesBd] = useState([]);
  const [reload, setReload] = useState(false);
  const { id} = useParams();
  const cursoId = id;
  const [form] = Form.useForm();
  const URL = 'http://localhost:3000/api';
console.log(id)



useEffect(() => {
  if (reload) {
    
    window.location.reload();
  }
}, [reload]);
  const onFinish = async (data) => {
    const dataWithId = { ...data, cursoId};
  console.log(dataWithId);
    try {
      const first = await fetch(`${URL}/estudiante`, {
        method: 'POST',
        body: JSON.stringify(dataWithId),
        headers: {
          'Content-Type': 'application/json',
        },
        
      });
      const newEstudiante = await first.json();
      alert(newEstudiante.message);
      console.log(newEstudiante);
     
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
    setReload(true);
  };
  
  useEffect(() => {
    fetch('http://localhost:3000/api/estudiantes')
      .then(handleResponseEstudiantes)
      .then(data => setEstudiantesBd(data))
      .catch(handleError);
     console.log(estudiantesBd)
  }, []); 

  const handleResponseEstudiantes = (response) => {
    if (!response) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.error('Error fetching data:', error);
  };
 
console.log({cursoDivisionBdRender});
  return (

    <>
    <div className="flex flex-row items-center justify-center min-h-screen bg-gray-100 py-5">
     
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex flex-row  justify-end ">
      {cursoDivisionBdRender.filter(curso => curso._id === id).map((curso, index) => (
            <div key={index}>Curso: {curso.curso} {curso.division}</div>
          ))}
          </div>
        <div className="text-2xl font-bold text-center mb-5">Cargar Estudiantes</div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            label="Apellido"
            name="apellido"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese el apellido',
              },
            ]}
            className="mb-4"
          >
            <Input className="py-2 px-3 border rounded-md w-full" />
          </Form.Item>         

          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese el nombre',
              },
            ]}
            className="mb-4"
          >
            <Input className="py-2 px-3 border rounded-md w-full" />
          </Form.Item>

          <Form.Item
            label="DNI"
            name="dni"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese el DNI',
              },
            ]}
            className="mb-4"
          >
            <Input className="py-2 px-3 border rounded-md w-full" />
          </Form.Item>

          <Form.Item
            label="Observaciones"
            name="observaciones"
            className="mb-4"
          >
            <Input className="py-2 px-3 border rounded-md w-full" />
          </Form.Item>

          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-10">
      <thead>
      <tr >
        <td className="py-2 px-4 border">Nombre</td>
        <td className="py-2 px-4 border">Apellido</td>
        <td className="py-2 px-4 border">DNI</td>
        </tr>
      </thead>
      <tbody>
          
      {estudiantesBd.filter(estudiante => estudiante.cursoId === cursoId).map((estudiante, index) => 
    
      (
      <tr key={index}>
        <td className="py-2 px-4 border">{estudiante.nombre}</td>
         <td className="py-2 px-4 border">{ estudiante.apellido}</td> 
         <td className="py-2 px-4 border">{estudiante.dni}</td>
         
         </tr>
        ))}</tbody>
    
    </div>
    </div>
    
    </>
  );
};

