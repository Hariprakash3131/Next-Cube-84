'use client'
import {useState,useRef,useCallback,useEffect,useMemo,useReducer} from "react"
import { initialState,taskReducer } from "./reducers/taskReducers";
export default function Home() {

   const [task,dispatch]=useReducer(taskReducer,initialState)

   const [input,setInput]=useState("")
   const [search,setSearch]=useState("")
   const [loading,setLoading]=useState(true)
   const [error,setError]=useState('')
   const [filter,setFilter]=useState('all')

   const inputRef=useRef(null)

   useEffect(()=>{
      const savedTasks=localStorage.getItem('tasks')
    setTimeout(()=>{
      if(savedTasks){
        const parsedTasks=JSON.parse(savedTasks)
        parsedTasks.foreach(task=>{
          dispatch({
            type:"ADD_TASK",
            payload:task
          })
        })
      }
      else{
        const sampleTasks=[
          {
            id:1,
            title:"Learn React Hooks",
            completed:false,
            createdAt:new Date().toISOString()
          },
          {
            id:2,
            title:"Learn Next.js ",
            completed:true,
            createdAt:new Date().toISOString()
          }
        ]

        sampleTasks.forEach(task=>{
          dispatch({
            type:'ADD_TASK',
            payload:task
          })
        })

      }
      setLoading(false)
    },200)
},[])
   return(

   )
}
