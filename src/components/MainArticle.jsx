import React from 'react'
import imageArticle1 from '../assets/article1.jpeg'
import slider1 from '../assets/slider1.jpg'
import slider2 from '../assets/slider2.jpg'
import slider3 from '../assets/slider3.jpg'
import slider5 from '../assets/slider5.jpg'
import slider6 from '../assets/slider6.gif'
import { Carousel } from 'antd';
export const MainArticle = ({articulo,txtarticulo}) => {

  const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };




  return (

    <section className='mb-12'>     

      <Carousel autoplay effect="fade" className='w-[340px] sm:w-[687px] '>
    <div>
      <h3 style={contentStyle}><img src={slider1} alt="corouse1" className='w-[1457px] h-[200px]' /></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img src={slider2} alt="carousel2" className='w-[1457px] h-[200px]' /></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img src={slider5} alt="carousel3" className='w-[1457px] h-[200px]' /></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img src={slider3} alt="carousel4" className='w-[1457px] h-[200px]' /></h3>
    </div>
  </Carousel>
   
      <div className='flex ml-5' >

        <div className='flex-1'>
        <h2 className='text-[30px] font-bolt sm:text-[28px] mt-[100px]'>Nuestra Escuela: </h2>
        </div>

      <div className='flex-1 px-4'>

        <p className='text-[13px] mb-10 mt-5 sm:text-[15px]' >{articulo}</p>
        <p className='text-[8px] mb-10 mt-5 sm:text-[10px]' >{txtarticulo}</p>
        <button className='bg-SoftRed w-[185px] h-[48px]
         uppercase text-OffWhite hover:bg-VeryDarkBlue'>Leer mas</button>
        </div>

    
        </div>

    </section>

  )
}
