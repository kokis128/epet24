import React from 'react'
  

 
export const MainArticle = ({articulo,txtarticulo,imagen,backgroundStyle,link}) => {

  return (
  
  <>    
    <section className={`grid col-1 md:col-span-3 mb-4 ${backgroundStyle}`} >
      <div className=''  >
        
        <div className='bg-slate-200 bg-opacity-40 '>
        <p className='text-[13px]  sm:text-[20px] text-center ' >{articulo}</p>
        <p className='text-[10px] mb-2 text-justify  sm:text-[12px]  ' >{txtarticulo}</p>
        <img className='w-64 h-48 object-cover mx-auto' src={imagen} alt="invernadero" />

        <button className='bg-SoftRed h-[28px] sm:h-[48px] uppercase text-OffWhite hover:bg-VeryDarkBlue rounded px-2'
         onClick={() => window.open(link, '_blank', 'noopener,noreferrer')} >Leer mas</button>
        </div>
        </div>

        
        
    </section>
    </>
      )
}
