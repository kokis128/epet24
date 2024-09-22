import React from 'react'

import { Header } from '../components/Header'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export const Normativa = () => {
  return (

    <>
    <Header />
    <Navbar />

    
    <section  className='text-GrayishBlue text-[18px] text-center py-[40px] h-[600px]' >
    <h1 className='mb-4'>NORMATIVA</h1>
    <ul className="list-none pl-5 space-y-2 text-blue-600">
  <li>
    <a href="URL_GOOGLE_DRIVE" target="_blank" className="hover:underline">
      Ley 14473, Estatuto Docente
    </a>
  </li>
  <li>
    <a href="URL_GOOGLE_DRIVE" target="_blank" className="hover:underline">
      Decreto Nacional 8188, Reglamentación Estatuto Docente
    </a>
  </li>
  <li>
    <a href="URL_GOOGLE_DRIVE" target="_blank" className="hover:underline">
      Nota Multiple 06 - 14. Sobre cumplimiento Horario Personal
    </a>
  </li>
  <li>
    <a href="URL_GOOGLE_DRIVE" target="_blank" className="hover:underline">
      Reglamento CONET - Funciones del Personal
    </a>
  </li>
  <li>
    <a href="URL_GOOGLE_DRIVE" target="_blank" className="hover:underline">
      Resolución 0151 - 10
    </a>
  </li>
  <li>
    <a href="URL_GOOGLE_DRIVE" target="_blank" className="hover:underline">
      Resolución 0151 - Anexo - Cap. 4
    </a>
  </li>
  <li>
    <a href="URL_GOOGLE_DRIVE" target="_blank" className="hover:underline">
      Resolución 1062/11 Funciones del personal - 1
    </a>
  </li>
  <li>
    <a href="URL_GOOGLE_DRIVE" target="_blank" className="hover:underline">
      Resolución 1062/11 Funciones del personal - 2
    </a>
  </li>
  <li>
    <a href="URL_GOOGLE_DRIVE" target="_blank" className="hover:underline">
      Resolución 1062/11 Funciones del personal - 3
    </a>
  </li>
</ul>



    
    </section>
    <Footer />
    </>
  )
}
