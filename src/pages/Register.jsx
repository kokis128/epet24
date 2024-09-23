import React from 'react'



import { useState } from 'react'
import logoepet24 from '../assets/logo24.png' 


export const Register = () => {

  const [email,setEmail] =useState('');
  const [nombre,setNombre] =useState('');
  const [apellido,setApellido] =useState(''); 
  const [password,setPassword] =useState('');
  const [funcion,setFuncion] =useState('');
  

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
  body: JSON.stringify({ nombre,apellido,email,password,funcion }),

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
   
    alert('debes ingresar un usuario y contraseña validos')
 
  }
  
  
} catch (error) {
  console.error("Error durante el inicio de sesión:", error);
  // Puedes mostrar un mensaje de error genérico al usuario o hacer alguna otra acción
}
}

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const handleEmailChange = (e) => {
  const emailValue = e.target.value;
  if (validateEmail(emailValue)) {
    setEmail(emailValue);  // Actualiza el estado si es un email válido
  } else {
    // Mostrar un mensaje de error o manejar el caso en que el email no sea válido
    console.log("Email no válido");
  }
};

const handlePasswordChange = (e) => {
  setPassword(e.target.value);
};

const handlePasswordBlur = () => {
  if (password.length < 5) {
    alert('La contraseña debe tener al menos 5 caracteres');
  }
};









  return (
    <>
    <section className='container flex place-content-center relative'>
     
     
    <form onSubmit={handleSignup} className='flex flex-col border-2 my-5 p-5'>
  <div className='text-3xl mx-auto my-auto text-end'>
    <img src={logoepet24} alt="logo" className='w-8 h-10 pt-2 mb-2 mx-auto' />
    Registrarse
  </div>
  
  <div className='flex flex-col my-20 text-center my-auto mr-8 mt-7'>
    <div className='ml-6 pb-2'>
      <label htmlFor="nombre">Nombre(s): </label>
      <input
        type="text"
        id="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className='border-2 border-indigo-600 ml-2 p-2 w-full'
        maxLength={30} 
      />
    </div>

    <div className='ml-6 pb-2'>
      <label  htmlFor="apellido">Apellido:</label>
      <input
        type="text"
        id="apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        required
        className='border-2 border-indigo-600 ml-2 p-2 w-full'
        maxLength={30} 
      />
    </div>

    <div className='ml-6 pb-2'>
      <label htmlFor="funcion">Función:</label>
      <select 
        id="funcion" 
        name="options" 
        className='border-2 border-indigo-600 ml-2 p-2 w-full'
        value={funcion} 
        onChange={(e) => setFuncion(e.target.value)}
        required
      >
        <option value=""></option>
        <option value="profe">Profe</option>
        <option value="preceptor">Preceptor</option>
        <option value="MEP">MEP</option>
        <option value="directivo">Directivo</option>
      </select>
    </div>

    <div className='ml-6 pb-2'>
      <label htmlFor="email">Email: </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange }
        className='border-2 border-indigo-600 ml-2 p-2 w-full'
        required
        placeholder='ingresa tu email'
        maxLength={30} 
      />
    </div>

    <div className='ml-6 pb-2'>
      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        required
        className='border-2 border-indigo-600 ml-2 p-2 w-full'
        maxLength={8} 
      />
    </div>

    <button type="submit" className='border border-1 rounded bg-blue-200 p-2 m-4 place-content-center transition delay-700 duration-300 ease-in-out'>
      Registrarse
    </button>
  </div>
</form>


  <button type="submit" onClick={handleVolver} className='border border-1 rounded bg-blue-200 p-2 m-4 place-content-center absolute right-2'>Login</button>
  
  
  
  </section>
 


  </>
  )
}
