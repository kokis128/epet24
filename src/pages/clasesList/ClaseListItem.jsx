import React from 'react'
import './clasesListItem.css';
import {DeleteOutlined,SelectOutlined} from '@ant-design/icons'
import {Button, Space }from 'antd';
export const ClaseListItem = ({clases,clasesm, del, update,deletedItemId}) => {




  const formatDate = (fecha) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-AR', options);
  };
 


 const isDeleted = (deletedItemId === clasesm._id);

  if (isDeleted) {
    // Si el elemento ha sido eliminado, no renderizar nada
    return null;
  }



  return (
    
    <ul className='custom-li' >    
            
           
      {       
       
        <li key={clasesm._id} className='custom-li'>
            {!deletedItemId&&!isDeleted && (<>
          
          <div className='observaciones'>{clasesm.observaciones}</div>
          <span>{clasesm.tema}</span>
          <span>{clasesm.fecha?`${formatDate(clasesm.fecha)}`:null}</span>
          
          
          <div className='actions'>

          
          <Space size='small'>             
          <Button type='primary' danger onClick={() => del(clasesm._id)} >
                <DeleteOutlined />
              </Button>
            <Button type='primary' onClick={()=> update(clasesm._id)}>
               <SelectOutlined />
               </Button>
              
          </Space>
            
          
          </div>
          </>
            )}
        </li>
 }
      
     
    </ul>


       
        
        
       
  
  
   
  
  );
}
