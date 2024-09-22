import React from 'react'
import logo from "../assets/logo24.png";

export const Header = () => {
  return (
    <div>
    <header className='relative grid my-12 col-1 col-span-1  md:col-span-4 '>

<div className='absolute left-[30px]  top-35 mb-5 '>
<img src={logo} alt="logo epet24" className='w-14 h-11 md:w-13 md:h-12 pl-3 flex-none  ' /> 
<h3 className='  text-[12px] md:text-[12px]  font-medium hover:font-bold  pl-3 whitespace-nowrap  '>EPET 24</h3>
<h4 className='hidden md:block text-[7px] md:text-[8px] font-medium hover:font-bold  '>Rincón de los Sauces</h4>
</div>



</header>
</div>
  )
}
