

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

    <nav className="container pt-20 mx-auto flex justify-end mb-3   grid col-1 text-rigth md:col-span-4 ">
<div className="text-rigth">
<div className="z-0 ">
<button onClick={mostrarMenu} className="absolute left-[360px]  top-12 z-10  w-17 h-15 sm:hidden "><GiHamburgerMenu  /></button> 
<ul className={`${showMenu ? 'bg-OffWhite ' : 'hidden'}  absolute left-[280px] bg-opacity-50 md:opacity-100  mt-6 sm:static top-12 place-content-end justify-end sm:flex sm:font-normal text-2sm z-20 transition-all`}>
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
