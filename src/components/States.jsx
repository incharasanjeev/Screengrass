import React from 'react'
import { createContext, useState } from 'react'


export const TaskProvider = createContext();




export default function States({ children }) {
    const [arr,setArr]=useState([]);

    const addTask = async (name, des, due) => {
        let obj={
            title:name,
            description:des,
            dueDate:due
        }
        let response = await fetch('http://localhost:8000/addTask', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({ 
                email: localStorage.getItem('userEmail'),
                taskOBJ:obj,
              }),
        })

    console.log(await response);
     fetchData();
   

    }

    const fetchData=async ()=>{
        let response=await fetch('http://localhost:8000/getTask',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem("userEmail")
            })
        })
        if(!response.ok){
            console.log("ERROR HAI");
        }

        let newArr=await response.json();
        setArr(newArr)
        console.log(arr);
    } 

  

    return (
        <TaskProvider.Provider value={{ addTask ,arr ,setArr, fetchData}}>
            {children}
        </TaskProvider.Provider>
    )
}