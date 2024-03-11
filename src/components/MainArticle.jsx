import React from 'react'
import imageArticle1 from '../assets/article1.jpeg'

export const MainArticle = ({articulo,txtarticulo}) => {

 




  return (
    
    <section className='grid col-1 md:col-span-3 md:row-span-3  ' >   
      <div className='grid grid-cols-2'  >

        <div className='flex-1 flex-wrap py-6' >
        <h2 className='  text-[40px] font-bolt sm:text-[58px] leading-none '>Escuela Técnica 24: </h2>
        </div>

        <div className='flex-1 '>

        <p className='text-[13px] mb-10 mt-5 sm:text-[15px] justify-between' >{articulo}</p>
        <p className='text-[8px] mb-10 mt-5 sm:text-[10px] justify-between ' >{txtarticulo}</p>
        <button className='bg-SoftRed h-[185px] h-[48px] uppercase text-OffWhite hover:bg-VeryDarkBlue'>Leer mas</button>
        </div>
        

        
        </div>
        
        
       

    </section>
   

  )
}
