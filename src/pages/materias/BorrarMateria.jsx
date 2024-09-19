import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';

export const BorrarMateria = ({ materiaS,setReload2,setMateriaSeleccionada,materias }) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reload, setReload]=useState(false);
  const URL = 'http://localhost:3000/api';
  const navigate = useNavigate(); // Para redirigir después de borrar
console.log('materiaS',materiaS);
console.log('materias',materias);

  const showModal = () => {
    if (!materiaS) {
        alert('Debes seleccionar haber una materia Seleccionada.');
        return; // No abrir el modal si no hay materia seleccionada
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
        setReload2(true)
        
        navigate(0); 
        const remainingMaterias = materias.filter((materia) => materia._id !== materiaS);
        if (remainingMaterias.length > 0) {
          const firstMateriaId = remainingMaterias[0]._id;
          setMateriaSeleccionada(firstMateriaId); // Actualiza la materia seleccionada
          localStorage.setItem('selectedMateriaId', firstMateriaId); // Almacena la nueva selección en localStorage
        } else {
          setMateriaSeleccionada(null); // Si no hay más materias, resetea la selección
          localStorage.removeItem('selectedMateriaId'); // Limpia localStorage si no hay más materias
        }
       
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
        className=' h-full border-none bg-slate-500 rounded-none overflow-hidden'
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
      >
       
        
        
      </Modal>
    </div>
  );
};
