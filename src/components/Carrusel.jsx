import React from 'react'
import slider1 from '../assets/slider1.jpg'
import slider2 from '../assets/slider2.jpg'
import slider3 from '../assets/slider3.jpg'
import slider5 from '../assets/slider5.jpg'
import slider6 from '../assets/slider6.gif'
import { Carousel } from 'antd';
import { Sidebar } from './Sidebar'
export const Carrusel = () => {


    const contentStyle = {
        height: '210px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };
  
  
      return (

        <section className='col-span-2 md:col-span-3 '>

             <Carousel autoplay effect="fade" className='w-full h-[210px]  z-0'>
    <div>
      <h3 ><img src={slider1} alt="corouse1" className='w-full h-[210px]  ' /></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img src={slider2} alt="carousel2" className='w-full h-[210px] ' /></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img src={slider5} alt="carousel3" className='w-full h-[210px]  ' /></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img src={slider3} alt="carousel4" className='w-full h-[210px] ' /></h3>
    </div>
  </Carousel>
 








        </section>
  )
}
