import React, { useEffect, useState } from 'react';
import { Button, Input, message, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { formatInTimeZone } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import { addDays, format } from 'date-fns';

const timeZone = 'America/Argentina/Buenos_Aires';

export const ModificarAnotacion = ({ materiaS, clases, selectedClase }) => {
    const URL = 'http://localhost:3000/api';
    const API_URL = process.env.REACT_APP_API_URL;

    const [anotacionEditando, setAnotacionEditando] = useState('');
    const [idAnotacionEditando, setIdAnotacionEditando] = useState(null);
    const [anotaciones, setAnotaciones] = useState([]);
    const [materiaEstudiantes, setMateriaEstudiantes] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null); // Nueva variable de estado

    // Fetch anotaciones y estudiantes al cargar
    useEffect(() => {
        const fetchAnotaciones = async () => {
            try {
                const response = await fetch(`${API_URL}/planillas/${materiaS}`);
                const data = await response.json();
                setAnotaciones(data.anotaciones);
                setMateriaEstudiantes(data);
            } catch (error) {
                console.error('Error fetching anotaciones:', error);
            }
        };
        fetchAnotaciones();
    }, [materiaS]);

    // Formatear fechas
    const formatDateToCompare = (fecha) => {
        if (!fecha) return null;
        try {
            const date = new Date(fecha);
            return format(date, 'yyyy-MM-dd');
        } catch (error) {
            console.error('Error al formatear la fecha:', error);
            return null;
        }
    };

    const formatDate = (fecha) => {
        if (!fecha) return null;
        try {
            return formatInTimeZone(fecha, timeZone, 'dd/MM/yyyy', { locale: es });
        } catch (error) {
            console.error('Error al formatear la fecha:', error);
            return null;
        }
    };

    // Abrir modal para editar anotación
    const handleEditAnotacion = (anotacion) => {
        setAnotacionEditando(anotacion.anotacion);
        setIdAnotacionEditando(anotacion._id);
        setEstudianteSeleccionado(null); // No seleccionamos estudiante ya que es edición
        setIsModalOpen(true);
    };

    // Abrir modal para agregar nueva anotación
    const handleAgregarAnotacion = (estudiante) => {
        setAnotacionEditando(''); // Iniciar con una anotación vacía
        setEstudianteSeleccionado(estudiante); // Guardar el estudiante actual
        setIdAnotacionEditando(null); // No es una edición, es una nueva anotación
        setIsModalOpen(true); // Abrir el modal
    };

    // Guardar anotación (nueva o editada)
    const handleSaveAnotacion = async () => {
        
    
        if (!idAnotacionEditando) {
            // Crear nueva anotación (POST)
            const nuevaAnotacion = {
                anotaciones: [{ student_id: estudianteSeleccionado._id, anotacion: anotacionEditando }],
                fecha: format(addDays(selectedClase.fecha,1), 'yyyy-MM-dd'),
                materia_id: materiaS
            };
    
            try {
                const response = await fetch(`${URL}/register_anotaciones`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevaAnotacion),
                });
    
                if (response.ok) {
                    const nuevaAnotacionGuardada = await response.json();
    
                    // Verificamos que la respuesta sea un array
                    if (Array.isArray(nuevaAnotacionGuardada)) {
                        // Usamos concat para agregar la nueva anotación a las existentes
                        setAnotaciones(anotaciones.concat(nuevaAnotacionGuardada));
    
                        message.success('Nota agregada con éxito');
                        setIsModalOpen(false);
                        setAnotacionEditando('');
                        setEstudianteSeleccionado(null);
                    } else {
                        message.error('Formato de respuesta inesperado');
                    }
                } else {
                    message.error('Error al agregar la anotación');
                }
            } catch (error) {
                console.error('Error creating anotacion:', error);
                message.error('Error al agregar la anotación');
            }
        } else {
            // Editar anotación existente (PUT)
            try {
                const response = await fetch(`${URL}/update_anotaciones/${idAnotacionEditando}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ anotacion: anotacionEditando }),
                });
    
                if (response.ok) {
                    const updatedAnotaciones = anotaciones.map(anotacion =>
                        anotacion._id === idAnotacionEditando
                            ? { ...anotacion, anotacion: anotacionEditando }
                            : anotacion
                    );
                    setAnotaciones(updatedAnotaciones);
    
                    message.success('Nota modificada con éxito');
                    setIsModalOpen(false);
                    setAnotacionEditando('');
                    setIdAnotacionEditando(null);
                } else {
                    message.error('Error al modificar la anotación');
                }
            } catch (error) {
                console.error('Error modifying anotacion:', error);
                message.error('Error al modificar la anotación');
            }
        }
    };
    




    return (
        <div>
            <div className="flex flex-col text-xs mb-4">
                <span>Materia: {selectedClase.materiaId.name}</span>
                <span>Clase N°{selectedClase.numero}</span>
                <span>Fecha: {formatDate(addDays(selectedClase.fecha, 1))}</span>
                <span>Tema: {selectedClase.tema}</span>
                <span>Se Evaluó: {selectedClase.registro}</span>
            </div>

            <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Apellido</th>
                        <th className="border px-4 py-2">Nota Clase</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {materiaEstudiantes?.materia?.estudiantes?.map((estudiante) => {
                        // Buscamos la anotación del estudiante (si existe)
                        const anotacion = anotaciones.find(
                            (anotacion) =>
                                materiaEstudiantes?.materia?._id === materiaS &&
                                formatDateToCompare(selectedClase.fecha) === formatDateToCompare(anotacion.fecha) &&
                                estudiante?._id === anotacion?.student_id
                        );

                        return (
                            <tr key={estudiante._id} className="bg-white hover:bg-gray-50">
                                <td className="border px-2 py-2">{estudiante.nombre}</td>
                                <td className="border px-2 py-2">{estudiante.apellido}</td>
                                <td className="border px-2 py-2 w-full">
                                    {anotacion ? anotacion?.anotacion : "Sin anotación"}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    {anotacion ? (
                                        <Button
                                            onClick={() => handleEditAnotacion(anotacion)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                        >
                                            Modificar Nota
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => handleAgregarAnotacion(estudiante)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                        >
                                            Agregar Nota
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Modal
                title="Modificar Anotación"
                open={isModalOpen}
                onOk={handleSaveAnotacion}
                onCancel={() => setIsModalOpen(false)}
                okText="Guardar"
                cancelText="Cancelar"
            >
                <TextArea
                    rows={4}
                    value={anotacionEditando}
                    onChange={(e) => setAnotacionEditando(e.target.value)}
                />
            </Modal>
        </div>
    );
};

