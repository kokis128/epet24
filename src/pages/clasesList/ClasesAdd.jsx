import { Button } from 'antd';
import React from 'react'
import {useForm} from 'react-hook-form';
 
const URL='http://localhost:3000/api'
export const ClasesAdd = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const  onSubmit =  async (data) => {console.log(data);
   
  const first = await fetch(`${URL}/clase`,{
  method: 'POST',
  body: JSON.stringify(data),
  headers:{
    'Content-Type':'application/json'
  }
  }
  );
const newClaseFromDB = await first.json();
console.log(newClaseFromDB);

}


  return (
  
    
    <form onSubmit={handleSubmit(onSubmit)}>
    <input type="text" placeholder="tema" {...register("tema", {required: true, max: 29})} />
    <input type="number" placeholder="numero" {...register("numero")} />
    <input type="text" placeholder="asistencia" {...register("asistencia", {required: true, max: 5})} />
    <input type="datetime" placeholder="fecha" {...register("fecha", {required: true})} />

    <input type="submit" />
  </form>
    
    
    
   
   
  )
}
