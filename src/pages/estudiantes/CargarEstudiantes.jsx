import React from 'react';
import { Button, Form, Input } from 'antd';

export const CargarEstudiantes = () => {
  const [form] = Form.useForm();
  const URL = 'http://localhost:3000/api';

  const onFinish = async (data) => {
    console.log(data);
    try {
      const first = await fetch(`${URL}/estudiante`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newEstudiante = await first.json();
      console.log(newEstudiante);
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-5">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
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
    </div>
  );
};

