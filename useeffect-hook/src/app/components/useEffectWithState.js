'use client';

import { useEffect,useState } from "react";

export default function EffectWithState(){
    const [count,setCount]=useState(0)
    useEffect(()=>{
        console.log('Count Changed')
    },[count])
    return(
           <div>
            <h1>{count}</h1>
            <button onClick={()=>setCount(count+1)}>Increased</button>
           </div>
    )
}