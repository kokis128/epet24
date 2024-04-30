import React from 'react'
import './clasesListItem.css';
import {DeleteOutlined,SelectOutlined} from '@ant-design/icons'
import {Button, Space }from 'antd';
export const ClaseListItem = ({clases,clasesm, del , update,isDeleted}) => {



  const formatDate = (fecha) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-AR', options);
  };
 console.log(clases);






  return (
    
    <li className='custom-li' >    
            
           <ul>
      {       
       clasesm._id &&!isDeleted &&   (
        <li key={clasesm._id} className='custom-li'>
           
          <div className='observaciones'>{clasesm.observaciones}</div>
          <div className='actions'>
          
          <Space size='small'>
              <span>{clasesm.tema}</span>
              <span>{clasesm.fecha?`${formatDate(clasesm.fecha)}`:null}</span>
               <Button type='primary' onClick={() => del(clasesm._id)} danger>
                Eliminar
              </Button>
              <Button type='primary' onClick={()=>update(clasesm._id)}>
               <SelectOutlined />
               </Button>
            </Space>
            
          
          </div>
        </li>
        )
      
     }
    </ul>


       
        
        
       
  
  
   </li>
  
  );
}
