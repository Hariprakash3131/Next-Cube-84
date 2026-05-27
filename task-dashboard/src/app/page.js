'use client'
import {useState,useRef,useCallback,useEffect,useMemo,useReducer} from "react"
import { initialState,taskReducer } from "./reducers/taskReducers";
import Header from "@/components/Header";
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

useEffect(()=>{
  localStorage.setItem('tasks',JSON.stringify(tasks))
},[tasks])

const focusInput=()=>{
  inputRef.current.focus()
}

const handleAddTask=()=>{
  if(!input.trim()){
    setError("Task Cannot be empty")
    return
  }
  const newTask={
    id:Date.now(),
    title:input,
    completed:false,
    createdAt:new Date().toISOString()
  }
  dispatch({
    type:"ADD_TASK",
    payload:newTask
  })

  setInput("")
  setError("")
  inputRef.current.focus()
}

const handleDelete=useCallback((id)=>{
  dispatch({
    type:"DELETE_TASK",
    payload:id
  })
},[])

const handleToggle=useCallback((id)=>{
  dispatch({
    type:'TOGGLE_TASK',
    payload:id
  })
},[])

const clearCompleted=useMemo(()=>{
  return tasks.filter(task=>{
    const matchSearch=task.title
    .toLowerCase()
    .includes(search.toLowerCase())

    const matchesFilter=
    filter==='all'
    ?true
    : filter==='completed'
    ?task.completed
    :!task.completed

    return matchesSearch && matchFilter
  })
},[tasks, search, filter])

if(loading){
  return(
    <div className="p-10 text-2xl font-bold">
      Loading...
    </div>
  )
}
   return(
    <main className="max-w-3xl mx-auto p-6">
      
    </main>
   )
}
