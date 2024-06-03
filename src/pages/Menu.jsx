
import React from 'react'
import { PlanillasSeguimiento } from '../components/PlanillasSeguimiento'
import { Link } from 'react-router-dom'

import { Button, Flex } from 'antd';
export const Menu = () => {



  return (
      <div>
        <header>
          <h1 className='text-xl tracking-normal text-center pt-10'>Gestión Educativa</h1>
        </header>
        <nav>
          <ul>
          
 
 <li>
  
     
<Flex gap="small" align="flex" vertical>
    
    <Flex gap="small">
     
 <Button className="p-8 mt-10 bg-cyan-600"><Link to="/seguimiento" className=" text-black text-end">Planillas De Seguimiento</Link>
      </Button>
      
    </Flex>
    
    <Flex gap="small">
      <Button className="p-8 bg-cyan-600">Cargar materias

      </Button>
      
    </Flex>
    <Flex gap="small">
    <Link to="/estudiantes" className=" text-black text-end"><Button className="p-8 mt-10 bg-cyan-600">Cargar Estudiantes

      </Button></Link>
      
    </Flex>
    
  </Flex>

  <Flex gap="small" align="flex" vertical>
    
    <Flex gap="small">
      <Button className="p-8 mt-10 bg-cyan-600"><Link to="/seguimiento" className=" text-black text-end">Planillas De Seguimiento</Link>

      </Button>
      
    </Flex>
    
    <Flex gap="small">
      <Button className="p-8 bg-cyan-600">Cargar materias

      </Button>
      
    </Flex>
    <Flex gap="small">
      <Button className="p-8 bg-cyan-600">Cargar Estudiantes

      </Button>
      
    </Flex>
    
  </Flex>
 
 
 </li>
</ul>
        </nav>
        {/* Integración del componente */}
      </div>
      
  )
}