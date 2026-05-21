'use client'

import { useEffect,useState } from "react"

export default function TaskTwo(){
    const [count,setCount]=useState(0)
    useEffect(()=>{
        console.log(`Count Updated:${count}`)
    },[count])
   
    return(
        <div>
        <h1>Task Two</h1>
        <button onClick={()=>setCount(count+1)}>{`Count ${count}`}</button>
        </div>
    )

}