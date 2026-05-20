'use client'
import { useEffect }   from "react"

export default function TaskOne(){
    useEffect(()=>{
        console.log('WelCome Users')
    },[])   //[] run once
    
    return( 
        <div>UseEffect Example Task One</div>
    )
}