
import { NewArticle } from './NewArticle'

export const Sidebar = () => {
  return (
    <aside className='bg-VeryDarkBlue text-OffWhite py-[28px] px-[35px]'>
        <h1 className='text-SoftOrange text-[30px] font-bolt'>Novedades</h1>
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
  )
}
