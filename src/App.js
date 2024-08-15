
import '../src/index.css';
import Inicio from '../src/components/Inicio'
import { Institucional } from './pages/Institucional';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { useState } from 'react';
import {Normativa} from '../src/pages/Normativa'
import { Programas } from '../src/pages/Programas';
import { Login }  from './pages/Login';
import { Menu } from './pages/Menu';
import { Register } from "../src/pages/Register";
import { RutaProtegida } from './pages/RutaProtegida';
import { PlanillasSeguimiento } from './components/PlanillasSeguimiento';
import { PlanillaToPrint} from './components/PlanillaToPrint';
import { CargarEstudiantes } from './pages/estudiantes/CargarEstudiantes';
import { Cursos } from './pages/cursos/Cursos';
import { MateriasPorCurso } from './pages/materias/MateriasPorCurso';
import { AgregarMateria } from './pages/materias/AgregarMateria';
import {AreasPorCurso} from './pages/areas/AreasPorCurso';
import { CursoProvider } from './CursoContext';

function App() {
  
  let text = localStorage.getItem("user");
  let user = JSON.parse(text);

  console.log(user);
  return (
   
   <>
   <div className='container mx-auto '>
   <CursoProvider>
   <BrowserRouter>
    
      <Routes>
    <Route path='/' element={<Inicio />}  />   
    {/*<Route path='/Novedades' element={<Novedades />} /> */}
    <Route path='/autoridades' element={<Institucional />} /> 
    <Route path='/programas' element={<Programas />} />
    <Route path='/normativa' element={<Normativa />} />
    <Route path='/login' element={<Login />} />

    <Route element={<RutaProtegida isLogged={user} />}>
    <Route path='/menu' element={<Menu />} />
    <Route path='/seguimiento' element={<PlanillasSeguimiento />} />
    
    <Route path='/estudiantesPorCurso/:id' element={<CargarEstudiantes />} />
    <Route path='/cursos' element={<Cursos />} />
    <Route path='/materiasPorCurso/:id' element={<AgregarMateria />} />
    <Route path='/areasPorCurso/:id' element={<AreasPorCurso />} />
    
    </Route>
    <Route path='/register' element={<Register />} />
   
    </Routes>     
    </BrowserRouter>
    </CursoProvider>

   </div>

   
   
   </>
  );
}

export default App;
