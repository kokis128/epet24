import React from 'react'



import { useState } from 'react'
import logoepet24 from '../assets/logo24.png' 


export const Register = () => {


  const [username,setUsername] =useState('');
  const [password,setPassword] =useState('');

  const handleVolver = (e)=>{


    window.location.href ='/login';

  }





const handleSignup = async (event)=>{

  event.preventDefault();



try { 

  const response = await fetch('http://localhost:3000/api/signup',{

  method:'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username, password }),

}
  )
   
  
  const data = await response.json();

  if (response.ok) {
    console.log("Registro exitoso");


    window.location.href= '/login';
    // Aquí podrías redirigir al usuario a otra página o realizar alguna acción adicional
  alert('Login Registro Exitoso')


  } else {

    console.error("Inicio de sesión fallido:", data.error);
    // Puedes mostrar un mensaje de error al usuario o hacer alguna otra acción
    alert('debes ingresar un usuario y contraseña validos')
 
  }
  
  
} catch (error) {
  console.error("Error durante el inicio de sesión:", error);
  // Puedes mostrar un mensaje de error genérico al usuario o hacer alguna otra acción
}
}








  return (
    <>
    <section className='container flex place-content-center relative'>
     
     
    <form onSubmit={handleSignup} className=' flex flex-col border-2 my-5 mx-auto p-5'>
    <div  className=' text-3xl mx-auto my-auto'><img src = {logoepet24}  alt="logo" className='w-8 h-10 pt-2 mb-2 mx-auto' />
      Registrarse</div>
      <div className=' flex flex-col my-20 place-content-center'  >
        
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
    <button type="submit" className='border border-1 rounded bg-blue-200 p-2 m-4 place-content-center transition delay-700 duration-300 ease-in-out ...'>Registrarse</button>
    </div>
  </form>

  <button type="submit" onClick={handleVolver} className='border border-1 rounded bg-blue-200 p-2 m-4 place-content-center absolute right-2'>Login</button>
  
  
  
  </section>
 


  </>
  )
}
