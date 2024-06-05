import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export const Menu = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl tracking-normal text-center pt-10">Gestión Educativa</h1>
      </header>
      <nav className="flex flex-col items-center mt-8 space-y-10">
        {/* Acceso General */}
        <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold text-center mb-4">Acceso General</h2>
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <button className="w-full p-6 bg-cyan-600 text-white rounded-md shadow-md hover:bg-cyan-700">
                <Link to="/seguimiento" className="no-underline text-white">Planillas De Seguimiento</Link>
              </button>
            </li>
            <li>
              <button className="w-full p-6 bg-cyan-600 text-white rounded-md shadow-md hover:bg-cyan-700">
                <Link to="/registros" className="no-underline text-white">Registros de Clases</Link>
              </button>
            </li>
          </ul>
        </div>
        {/* Acceso Admin */}
        <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold text-center mb-4">Acceso Admin</h2>
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <button className="w-full p-6 bg-cyan-600 text-white rounded-md shadow-md hover:bg-cyan-700">
                <Link to="/estudiantes" className="no-underline text-white">Cargar Estudiantes</Link>
              </button>
            </li>
           
          </ul>
        </div>
      </nav>
    </div>
  );
};
