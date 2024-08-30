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
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-200 py-10">
      
      {/* Formulario */}
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg mb-8 md:mb-0 md:mr-8">
        <div className="flex justify-between mb-6">
          {cursoDivisionBdRender.filter(curso => curso._id === id).map((curso, index) => (
            <div key={index} className="text-lg font-semibold text-gray-700">Curso: {curso.curso} {curso.division}</div>
          ))}
        </div>
        <div className="text-3xl font-bold text-center text-gray-800 mb-6">Cargar Estudiantes</div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-6"
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
            <Input className="py-2 px-4 border border-gray-300 rounded-md w-full" />
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
            <Input className="py-2 px-4 border border-gray-300 rounded-md w-full" />
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
            <Input className="py-2 px-4 border border-gray-300 rounded-md w-full" />
          </Form.Item>
  
          <Form.Item
            label="Observaciones"
            name="observaciones"
            className="mb-4"
          >
            <Input className="py-2 px-4 border border-gray-300 rounded-md w-full" />
          </Form.Item>
  
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </div>
  
      {/* Tabla de estudiantes */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="text-2xl font-bold text-center text-gray-800 mb-6">Lista de Estudiantes</div>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-4 border-b">DNI</th>
              <th className="py-3 px-4 border-b">Nombre</th>
              <th className="py-3 px-4 border-b">Apellido</th>
            </tr>
          </thead>
          <tbody>
            {estudiantesBd.filter(estudiante => estudiante.cursoId === cursoId).map((estudiante, index) => (
              <tr key={index} className="text-gray-700 bg-white hover:bg-gray-100 transition-colors duration-200 ease-in-out">
                <td className="py-3 px-4 border-b">{estudiante.dni}</td>
                <td className="py-3 px-4 border-b">{estudiante.nombre}</td>
                <td className="py-3 px-4 border-b">{estudiante.apellido}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  );
};

