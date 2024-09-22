import React, { useEffect, useState, useRef, useContext } from 'react';
import { CursoContext } from '../../CursoContext';
import { useReactToPrint } from 'react-to-print';
import { Button, Modal } from 'antd';
import './tailwind.css';
import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import { addDays } from 'date-fns';
import { useParams } from 'react-router-dom';
import './tailwind.css';


const timeZone = 'America/Argentina/Buenos_Aires';

export const AreasPrint = ({ setOpen, open, areas, estudiantes, informesGuardados,periodo }) => {
  const { id } = useParams();
  const componentRef = useRef();
  const { cursoDivisionBdRender } = useContext(CursoContext);
  const [cursoActual, setCursoActual] = useState(null);

  

  useEffect(() => {
    const cursoBuscar = cursoDivisionBdRender.find(curso => curso._id === id);
    
    console.log('Cursos disponibles:', cursoDivisionBdRender.map(curso => curso._id));
    console.log('Curso encontrado:', cursoBuscar);

    if (cursoBuscar) {
      setCursoActual(cursoBuscar); // Only set if cursoBuscar is not undefined
    }
   
  }, [cursoDivisionBdRender, id]);


  
 
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setOpen(false),
  });

  const formatDate = (fecha) => {
    if (!fecha) return null;
    try {
      const date = addDays(parseISO(fecha), 1);
      return formatInTimeZone(date, timeZone, 'dd/MM/yyyy', { locale: es });
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return null;
    }
  };

  return (
    
      <Modal
        title="Imprimir Informes"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1122}
        footer={null}
       
      
      >
      




        <div ref={componentRef} className="print-container  mt-4 ">
{console.log('estudiantes',estudiantes)}
        {estudiantes.map((estudiante,index)=>(
          <div key={index}>
          {/* Header del informe */}
          <div className='ml-5'>
          <div className="flex justify-around ml-4  items-center  gap-2 ">
            <span className="text-sm underline">INFORME DE PROCESO - Ciclo Basico Comun (e Interciclo)</span>
            
            <span className="font-mono  ">PROVINCIA DE NEUQUEN-CONSEJO PROVINCIAL DE EDUCACION</span>
            <span className="font-medium text-[9px] ">{formatDate(new Date().toISOString())}</span>
          </div >
          <div className="flex gap-3 items-center  font-bold ">
            <span className='text-[7px] font-mono leading-tight ' >Establecimiento <br /> Educativo</span>
            <div className='text-sm  font-mono'>ESCUELA PROVINCIAL DE ENSEÑANZA TÉCNICA 24</div>
            <div className='text-sm  font-mono'>{periodo}</div>
           
          </div>
          <div className=' font-mono  gap-2'>
            <span className='font-bold text-xs'>Apellido y Nombres: </span>

            <span className=' font-mono text-sm' >{estudiante.apellido} {estudiante.nombre}</span>
            <span className='font-bold text-xs'>  DNI: </span>
            <span className=' font-mono text-sm' >{estudiante.dni}</span>
            
            <span className=' font-mono text-xs font-bold ' >  Curso: </span> <span className=' font-mono text-sm ' >{cursoActual?.curso} </span>  <span className=' font-mono text-xs font-bold  ' >División:</span> <span className='font-bold text-sm '> {cursoActual?.division}</span> <span className='font-bold text-xs '> Turno:</span> <span className='font-bold text-sm '> {cursoActual?.turno} </span>
          </div>
          </div>
          
          {/* Tabla de áreas, materias e informes */}
          <table className="mt-4  mx-auto border-collapse border border-gray-400">
          <thead>
  <tr className="border border-gray-400">
    <th className="text-[11px] font-mono border border-gray-400 break-words max-w-[100px]">Áreas</th>
    <th className="text-[11px] font-mono border border-gray-400">Asignaturas</th>
    <th className="text-[11px] font-mono border border-gray-400 break-words w-[650px] p-0">
      Informe Cualitativo
      {/* Línea divisoria horizontal */}
      <hr className="border-t border-gray-400 " />
      {/* Muestra los objetivos del curso */}
      <div className="text-[10px] font-light leading-tight">
        {cursoActual?.objetivos}
      </div>
    </th>
    <th className="text-[11px] font-mono border border-gray-400 text-center ">
      Nota
      {/* Línea divisoria horizontal */}
      <hr className="border-t border-gray-400 " />
      {/* Muestra los objetivos del curso */}
      <div className="text-[7px] font-mono  text-start mt-0">
      Promocion: 7 al 10<br/>Proceso: 4 al 6

      </div>
    </th>
    <th className="text-xs font-mono border border-gray-400 break-words max-w-[100px] text-center">
                    Firma Coordinador del Area
      </th>
  </tr>
</thead>
            <tbody>
              
              {areas.map((area) => (
                <tr key={area._id } className="w-50 ">
                  <td className="text-[11px] font-medium border border-gray-400 break-words max-w-[100px] text-center">{area.area}</td>
                  <td className="text-[11px] font-medium border border-gray-400 break-words max-w-[100px] text-center ">{area.materias}</td>
                  <td className="text-[10px] font-medium border border-gray-400 break-words max-w-[550px] text-center ">
                    {informesGuardados[estudiante._id]?.[area._id]?.informe}
                    {console.log('informe Guardado',informesGuardados[estudiante._id]?.[area._id])}
                  </td>
                  <td className="text-[15px] font-medium border border-gray-400 break-words max-w-[50px] text-center">
                  {informesGuardados[estudiante._id]?.[area._id]?.nota}
                  </td>
                  <td className="text-[9px] font-medium border border-gray-400  text-center text-center align-bottom pb-4">
                  {informesGuardados[estudiante._id]?.[area._id]?.firma}
                  </td>
                  
                 
                </tr>
              ))}
            
            </tbody>
            
          </table>

     
          
          <div className="page-break" style={{ margin: 0, padding: 0 }}></div>
        </div>
        
  ))}
  
  </div>


  <div className="flex justify-end mt-4 mr-8">
    <Button onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded mx-2">
      Imprimir
    </Button>
    <Button key="cancel" onClick={() => setOpen(false)} className="bg-black text-white py-2  ">
      Cancelar
    </Button>
  </div>
      </Modal>
 
  );
};










