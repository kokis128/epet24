import React from 'react'
import { GrLocation } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export const Footer = () => {
  return (

      <footer className='md:col-span-4 bg-slate-300  '>
        <div className="flex  md:flex-row justify-between px-5">
          
        <div className='pt-[28px]'>
        <i><GrLocation className="inline-block mr-1   "style={{height:'40',color:'red'}} /></i>
          <p className='text-[10px] inline-block text-bolt'>Jose Hernandez 941 - Rincón de los Sauces - Neuquén</p>
          
          
        </div>
        <div className='pt-[28px]'>
          
          <ul className='flex' >
            <li className='pr-2' ><a href="https://www.facebook.com/epet24rdls" target='blank' className="flex items-center"><FaFacebook  style={{height:'40',color:'blue'}} /></a></li>
            <li className='pr-2' ><a href="https://wa.me/+5492995866948" target='blank' className="flex items-center"><FaWhatsapp  style={{height:'40',color:'green'}} /></a></li>
            <li ><a href="mailto:epet024@neuquen.edu.ar" className="flex items-center"><IoMdMail  style={{height:'40',color:'black'}} /></a></li>
            
          </ul>
        </div>
      </div>


      </footer>  


    
  


      

        
    
    
    
    
    
  )
}
