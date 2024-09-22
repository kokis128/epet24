
import { NewArticle } from './NewArticle'


export const Sidebar = () => {
  return (
    <div className='container mx-auto items-center md:row-span-2 col-span-2 md:col-span-1 '>
    <aside className='bg-black bg-opacity-80 text-OffWhite px-4 content-center  '>
        <h1 className='text-SoftOrange text-[30px] font-bolt text-center content-center'>Novedades</h1>
        <NewArticle
        
        title='Estudiantina 2024'
        text='Invitamos a todos a ser parte de esta celebración única, que se llevará a cabo el próximo 24 de septiembre. ¡No te lo pierdas!'
            />
        <NewArticle 
        title='Expo 2024'
        text='Este año, la Expo se centra en la innovación y la sostenibilidad. Nos enorgullece presentar proyectos que no solo muestran la creatividad de nuestros estudiantes, sino que también abordan los desafíos actuales de nuestra sociedad. '
            />
        <NewArticle 
        title='Nuevo Plan de Estudios'
        text='Este Año se implementará un nuevo plan de estudios, 
            para primer y segundo Año.'
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
