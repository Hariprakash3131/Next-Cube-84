'use client'
import { useRef,useState } from "react"
export default function Timer(){
    const [count,setCount]=useState(0)
    const timerRef=useRef(null)

    function startTimer(){
        if(timerRef.current !==null)
            return
        timerRef.current=setInterval(()=>{
            setCount((p)=>p+1)
        },1000
    )
    }
    function stopTimer(){
        clearInterval(timerRef.current)
        timerRef.current=null
    }
    return(
        <div>
        <h1>Timer</h1>
        <button onClick={startTimer}>Start Timer</button>
        <button onClick={stopTimer}>Stop Timer</button>
        <h2>{count}</h2>
        </div>
    )
}