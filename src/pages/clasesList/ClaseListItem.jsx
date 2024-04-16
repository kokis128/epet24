import React from 'react'
import './clasesListItem.css';
import {DeleteOutlined,SelectOutlined} from '@ant-design/icons'
import {Button, Space }from 'antd';
export const ClaseListItem = ({clases,clasesm, del , update, materias}) => {
 console.log(clases);
  return (
    
    <li className='custom-li' >    
            
           <ul>
      {





            
       
        <li key={clasesm._id} className='custom-li'>
           
          <div className='observaciones'>{clasesm.observaciones}</div>
          <div className='actions'>
            <Space size='small'>
              <span>{clasesm._id}</span>
              <span>{clasesm.tema}</span>
              <span>{clasesm.fecha}</span>
              <Button type='primary' onClick={() => del(clasesm._id)} danger>
                Eliminar
              </Button>
              <Button type='primary' onClick={()=>update(clases._id)}>
               <SelectOutlined />
               </Button>
            </Space>
          </div>
        </li>
     }
    </ul>


       
        
        
       
  
  
   </li>
  
  );
}
