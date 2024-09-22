import React from 'react'
import logo from "../assets/logo24.png";

export const Header = () => {
  return (
    <div>
    <header className='relative grid my-12 col-1 col-span-1  md:col-span-4 '>

<div className='absolute left-[30px]  top-35 '>
<img src={logo} alt="logo epet24" className='w-11 h-10 md:w-13 md:h-12 pl-3 flex-none hover:h-14 cursor-pointer' /> 
<h3 className='  text-[8px] md:text-[9px]  font-medium hover:font-bold cursor-pointer pl-4 '>EPET 24</h3>
<h4 className='hidden md:block text-[7px] md:text-[8px] font-medium hover:font-bold cursor-pointer '>Rincón de los Sauces</h4>
</div>



</header>
</div>
  )
}
