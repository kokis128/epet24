
import { NewArticle } from './NewArticle'

export const Sidebar = () => {
  return (
    <div className='container mx-auto items-center row-span-2 '>
    <aside className='bg-VeryDarkBlue text-OffWhite px-4 content-center  '>
        <h1 className='text-SoftOrange text-[30px] font-bolt text-center content-center'>Novedades</h1>
        <NewArticle 
        title='Nuevo Plan de Estudios'
        text='Este Año se implementará un nuevo plan de estudios, 
            para primer y segundo Año.'
            />
        <NewArticle 
        title='Nuevo Plan de Estudios'
        text='Este Año se implementará un nuevo plan de estudios, 
            para primer y segundo Año.'
            />
        <NewArticle 
        title='Nuevo Plan de Estudios'
        text='Este Año se implementará un nuevo plan de estudios, 
            para primer y segundo Año.'
            />      
    
    
    </aside>
    </div>
  )
}
