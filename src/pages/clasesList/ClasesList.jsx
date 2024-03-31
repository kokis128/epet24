import React from 'react'


import { ClaseListItem } from './ClaseListItem';
export const ClasesList = ({ clases ,  del } ) => { 
  
  
    return (
    <>
    <ul>
    
    <ul className='custom-ul'>
   
    {clases.map(clase => <li><ClaseListItem clases={clase}  del={del} />
    
    </li>)}
    </ul>

    </ul>
 

    
    
       
    

  </>
  
  );
}
