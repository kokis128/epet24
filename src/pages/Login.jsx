import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Navbar } from '../components/Navbar'

export const Login = () => {

  const [data,setData]=useState(null);

  useEffect(()=>{
    fetch("/api")
    .then((res)=>res.json())
    .then((data)=>setData(data.message))},[]);
  



  return (
   <>
   <Header />
   <Navbar /> 

   <header> 
    {/*<p className='text-5'>{!data ? "Loading..": data}</p>*/}
   </header>
   
   </>
  )
}
