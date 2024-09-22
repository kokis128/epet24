

import {MainArticle} from "./MainArticle"
import { Sidebar } from "./Sidebar";
import { ArticlesContainer } from "./ArticlesContainer";
import { Carrusel } from "./Carrusel";
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Header } from './Header';
import imgArt1 from './../assets/invernadero.jpg'
import imgArt2 from './../assets/capacitacion.jpg'


import backgroundImage from '../assets/fondo.jpg'; 

function Inicio() { 

    return (
     <main className="bg-fixed bg-center bg-cover min-h-screen"
     style={{ backgroundImage: `url(${backgroundImage})` }} >    
      
      
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-4" >
     
        <Header />
        <Navbar />          
        <Carrusel />        
        <Sidebar />   

        

         <div className=' grid grid-cols-1 col-span-2 md:col-span-3'>

         <h1 className="text-md  text-center mb-1 bg-gray-100 bg-opacity-40 ">Proyectos Institucionales</h1>
       
        <MainArticle  articulo='Invernadero Prof Claudia Urquiza' txtarticulo='Inauguración del Invernadero "Profesora Claudia Urquiza"
La EPET N°24 ha dado un importante paso hacia la integración de la educación técnica y la participación comunitaria con la inauguración de su invernadero «Profesora Claudia Urquiza». Este proyecto representa un avance significativo en la aplicación práctica de conocimientos adquiridos por los estudiantes y sirve como un espacio de aprendizaje interdisciplinario que fomenta el trabajo en equipo, la investigación y el desarrollo sostenible.

El invernadero, diseñado y construido con la colaboración de estudiantes y docentes, es una herramienta didáctica que permitirá a los alumnos aplicar conceptos de programación, automatización, y control de sistemas, integrando tecnologías como Arduino y sensores para monitorear las condiciones de temperatura, humedad y riego. Este entorno les permitirá desarrollar proyectos que conectan el mundo de la tecnología con el cuidado del medio ambiente, impulsando su formación en un contexto real y práctico.

Este proyecto fue posible gracias al apoyo del sector privado, representado por ExxonMobil, y la Fundación Enseña por Argentina, que brindaron recursos y asesoramiento para llevar a cabo la iniciativa. La Directora Mónica Canchi destacó que el invernadero no solo enriquece la experiencia educativa, sino que también rinde homenaje a la profesora Claudia Urquiza, una docente que dejó un legado de dedicación y amor por la enseñanza técnica.

Con este invernadero, la EPET N°24 refuerza su compromiso de formar estudiantes competentes, capaces de enfrentar los desafíos del mundo actual, promoviendo la innovación, el trabajo en equipo y la vinculación con la comunidad.
 ' imagen={imgArt1} backgroundStyle='bg-green-300 bg-opacity-20'
 link='https://rdlsnoticias.com.ar/emotiva-inauguracion-del-invernadero-profesora-claudia-urquiza/'/>
      

 <MainArticle articulo='Capacitacion en Arduino' txtarticulo='Estudiantes de la EPET N°24 completaron con éxito una capacitación brindada por el UFLO en colaboración con la empresa Tecpetrol. Esta iniciativa formativa permitió a los alumnos adquirir conocimientos actualizados en áreas técnicas y fortalecer habilidades prácticas fundamentales para su desarrollo profesional. La experiencia brindó a los estudiantes la oportunidad de aplicar conceptos aprendidos en el aula a un contexto real, preparándolos para los desafíos del mundo laboral en la industria tecnológica. Este tipo de alianzas refuerza el compromiso de la EPET N°24 con la excelencia educativa y el desarrollo de futuros profesionales. '
  imagen={imgArt2} backgroundStyle='bg-blue-300 bg-opacity-10' 
  link='https://www.uflo.edu.ar/novedad-603-mas-de-200-estudiantes-culminaron-una-capacitacion-brindada-por-el-cufet-junto-a-tecpetrol-'/>
        

        </div>
        <hr className="my-8 border-gray-300" /> 
<h2 className='text-center text-2xl font-bold my-4'>Experiencias Educativas</h2>
<hr className="my-8 border-gray-300" /> 

        <ArticlesContainer />
        <Footer />
        </div>
        
       
      
     
  
     
      
     
      </main>

      
    );
  }
  
  export default Inicio;
  