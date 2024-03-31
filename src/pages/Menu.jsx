
import React from 'react'
import { PlanillasSeguimiento } from '../components/PlanillasSeguimiento'


export const Menu = () => {



  return (
      <div>
        <header>
          <h1>Gestión Educativa</h1>
        </header>
        <nav>
          <ul>
            <PlanillasSeguimiento/>
           
            {/* Puedes agregar más opciones de menú aquí */}
          </ul>
        </nav>
        {/* Integración del componente */}
      </div>
      
  )
}