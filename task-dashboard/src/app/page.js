'use client'

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react"

import Header from "@/components/Header"
import TaskForm from "@/components/TaskForm"
import SearchBar from "@/components/SearchBar"
import TaskList from "@/components/TaskList"
import StatsPanel from "@/components/StatsPanel"

import { initialState, taskReducer } from "./reducers/taskReducers"

export default function Home() {

  // useReducer
  const [tasks, dispatch] = useReducer(taskReducer, initialState)

  // useState
  const [input, setInput] = useState("")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("all")

  // useRef
  const inputRef = useRef(null)

  // Load tasks + loading
  useEffect(() => {

    const savedTasks = localStorage.getItem("tasks")

    setTimeout(() => {

      if (savedTasks) {

        const parsedTasks = JSON.parse(savedTasks)

        parsedTasks.forEach(task => {
          dispatch({
            type: "ADD_TASK",
            payload: task
          })
        })

      } else {

        const sampleTasks = [
          {
            id: 1,
            title: "Learn React Hooks",
            completed: false,
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            title: "Build Task Dashboard",
            completed: true,
            createdAt: new Date().toISOString()
          }
        ]

        sampleTasks.forEach(task => {
          dispatch({
            type: "ADD_TASK",
            payload: task
          })
        })
      }

      setLoading(false)

    }, 2000)

  }, [])

  // Save tasks to localStorage
  useEffect(() => {

    localStorage.setItem("tasks", JSON.stringify(tasks))

  }, [tasks])

  // Focus input
  const focusInput = () => {
    inputRef.current.focus()
  }

  // Add task
  const handleAddTask = () => {

    if (!input.trim()) {
      setError("Task cannot be empty")
      return
    }

    const newTask = {
      id: Date.now(),
      title: input,
      completed: false,
      createdAt: new Date().toISOString()
    }

    dispatch({
      type: "ADD_TASK",
      payload: newTask
    })

    setInput("")
    setError("")

    inputRef.current.focus()
  }

  // Delete task
  const handleDelete = useCallback((id) => {

    dispatch({
      type: "DELETE_TASK",
      payload: id
    })

  }, [])

  // Toggle task
  const handleToggle = useCallback((id) => {

    dispatch({
      type: "TOGGLE_TASK",
      payload: id
    })

  }, [])

  // Clear completed
  const clearCompleted = () => {

    dispatch({
      type: "CLEAR_COMPLETED"
    })

  }

  // useMemo
  const filteredTasks = useMemo(() => {

    return tasks.filter(task => {

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "completed"
          ? task.completed
          : !task.completed

      return matchesSearch && matchesFilter

    })

  }, [tasks, search, filter])

  if (loading) {
    return (
      <div className="p-10 text-2xl font-bold">
        Loading...
      </div>
    )
  }

  return (
    <main className="max-w-3xl mx-auto p-6">

      <Header />

      <TaskForm
        input={input}
        setInput={setInput}
        handleAddTask={handleAddTask}
        inputRef={inputRef}
        focusInput={focusInput}
      />

      {
        error && (
          <p className="text-red-500 mt-2">
            {error}
          </p>
        )
      }

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {/* Filter Buttons */}

      <div className="flex gap-3 mt-4">

        <button
          onClick={() => setFilter("all")}
          className="border px-3 py-1 rounded"
        >
          All
        </button>

        <button
          onClick={() => setFilter("completed")}
          className="border px-3 py-1 rounded"
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("pending")}
          className="border px-3 py-1 rounded"
        >
          Pending
        </button>

      </div>

      <TaskList
        tasks={filteredTasks}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
      />

      <button
        onClick={clearCompleted}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Clear Completed
      </button>

      <StatsPanel tasks={tasks} />

    </main>
  )
}
