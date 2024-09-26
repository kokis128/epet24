import React, { useEffect, useState,useContext } from 'react';
import { Select, Space, Button, Input } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import {MateriasPorCurso} from '../materias/MateriasPorCurso'
import {AreasPorCurso} from '../areas/AreasPorCurso'
import { CursoContext } from '../../CursoContext';

export const Cursos = () => {
    const { cursoDivisionBdRender,setCursoDivisionBdRender} = useContext(CursoContext);
    const [curso, setCurso] = useState(1);
    const [division, setDivision] = useState('A');    
    const [observaciones, setObservaciones] = useState('');
    const [estudiantesPorcursoId, setEstudiantesCursoId] = useState('');
    const [materiaPorCursoId,setMateriaPorCursoId]=useState('');
    const [areaPorCursoId,setAreaPorCursoId]=useState('');
    const [error, setError] = useState(null);
    const [turno, setTurno] = useState('');
    const [objetivos, setObjetivos] = useState('');
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    // Fetch inicial de cursos cuando el componente se monta
    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await fetch(`${API_URL}/cursos`);
                const data = await response.json();
                setCursoDivisionBdRender(data);
            } catch (error) {
                console.error('Error fetching cursos:', error);
            }
        };
        fetchCursos();
    }, []);

    const crearCrusoDivision = () => {
        const existe = cursoDivisionBdRender.some(cd => cd.curso === curso && cd.division === division);
        if (existe) {
            alert(`El curso ${curso} con la división ${division} ya existe.`);
        } else {
            const newCurso = { curso, division, turno, objetivos };
            const URL = 'http://localhost:3000/api';

            fetch(`${API_URL}/curso`, {
                method: 'POST',
                body: JSON.stringify(newCurso),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(` ${data.message} ${data.curso.curso} ${data.curso.division}`);
                    setCursoDivisionBdRender(prevState => [...prevState, data.curso]);
                    
                } else {
                    console.error('Error al crear el curso:', data.message);
                   
                }
              
            })
            .catch(error => {
                console.error('Algo falló al agregar el curso:', error);
                setError(error.message);
            });
        }
    };
    const handleChangeCurso = (value) => {
        console.log(`selected ${value}`);
        setCurso(value);
    };

    const handleChangeDivision = (value) => {
        console.log(`selected ${value}`);
        setDivision(value);
    };
    const handleChangeTurno = (value) => {
        console.log(`selected ${value}`);
        setTurno(value);
    };

    const handleChangeObjetivos = (e) => {
        console.log(`selected ${e.target.value}`);
        setObjetivos(e.target.value);
    };

    const onSelectEstudiantesPorcursoId = (id)=>{
        setEstudiantesCursoId(id);
        console.log(id);
       
        navigate(`/estudiantesPorCurso/${id}`);
    };

    const onSelectMateriaPorCursoId=(id)=>{
        setMateriaPorCursoId(id);
        navigate(`/materiasPorCurso/${id}`);
    }
    const onSelectAreaPorCursoId=(id)=>{
        setAreaPorCursoId(id);
        navigate(`/areasPorCurso/${id}`);
    }

    return (
       
            <div className='flex gap-4 flex-wrap mt-10'>
                <div>
                    <Space wrap>
                        <Select
                            defaultValue="Año"
                            style={{ width: 120 }}
                            onChange={handleChangeCurso}
                            options={[
                                { value: '1', label: 'Primer' },
                                { value: '2', label: 'Segundo' },
                                { value: '3', label: 'Tercer' },
                                { value: '4', label: 'Cuarto' },
                                { value: '5', label: 'Quinto' },
                                { value: '6', label: 'Sexto' },
                            ]}
                        />
                        <Select
                            defaultValue="División"
                            style={{ width: 120 }}
                            onChange={handleChangeDivision}
                            options={[
                                { value: 'A', label: 'A' },
                                { value: 'B', label: 'B' },
                                { value: 'C', label: 'C' },
                                { value: 'D', label: 'D' },
                                { value: 'E', label: 'E' },
                                { value: 'F', label: 'F' },
                            ]}
                            
                        />
                        <Select
                            defaultValue="Turno"
                            style={{ width: 120 }}
                            onChange={handleChangeTurno}
                            options={[
                                { value: 'Mañana', label: 'Mañana' },
                                { value: 'Tarde', label: 'Tarde' },
                                { value: 'Vespertino', label: 'Vespertino' },
                                
                            ]}
                        />

                        
                       
                        <Input type="text" placeholder='Objetivos a evaluar por áreas' onChange={handleChangeObjetivos} />
                        <Button type="primary" className='bg-blue-500' onClick={crearCrusoDivision}>Crear Curso</Button>
                    </Space>
                </div>
                <ul className='flex flex-wrap items-center gap-1 '>
                    {cursoDivisionBdRender.map((item, index) => (
                        <> 
                    <div key={item._id}  className='flex flex-col border-2 border-black'>
                        <li key={index}  className=' bg-blue-300   p-3  hover:bg-blue-100 cursor-pointer'>
                            {item.curso} {item.division} - {item.turno}
                            
                        </li>
                        

                        
                        <li>
                        <Button onClick={() => onSelectEstudiantesPorcursoId(item._id)} className='mb-2 text-[8px] mb-0 rounded-none  bg-green-300 border-none  hover:bg-blue-100 cursor-pointer' >Estudiantes</Button>
                        <Button onClick={() => onSelectMateriaPorCursoId(item._id)} className='mb-2 text-[8px] py-0 mb-0 rounded-none bg-red-300 border-none    hover:bg-blue-100 cursor-pointer' >Materias</Button>
                        <Button onClick={()=> onSelectAreaPorCursoId(item._id)}  className='mb-2 text-[8px] py-0 mb-0 rounded-none grow border-none bg-yellow-300 border    hover:bg-blue-100 cursor-pointer' >Areas</Button>

                        </li>
                        </div>
                       
                        </>
                    ))}
                </ul>
            </div>
        
    );
}

