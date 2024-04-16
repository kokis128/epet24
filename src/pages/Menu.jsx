
import React from 'react'
import { PlanillasSeguimiento } from '../components/PlanillasSeguimiento'
import { Link } from 'react-router-dom'


export const Menu = () => {



  return (
      <div>
        <header>
          <h1>Gestión Educativa</h1>
        </header>
        <nav>
          <ul>
          <ul >
 
 <li>
<Link to="/seguimiento" className="border border-solid border-2 border-indigo-600 text-black text-end">Planillas De Seguimiento</Link>     
 </li>
 
 
 
</ul>
          </ul>
        </nav>
        {/* Integración del componente */}
      </div>
      
  )
}