'use client'
import { useState,useEffect } from "react";

export default function useLocalStorage(key,initialValue){
    const [storedValue,setStoredValue]=useState(()=>{
          if(typeof window==='undefined'){
            return initialValue
          }
          const item=localStorage.getItem(key)
          return item ? JSON.parse(item):initialValue
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(storedValue))
    },[key,storedValue])

    return[storedValue,setStoredValue]
}


// Important Next.js Point

// This line:

// typeof window === "undefined"

// is VERY important in Next.js.

// Because localStorage only exists in browser, not server.