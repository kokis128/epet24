import {React,useState} from 'react'
const [articulo,SetArticulo]=([
{
  id:'',
  title:'',
  text:''
}

])




export const NewArticle = ({title,text,id}) => {
  return (
    <article className='h-[140px] border-b-2 border-GrayisBlue py-3 last:border-none lg:h-[160px] lg:pt-4'>
        
        
        <h2 className='text-SoftOrange cursor-pointer hover:text-SoftOrange text-[15px] lg:text-[16px] font-bolt xl:text-[20px]'>
          {title}
        </h2>
        <p className='text-[10px]'>
          {text}
        </p>
    </article>
  )
}
