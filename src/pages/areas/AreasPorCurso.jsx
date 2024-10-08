import React, { useEffect, useState } from 'react';
import { AreasRender } from './AreasRender';
import { useParams } from 'react-router-dom';
import {
  Button,
  Form,
  Input, 
  Collapse 
} from 'antd';
import TextArea from 'antd/es/input/TextArea';

export const AreasPorCurso = () => {
  const { id } = useParams();
  const cursoId = id;
  const [form] = Form.useForm();
  const URL = 'http://localhost:3000/api';
  const [reload, setReload] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [cursos, setCursos] = useState();
  const API_URL = process.env.REACT_APP_API_URL;
  const mostrar = () => {
    setFormVisible(!formVisible);
  };

  const onFinish = async (data) => {
    console.log(data);
    const dataWithId = { ...data, cursoId };
    try {
      const first = await fetch(`${URL}/area`, {
        method: 'POST',
        body: JSON.stringify(dataWithId),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const newArea = await first.json();
      console.log(newArea);
      setReload(true);
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  useEffect(() => {
    if (reload) {
      alert('Área agregada correctamente');
      window.location.reload();
    }
  }, [reload]);

  useEffect(() => {
    fetch(`${API_URL}/cursos`)
      .then(response => response.json())
      .then(data => setCursos(data))
      .then(data => console.log(data));
  }, []);

  useEffect(() => {
    form.setFieldsValue({ cursoId: id });
  }, [cursoId]);

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

  const items = [
    {
      key: '1',
      label: 'Cargar Área',
      className: "z-10",
      children: (
        <div className="bg-blue-200 text-white p-10 border ">  {/* Aplica el color solo al contenido */}
          <Form
            style={{
              maxWidth: 500,
            }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item name="cursoId" hidden>
              <Input />
            </Form.Item>

            <Form.Item
              label="Área"
              name="area"
              rules={[
                {
                  required: true,
                  message: 'Debes Completar!',
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              label="Asignaturas"
              name="materias"
              rules={[
                {
                  required: true,
                  message: 'Debes Completar!',
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 11,
              }}
            >
              <div className='flex gap-2'>
                <Button htmlType="submit">Guardar</Button>
                <Button onClick={mostrar}>
                  Cancelar
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];

  const onChange = (key) => {
    console.log(key);
    
  };

  return (
    <div className="mt-3 relative">
      <AreasRender cursoId={cursoId} setFormVisible={setFormVisible} formVisible={formVisible} cursos={cursos} mostrar={mostrar} items={items}  onChange={onChange} />
    </div>
  );
};

