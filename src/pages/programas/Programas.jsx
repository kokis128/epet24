import React from 'react'
import {useState} from 'react'
import { Header } from '../../components/Header'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { CicloBasico } from './CicloBasico'
import { CicloSuperior } from './CicloSuperior'

export const Programas = () => {

  const [mostrarBasico, setMostrarBasico] = useState(false);
  const [mostrarSuperior, setMostrarSuperior] = useState(false);
  

  




  return(

    <>
    <Header />
    <Navbar />
    <div className=''>
     

      <ul className='flex flex-col'>
      
      <h1 className='text-GrayishBlue text-[22px] text-center py-[6px]  '>Programas</h1>
      
       <li><CicloBasico/></li>
      
       

       
       
      
       <li><CicloSuperior/></li>

      

       </ul>

    </div>
       
    
    <Footer />
    </>
  )
}
