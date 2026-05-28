'use client'
import { useRef } from "react"

export default function TextArea(){
    const textClearRef=useRef("")
    
    function clearText(){
        textClearRef.current.value=""
    }
    return(
        <div>
            <textarea name="" ref={textClearRef} placeholder="Enter The Text..." id=""></textarea>
            <button onClick={clearText}>Clear Button</button>
        </div>
    )
}