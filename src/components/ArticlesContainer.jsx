import React from 'react'
import { Article } from './Article'
import img1 from '../assets/article3.jpeg'
import img2 from '../assets/img2.jpeg'
import img3 from '../assets/img3.jpeg'
export const ArticlesContainer = () => {
  return (
    <section className=' md:flex  md:col-span-4 '>









      
        <Article
        img={img1}
        number='01'
        title='Especialidad'
        text='Nuestra Especialidad incluye, habilidades de codificación'
        />
        <Article
        img={img2}
        number='02'
        title='Capacitaciones En Arduino'
        text='Nuestros Estudiantes realizaron capacitaciones en Arduino, gracias al aporte de la empresa Tecpetrol'
        />
        <Article

        img={img3}
        number='03'
        title='Prácticas Profesionalizantes'
        text='Nuestros estudiantes de quinto Año realizarán practicas en Empresas de La localidad.'
        
        />
    </section>


    



  )
}
