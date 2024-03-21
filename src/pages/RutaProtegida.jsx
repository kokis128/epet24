import React from 'react'

import { Navigate,Outlet } from 'react-router-dom'

export const RutaProtegida = ({isLogged,redirectPath='/'}) => {

  console.log(isLogged)
 

  if(!isLogged){
   return <Navigate to={redirectPath} />
  }else{

  return (
    <Outlet/>
  );
}
}

