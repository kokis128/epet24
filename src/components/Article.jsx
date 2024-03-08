import React from 'react'

export const Article = ({img,number,title,text}) => {
  return (
    <article className='flex h-[162px] md:w-[310px] md:flex-grow'>
        <div className='w-[100px] flex-none'>
            <img src={img} alt="articulo 3"/>
        </div>
        <div className='pl-4' >

            <p className='text-GrayishBlue text-3xl mb-[7px] font-bolt'>{number}</p>
            <h2 className='font-bolt mb-[7px] hover:text-SoftOrange cursor-pointer'>{title}</h2>
            <p className='text-GrayishBlue text-[12px] text-justify pr-2' >{text}</p>

        </div>
    </article>
  )}
