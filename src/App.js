
import '../src/index.css';
import Inicio from '../src/components/Inicio'
import {Header} from '../src/components/Header'
import {Footer} from '../src/components/Footer'
import { Sidebar } from './components/Sidebar';
import { Institucional } from './pages/Institucional';
import { useState } from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import {Normativa} from '../src/pages/Normativa'
import { Programas } from '../src/pages/Programas';
import { Login } from '../src/pages/Login';


function App() {

  const [showComponente,setShowComponente]=useState(false)


  const mostrar = ()=>{
 
  setShowComponente(!showComponente);
}

  return (
   
   <>
   <div className='container mx-auto '>
   
   <BrowserRouter>
    
      <Routes>
    <Route path='/' element={<Inicio />}  />   
    {/*<Route path='/Novedades' element={<Novedades />} /> */}
    <Route path='/autoridades' element={<Institucional />} /> 
    <Route path='/programas' element={<Programas />} />
    <Route path='/normativa' element={<Normativa />} />
    <Route path='/login' element={<Login />} />
    
    
    
     


      </Routes>
      
     
      
     
      </BrowserRouter>
   
   

   

  
   </div>

   
   
   </>
  );
}

export default App;
