

import {MainArticle} from "./MainArticle"
import { Sidebar } from "./Sidebar";
import { ArticlesContainer } from "./ArticlesContainer";





function Inicio() {
    return (
     <main className="px-4 pt-1" >
      
     
      <div className="md:flex gap-8 text-justify ">
      <MainArticle articulo ="invernadero inteligente
      Acompañamos este hermoso proyecto junto a voluntarios de ExxonMobil, estudiantes y docentes de la Escuela EPET 24 de Rincón de los Sauces, Neuquén. Esta actividad no hubiese sido posible sin el apoyo de la Fundación 
      @EnsenaxArg
      .
      " />
    
      <Sidebar />
      </div>
  
      < ArticlesContainer />
      
      
      </main>

      
    );
  }
  
  export default Inicio;
  