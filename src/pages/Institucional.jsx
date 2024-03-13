import React from 'react'
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export const Institucional = () => {


  return (

    <>
    <Header />
    <Navbar />
    
   
   <section className='text-GrayishBlue text-[18px] text-center py-[40px] h-[600px] '>
   
   <h3 className='text-GrayishBlue text-[22px] py-5 underline decoration-black'>Autoridades</h3>
    <h4>Directora: Sra Mónica Canchi.</h4>
    <h4>Vice director: Sr Carlos Gimenez.</h4>
    <h4>Jefe Gral de Enseñanza Práctica: Sr Pablo Lucero.</h4>
    <h4>Jefe de Sección: Sr Jose Arredondo.</h4>
    <h4>Secretaria: Sra Mirna Fuentes.</h4>

    



   </section>

   <Footer />
   
   </>
  )
}
