
import { NewArticle } from './NewArticle'


export const Sidebar = () => {
  return (
    <div className='container mx-auto items-center md:row-span-2 col-span-2 md:col-span-1 '>
    <aside className='bg-black bg-opacity-80 text-OffWhite px-4 content-center  '>
        <h1 className='text-SoftOrange text-[30px] font-bolt text-center content-center'>Novedades</h1>
        <NewArticle
        
        title='Inicio Ciclo lectivo 2025'
        text='Les deseamos a todos nuestros estudiantes un exelente inicio de clases'
            />
        <NewArticle 
        title='Calendario Escolar 2025'
        text='Consulta las fechas importantes del ciclo lectivo y mantente al día con los eventos escolares. '
            />
        <NewArticle 
        title='Convocatorias Abiertas'
        text='Este Año Participa en los concursos y actividades extracurriculares. ¡Tu talento es importante!.'
            /> 
             <NewArticle 
        title= {<a href='https://regular.neuquen.gov.ar/Regular/servlet/com.certiregu.hnuevareg'>Certificado de Alumno Regular</a>}
        text=''
            /> 
             <div className="mt-4">
          <h2 className='text-lg font-semibold'>Artículos Populares</h2>
          <ul className="list-disc pl-5">
            <li><a href="#" className='text-SoftOrange hover:underline'>Guía de Recursos Educativos</a></li>
            <li><a href="#" className='text-SoftOrange hover:underline'>Consejos para el Éxito Académico</a></li>
            <li><a href="#" className='text-SoftOrange hover:underline'>Cómo Prepararse para Exámenes</a></li>
          </ul>
        </div>   
    
    
    </aside>
    </div>
  )
}
