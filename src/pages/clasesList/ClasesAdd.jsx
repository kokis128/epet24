import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Mentions,
  ConfigProvider,
  Select,
} from 'antd';
import esES from 'antd/es/locale/es_ES';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const URL = 'http://localhost:3000/api';

export const ClasesAdd = ({ materiaS, ausentes, cantidadClases, anotaciones,clases, setClases, handleAgregarClase }) => {
  const [reload, setReload] = useState(false);
  const [fechaActual, setFechaActual] = useState(new Date());
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      materiaId: materiaS,
      numero: cantidadClases + 1,
      anotacion: anotaciones,
      fecha: fechaActual,
    });
  }, [materiaS, cantidadClases, anotaciones, fechaActual, form]);

  const actividadesPredefinidas = [
    'TP',
    'T. Clase',
    'Particip.',
    'Eval.',
    'Nota',
    'Calif. Final'
  ];
  

  const onFinish = async (data) => {

    const selectedDate = data.fecha ? format(data.fecha,'yyyy-MM-dd') : format(fechaActual,'yyyy-MM-dd');
    data.fecha = selectedDate;
    console.log('Data being sent:', data);

    const claseAgregada = handleAgregarClase(data);
    if (!claseAgregada) {
      return; // Detener la ejecución si la clase no se agregó
    }   
    try {     
      
    const first =  await fetch(`${URL}/clase`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      const newClaseFromDB = await first.json();
      console.log('Clase saved:', newClaseFromDB);

      const response = await fetch(`${URL}/register_absences`, {
        method: 'POST',
        body: JSON.stringify({ ausentes, materia_id: materiaS }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        console.log(ausentes);
        console.log(materiaS);
        throw new Error('Error al registrar ausencias');
      }
      const ausenciasData = await response.json();
      if (ausenciasData.success) {
        alert('Ausencias registradas con éxito');
      } else {
        alert('Hubo un error al registrar las ausencias');
      }

      const anotacionesPayload = { anotaciones, fecha: selectedDate, materia_id: materiaS };
      console.log('Anotaciones payload:', anotacionesPayload);

      const res = await fetch(`${URL}/register_anotaciones`, {
        method: 'POST',
        body: JSON.stringify(anotacionesPayload),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Anotaciones:', ...anotaciones);
      console.log('Materia ID:', materiaS);

      if (!res.ok) {
        console.log(anotaciones);
        console.log(materiaS);
        throw new Error('Error al registrar anotaciones');
      }
    } catch (error) {
      console.log(anotaciones);
      console.log(materiaS);
      console.error('Error al enviar datos:', error);
    }
    setReload(true);
  };

  useEffect(() => {
    if (reload) {
      localStorage.setItem('selectedMateriaId', materiaS);
      window.location.reload();
    }
  }, [reload, materiaS]);


  return (
    <ConfigProvider locale={esES}>
      <div className="flex justify-center">
        <Form
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
          initialValues={{ numero: cantidadClases + 1, fecha: fechaActual, materiaId: materiaS }}
          className=" w-full"
        >
          <Form.Item name="materiaId" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="anotacion" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="fecha"
            label="Fecha"
            rules={[{ required: true, message: 'Debes Completar!' }]}
            className="mb-3"
          >
            <DatePicker
              selected={fechaActual}
              onChange={(date) => {
                setFechaActual(date);
                form.setFieldsValue({ fecha: date });
              }}
              dateFormat="dd/MM/yyyy"
              className="w-full border rounded p-2"
              locale={es}
            />
          </Form.Item>

          <Form.Item
            label="Tema"
            name="tema"
            rules={[{ required: true, message: 'Debes Completar!' }]}
            className=" mb-3"
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            label="Unidad"
            name="unidad"
            rules={[{ required: true, message: 'Debes Completar!' }]}
            className=" mb-3"
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            label="Clase N°"
            name="numero"
            rules={[{ required: true, message: 'Debes Completar!' }]}
            className=" mb-3"
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            label="Contenidos Trabajados"
            name="contenidos"
            rules={[{ required: true, message: 'Debes Completar!' }]}
            className=" mb-3"
          >
            <Input.TextArea className="w-full" />
          </Form.Item>

          <Form.Item
            label="Calif Clase."
            name="registro"
            rules={[{ required: true, message: 'Debes Completar!' }]}
            className="mb-3"
          >
            <Select
              mode="simple"
              className="w-full"
              placeholder="Selecciona actividades"
            >
              {actividadesPredefinidas.map((actividad) => (
                <Select.Option key={actividad} value={actividad}>
                  {actividad}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Actividades"
            name="actividades"
            rules={[{ required: true, message: 'Debes Completar!' }]}
            className=" mb-3"
          >
            <Mentions className="w-full" />
          </Form.Item>

          <Form.Item
            label="Observaciones"
            name="observaciones"
            rules={[{ required: true, message: 'Debes completar este campo!' }]}
            className=" mb-3"
          >
            <Input.TextArea className="w-full" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 5 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Guardar Clase
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};