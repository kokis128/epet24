

import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";
import { useState } from "react";

export const Navbar = () => {

  const [showMenu,setSwowMenu] = useState(false);
  const mostrarMenu =()=>{
    setSwowMenu(!showMenu)
    
  };
 
  
  return (

    <div className="container mx-auto flex justify-end    grid col-1 text-rigth md:col-span-4">
<div className="text-rigth">
<div className="z-0 ">
<button onClick={mostrarMenu} className="absolute left-[450px]  top-4 z-10  w-13 h-13 sm:hidden "><GiHamburgerMenu  /></button> 
  <ul className={`${showMenu ? 'bg-OffWhite' : 'hidden'}  absolute left-[375px] sm:static top-12 place-content-end justify-end c  sm:flex  font-normal text-2xl z-20`}>
 
    <li>
       <a href="#" className="hover:font-bold mx-8">Inicio</a>        
    </li>
    <li>
        <a href="#" className="hover:font-bold mx-8 ">Novedades</a>
    </li>
    <li>
        <a href="#" className="hover:font-bold mx-8 " >Normativas</a>
    </li>
    <li>
        <a href="#" className="hover:font-bold mx-8">Programas</a>
    </li>
    
    
  </ul>
  </div>
  </div>
  </div>
 

  

  )
}
