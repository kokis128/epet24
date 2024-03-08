import React from 'react'
import logo from "../assets/logo24.png";
import { Navbar } from './Navbar';
export const Header = () => {
  return (
    <header className='flex place-content-between items-center px-2 '>

<div className='text-center items-center'>
<img src={logo} alt="logo epet24" className='w-11 h-11 flex-none ml-3 hover:h-13 cursor-pointer' /> 
<h3 className='text-[8px]  font-medium hover:font-bold cursor-pointer'>EPET 24</h3>
<h4 className='text-[7px] font-medium hover:font-bold cursor-pointer'>Rincón de los Sauces</h4>
</div>

<Navbar />

</header>
  )
}
