

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

    <nav className="container  mb-4 mx-auto flex justify-end mb-3   grid col-1 text-rigth md:col-span-4 ">
<div className="text-rigth">
<div className="z-0 ">
<button onClick={mostrarMenu} className="absolute left-[320px]  top-10 z-10  w-13 h-13 sm:hidden "><GiHamburgerMenu  /></button> 
<ul className={`${showMenu ? 'bg-OffWhite ' : 'hidden'} bg-blue-200 absolute left-[280px] bg-opacity-30 mt-5 sm:static top-12 place-content-end justify-end sm:flex sm:font-normal text-2sm z-20 transition-all`}>
  <li className='sm:hover:bg-none hover:bg-blue-200'>
    <Link to="/" className="mx-6 font-bold  sm:hover:bg-none ">Inicio</Link>        
  </li>
  <li className='sm:hover:bg-none hover:bg-blue-200'>
    <Link to="/institucional" className="mx-6 font-bold  sm:hover:bg-none ">Institucional</Link>
  </li>
  <li className='sm:hover:bg-none hover:bg-blue-200'>
    <Link to="/normativa" className="mx-6 font-bold sm:hover:bg-none ">Normativa</Link>
  </li>
  <li className='sm:hover:bg-none hover:bg-blue-200'>
    <Link to="/programas" className="mx-6 font-bold sm:hover:bg-none ">Programas</Link>
  </li>
  <li className='sm:hover:bg-none hover:bg-blue-200'>
    <Link to="/login" className="mx-6 font-bold sm:hover:bg-none ">Acceder</Link>
  </li>
</ul>


 
  </div>
  </div>
  </nav>
 

  

  )
}
