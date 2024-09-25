import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export const Menu = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="min-h-screen bg-gray-100">
      
      <header className="bg-white shadow p-1">
        
        <h1 className="text-xl tracking-normal text-center pt-2">Gestión Educativa</h1>
        <h2 className='text-end text-gray-400 text-xs'>Usuario: {user.nombre} {user.apellido}</h2>
      </header>
      <nav className="flex flex-col items-center mt-8 space-y-10">
        {/* Acceso General */}
        <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
          <h2 className="text-sm font-semibold text-center mb-2">Acceso General</h2>
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <button className="w-full p-4 bg-cyan-600 text-white rounded-md shadow-md hover:bg-cyan-700">
                <Link to="/seguimiento" className="no-underline text-white">Gestion de Clases</Link>
              </button>
            </li>
           
            <li>
            
            </li>
           
          </ul>
        </div>
        {user.role==='admin' && (
        <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
          <h2 className="text-sm font-semibold text-center mb-2">Acceso Admin</h2>
          <ul className="flex flex-col items-center space-y-4">
            <li>
             
              
              <button className="w-full p-4 bg-cyan-600 text-white rounded-md shadow-md hover:bg-cyan-700">
                <Link to="/cursos" className="no-underline text-white">Gestión de Cursos</Link>
              </button>
            </li>
           
          </ul>
        </div>
        )}
      </nav>
    </div>
  );
};
