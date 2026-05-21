'use client'
import { useEffect,useState } from "react"

export default function TaskThree(){
    const [user,setUsers]=useState([])
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res)=>res.json())
        .then((data)=>setUsers(data))
    })
    return(
         <div>
            <h1>Users List</h1>
           
                {user.map((us)=>{
                   <h2 key={us.id}>{us.name}</h2>
                })}
           
         </div>
    )
}