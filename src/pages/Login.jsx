import React from 'react'
import { useState} from 'react'
import logoepet24 from '../assets/logo24.png' 
import {  Navigate } from "react-router-dom";
import { Navbar } from '../components/Navbar'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
export const Login = () => {

  
  const [username,setUsername] =useState('');
  const [password,setPassword] =useState('');
  

  

  const handleRegister = (e)=>{
    


    window.location.href ='/register';

  }




 
const handleLogin = async (event)=>{
 
  event.preventDefault();

  
 
try { 

  

  const response = await fetch('http://localhost:3000/api/user/login',{

  method:'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username, password }),

}
  )
  const data = await response.json();

 

  if (data.ok) {
    console.log("Inicio de sesión exitoso");
    const myJSON = JSON.stringify(data.user);
  localStorage.setItem("user", myJSON);
    console.log(data)
   window.location.href='/menu'
   
    alert(data.msg);
 


   
    // Aquí podrías redirigir al usuario a otra página o realizar alguna acción adicional
  


  } else {

    console.error("Inicio de sesión fallido:", data.error);
    // Puedes mostrar un mensaje de error al usuario o hacer alguna otra acción
    alert(data.msg)
 
  }
  
  
} catch (error) {
  console.error("Error durante el inicio de sesión:", error);
  // Puedes mostrar un mensaje de error genérico al usuario o hacer alguna otra acción
}





}









  
  return (

    <>
  
  <Header />
  <Navbar />
    <section className='container flex place-content-center relative  my-20'>
    
     
     
    <form onSubmit={handleLogin} className=' flex flex-col border-2 my-5 mx-auto p-5'>
    <div  className=' text-3xl mx-auto my-auto'><img src = {logoepet24}  alt="logo" className='w-8 h-10 pt-2 mb-2 mx-auto' />
      Login</div>
      <div className=' flex flex-col my-9 place-content-center'  >
        
    <div className=' ml-6 pb-2'>
      <label htmlFor="username">Usuario:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='border-2 border-indigo-600 ml-2'
      />
    </div>
    <div className='place-content-end'>
      <label htmlFor="password" className=''>Contraseña:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      className='border-2 border-indigo-600 ml-2'/>
    </div>
    <button type="submit" onClick={handleLogin} className='border border-1 rounded bg-blue-200 p-2 m-4 place-content-center transition delay-700 duration-300 ease-in-out ...'>Iniciar sesión</button>
    </div>
  </form>

  <button type="submit" onClick={handleRegister} className='border border-1 rounded bg-blue-200 p-2 m-4 place-content-center absolute right-2'>Registrarse</button>
  
  </section>
  <Footer />
  </>
   
  )
}
