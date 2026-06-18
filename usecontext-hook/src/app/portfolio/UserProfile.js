'use client'

import { useContext } from "react"

import UserContext from  "../context/UserContext"

export default function UserProfile(){
    const user=useContext(UserContext)
    return(
      <div>
        <h1>User Name:{user}</h1>
      </div>
    )
}