import React from 'react'
import './clasesListItem.css';
import {DeleteOutlined,SelectOutlined} from '@ant-design/icons'
import {Button, Space }from 'antd';
export const ClaseListItem = ({clases, del , _id}) => {
   
  return (
    
    <li className='custom-li' >    
              
        <div className='numero'>
        {clases.numero}
        </div>

        <div className='observaciones'> 
        {clases.tema} 
        </div>
        
        <div className='fecha'>
        {clases.fecha}
        
        </div>
        <div className='observaciones'>
        {clases.observaciones}
        
        </div>
        <div className='actions'>
            <Space size='small'>
        <Button type='primary' onClick={()=>del(clases._id)} danger>
           { console.log(_id)}
        <DeleteOutlined />
        </Button>
        <Button type='primary'>
        <SelectOutlined />
        </Button>
        </Space>
        
        </div>
  
  
   </li>
  
  );
}
