'use client';

import { useEffect ,useState } from "react";


export default function ApiCall(){
  const [users,setUsers]=useState([])
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res)=>res.json())
    .then((data)=>setUsers(data))
  },[])
  return(
   <div>
    <h1>
      Users List
    </h1>

    {
    users.map((us)=>(
      <h1 key={us.id}>
          {us.name}
      </h1>
    ))
    }
   </div>
  
  )
}