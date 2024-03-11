

import {MainArticle} from "./MainArticle"
import { Sidebar } from "./Sidebar";
import { ArticlesContainer } from "./ArticlesContainer";
import { Carrusel } from "./Carrusel";
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Header } from './Header';
function Inicio() {
    return (
     <main className="container mx-auto" >
      
      
      
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-4" >
     
        <Header />
        <Navbar /> 
          
        <Carrusel />
        
        <Sidebar />
       
       
        <MainArticle articulo='De la demanda educativa a la especialización en programación' txtarticulo='
En 2019, para abordar la creciente demanda educativa en Neuquén, se fundó la EPET 24 luego de la saturación de la EPET 16. Inicialmente, la escuela comenzó con 50 estudiantes de primer año y una orientación general en sus estudios técnicos. Con el tiempo, en respuesta al desarrollo tecnológico en la región, la institución adoptó una especialización en programación. Cinco años después de su creación, la EPET 24 se ha convertido en un centro educativo clave, preparando a sus estudiantes para enfrentar los desafíos del campo de la tecnología, aunque aún no ha graduado a su primera promoción.'/>
        <ArticlesContainer />
        
        <Footer /> 
       
            
        


      
      
      
      </div>
  
     
      
     
      </main>

      
    );
  }
  
  export default Inicio;
  