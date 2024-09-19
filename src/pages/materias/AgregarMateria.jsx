import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Select
} from 'antd';


export const AgregarMateria = ({materiaS, setReload2}) => {
  const { id } = useParams();
  const cursoId = id;
  const [form] = Form.useForm();
  const URL = 'http://localhost:3000/api';
  const [reload, setReload] = useState(false);
  const { Option } = Select;
const navigate = useNavigate();
  const onFinish = async (data) => {
    console.log(data);
   

    const dataWithId = { ...data, cursoId };
    try {
      const first = await fetch(`${URL}/materia`, {
        method: 'POST',
        body: JSON.stringify(dataWithId),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const newMateria = await first.json();
      console.log(newMateria);
      localStorage.setItem('selectedMateriaId', newMateria._id);
      

      // Informar al componente padre que debe actualizar su estado
      setReload2(true); // Notifica al padre para que actualice la lista de materias
      setReload(true);

    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  }

  useEffect(() => {
    if (reload) {
      alert('Materia Agregada Correctamente');
     
      navigate(0);
    }
  }, [reload]);

  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    form.setFieldsValue({ userId: user._id, cursoId: id });
    console.log(user._id);
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-3xl font-bold text-center mb-8">Cargar Materia</div>

      <Form
        form={form}
        onFinish={onFinish}
        className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto space-y-6"
      >
        <Form.Item name="userId" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Debes Completar!' }]}
        >
          <Input className="border rounded w-full py-2 px-3" />
        </Form.Item>

        <Form.Item
          label="Curso"
          name="curso"
          rules={[{ required: true, message: 'Debes Completar!' },
            { pattern: /^\d+$/, message: 'Solo se permiten cursos de 1 a 6' } 
          ]}
        >
          <Input className="border rounded w-full py-2 px-3" />
        </Form.Item>

        <Form.Item
          label="División"
          name="division"
          rules={[{ required: true, message: 'Debes Completar!' },
            { pattern: /^[a-hA-H]$/, message: 'Solo se permite una División de la A a la H' } 
          ]}
        >
          <Input className="border rounded w-full py-2 px-3"
           onChange={(e) => {
            e.target.value = e.target.value.toUpperCase(); 
          }} />
        </Form.Item>

        <Form.Item
        label="Turno"
        name="turno"
         rules={[{ required: true, message: 'Debes seleccionar un turno!' }]} // Validación requerida
>
        <Select className=" " placeholder="Selecciona un turno">
          <Option value="Mañana">Mañana</Option>
           <Option value="Tarde">Tarde</Option>
          <Option value="Vespertino">Vespertino</Option>
        </Select>
</Form.Item>

        <Form.Item
          label="Días"
          name="dias"
        >
          <Input className="border rounded w-full py-2 px-3" />
        </Form.Item>

        <Form.Item
          label="Horarios"
          name="horarios"
        >
          <Input className="border rounded w-full py-2 px-3" />
        </Form.Item>

        <Form.Item
          label="Observaciones"
          name="observaciones"
        >
          <Input className="border rounded w-full py-2 px-3" />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
