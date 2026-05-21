'use client'

import { useEffect, useState } from "react"

export default function TaskFive(){

    const [username, setUsername] = useState("")

    // Save to LocalStorage
    useEffect(() => {

        localStorage.setItem("username", username)

    }, [username])

    return(
        <div>

            <h1>LocalStorage Example</h1>

            <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <h2>{username}</h2>

        </div>
    )
}