import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import TaskForm from '../components/TaskForm'
import ItemListing from './ItemListing';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("authToken")){
         navigate('/login');
    }
  },[])
  return (
    <div>
      <Navbar/>
      
      <TaskForm />
       

      <ItemListing /> 
      
      
    </div>
  )
}