import React, { useState } from 'react';
import { Button, Modal } from 'antd';

export const BorrarMateria = ({ materiaS, setReload2, setMateriaSeleccionada, materias }) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const URL = 'http://localhost:3000/api';

  const showModal = () => {
    if (!materiaS) {
      alert('Debes haber seleccionado una materia.');
      return;
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/materia/${materiaS}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Materia borrada exitosamente');
        setIsModalVisible(false);

        const remainingMaterias = materias.filter((materia) => materia._id !== materiaS);
        
        if (remainingMaterias.length > 0) {
          const firstMateriaId = remainingMaterias[0]._id;
          setMateriaSeleccionada(firstMateriaId); // Actualiza la materia seleccionada
          localStorage.setItem('selectedMateriaId', firstMateriaId); // Actualiza el localStorage
        } else {
          setMateriaSeleccionada(null); // No hay más materias
          localStorage.removeItem('selectedMateriaId'); // Limpia el localStorage
        }

        setReload2(true); // Esto permite que la lista de materias se recargue en tu componente principal
        
      } else {
        alert('Hubo un error al borrar la materia');
      }
    } catch (error) {
      console.error('Error al borrar la materia:', error);
      alert('Ocurrió un error al intentar borrar la materia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <Button
        onClick={showModal}
        className='h-full border-none bg-slate-500 rounded-none overflow-hidden'
      >
        Eliminar Materia
      </Button>

      <Modal
        title="Confirmar Eliminación"
        open={isModalVisible}
        onOk={handleDelete}
        confirmLoading={loading}
        onCancel={handleCancel}
        okText="Sí, borrar"
        cancelText="Cancelar"
        okButtonProps={{
          className: 'bg-red-500 hover:bg-red-600 text-white',
        }}
      />
    </div>
  );
};
