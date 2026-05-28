'use client'
import { useRef } from "react"
export default function Focus(){
     const inputFocusRef=useRef(null)
     function handleFocus(){
        inputFocusRef.current.focus()
     }
      return(
              <div>
                <h1>Task:1</h1>
                <input type="text" ref={inputFocusRef} placeholder="Enter the Text..." name="" id=""/>
                <button className="bg-red-800" onClick={handleFocus}>Focus</button>
              </div>
      )
}