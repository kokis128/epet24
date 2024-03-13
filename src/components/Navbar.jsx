

import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";
import { useState } from "react";
import { Institucional } from "../pages/Institucional";
import { Link } from "react-router-dom";

export const Navbar = () => {

  

  const [showMenu,setSwowMenu] = useState(false);
  const mostrarMenu =()=>{
    setSwowMenu(!showMenu)
    
  };
 
  
  return (

    <div className="container mx-auto flex justify-end mb-3   grid col-1 text-rigth md:col-span-4">
<div className="text-rigth">
<div className="z-0 ">
<button onClick={mostrarMenu} className="absolute left-[450px]  top-4 z-10  w-13 h-13 sm:hidden "><GiHamburgerMenu  /></button> 
  <ul className={`${showMenu ? 'bg-OffWhite' : 'hidden'}  absolute left-[375px] sm:static top-12 place-content-end justify-end c  sm:flex  font-normal text-2sm z-20`}>
 
    <li>
       <Link to="/" className="hover:font-bold mx-6">Inicio</Link>        
    </li>
    <li>
    <Link to="/autoridades" className="hover:font-bold mx-6 ">Institucional</Link>
        
    </li>
    <li>
    <Link to="/normativa" className="hover:font-bold mx-6 " >Normativa</Link>
    </li>
    <li>
    <Link to="/programas" className="hover:font-bold mx-6">Programas</Link>
    </li>
    <li>
    <Link to="/login" className="hover:font-bold mx-6">Login</Link>
    </li>
    
    
  </ul>


 
  </div>
  </div>
  </div>
 

  

  )
}
