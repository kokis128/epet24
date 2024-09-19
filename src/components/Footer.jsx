import React from 'react'
import { GrLocation } from "@react-icons/all-files/gr/GrLocation";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { IoMdMail } from "@react-icons/all-files/io/IoMdMail";

export const Footer = () => {
  return (

      <footer className='md:col-span-4 bg-slate-300  '>
        <div className="flex  md:flex-row justify-between px-5">
          
        <div className='pt-[10px]'>
        <i><GrLocation className="inline-block mr-1 " style={{height:'40', color:'text-red-500'}} /></i>
          <p className='text-[10px] inline-block text-bolt'>Jose Hernandez 941 - Rincón de los Sauces - Neuquén</p>
          
          
        </div>
        <div className='pt-[10px]'>
          
          <ul className='flex px-2'   >
            
            <li className='pr-2' ><a href="https://wa.me/+5492995866948" target='blank' className="flex items-center"><FaWhatsapp  style={{height:'40',color:'green'}} /><div className='text-[10px] inline-block text-bolt px-1'> 2995866948</div></a></li>
            <li ><a href="mailto:epet024@neuquen.edu.ar" className="flex items-center"><IoMdMail  style={{height:'40',color:'black'}} /><div className='text-[10px] inline-block text-bolt px-1'> epet024@neuquen.edu.ar</div></a></li>
            
            
          </ul>
        </div>
      </div>
      <div className="text-center pb-2 text-[9px]">
    <p>© {new Date().getFullYear()} EPET 24 RDLS. Todos los derechos reservados.</p>
  </div>


      </footer>  


    
  


      

        
    
    
    
    
    
  )
}
