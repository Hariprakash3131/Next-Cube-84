'use client';

import { useEffect } from "react";
export default function TimerExample(){
    useEffect(()=>{
        const timer=setInterval(()=>{
            console.log('Running...')
        },1000)
        return()=>{
            clearInterval(timer)
        }
    },[])
    return(
    <div>
        <h1>Timer Example</h1>
    </div>
    )
}

