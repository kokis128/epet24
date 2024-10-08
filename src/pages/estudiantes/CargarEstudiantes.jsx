import React from 'react';
import { Button, Form, Input } from 'antd';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CursoContext } from '../../CursoContext';

export const CargarEstudiantes = () => {
  const { cursoDivisionBdRender } = useContext(CursoContext);
  const [estudiantesBd, setEstudiantesBd] = useState([]);
  const [reload, setReload] = useState(false);
  const { id } = useParams();
  const cursoId = id;
  const [form] = Form.useForm();
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchEstudiantes = async () => {
    try {
      const response = await fetch(`${API_URL}/estudiantes`);
      const data = await handleResponseEstudiantes(response);
      setEstudiantesBd(data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchEstudiantes(); // Carga la lista de estudiantes al montar el componente
  }, [reload]); // Recarga la lista cada vez que cambia el estado reload

  const handleResponseEstudiantes = (response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };

  const handleError = (error) => {
    console.error('Error fetching data:', error);
  };

  const onFinish = async (data) => {
    const dataWithId = { ...data, cursoId };
    try {
      const response = await fetch(`${API_URL}/estudiante`, {
        method: 'POST',
        body: JSON.stringify(dataWithId),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newEstudiante = await response.json();
      alert(newEstudiante.message);
      setReload((prev) => !prev); // Actualiza el estado para recargar la lista de estudiantes
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  const eliminarEstudiante = async (estudianteId) => {
    try {
      const response = await fetch(`${API_URL}/estudiante/${estudianteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar estudiante');
      }

      const result = await response.json();
      alert(result.message);
      setReload((prev) => !prev); // Recarga la lista de estudiantes
    } catch (error) {
      console.error('Error al eliminar estudiante:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-200 py-10">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg mb-8 md:mb-0 md:mr-8">
          <div className="text-3xl font-bold text-center text-gray-800 mb-6">Cargar Estudiantes</div>
          <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-6">
            {/* Campos del formulario */}
            <Form.Item label="Apellido" name="apellido" rules={[{ required: true, message: 'Por favor ingrese el apellido' }]}>
              <Input className="py-2 px-4 border border-gray-300 rounded-md w-full" />
            </Form.Item>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}>
              <Input className="py-2 px-4 border border-gray-300 rounded-md w-full" />
            </Form.Item>
            <Form.Item label="DNI" name="dni" rules={[{ required: true, message: 'Por favor ingrese el DNI' }]}>
              <Input className="py-2 px-4 border border-gray-300 rounded-md w-full" />
            </Form.Item>
            <Form.Item label="Observaciones" name="observaciones">
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
                <th className="py-3 px-4 border-b">Acciones</th> {/* Nueva columna para acciones */}
              </tr>
            </thead>
            <tbody>
              {estudiantesBd.filter(estudiante => estudiante.cursoId === cursoId).map((estudiante, index) => (
                <tr key={index} className="text-gray-700 bg-white hover:bg-gray-100 transition-colors duration-200 ease-in-out">
                  <td className="py-3 px-4 border-b">{estudiante.dni}</td>
                  <td className="py-3 px-4 border-b">{estudiante.nombre}</td>
                  <td className="py-3 px-4 border-b">{estudiante.apellido}</td>
                  <td className="py-3 px-4 border-b">
                    <Button 
                      type="danger" 
                      onClick={() => eliminarEstudiante(estudiante._id)} 
                      className="bg-red-500 text-white hover:bg-red-600 transition duration-200 ease-in-out"
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
