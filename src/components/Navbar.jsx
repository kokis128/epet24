

import { GiHamburgerMenu } from "react-icons/gi";

export const Navbar = () => {
  return (

    <>
  <ul className="hidden sm:flex 
  text-[12px] sm:w-[438px] sm:place-content-around sm:items-center sm:text-[14px] font-normal ">
    <li>
       <a href="#" className="hover:font-bold">Inicio</a>        
    </li>
    <li>
        <a href="#" className="hover:font-bold">Novedades</a>
    </li>
    <li>
        <a href="#" className="hover:font-bold" >Normativas</a>
    </li>
    <li>
        <a href="#" className="hover:font-bold">Programas</a>
    </li>
    
  </ul>
  <GiHamburgerMenu className="w-10 h-10 cursor-pointer sm:hidden " /> 

  </>

  )
}
