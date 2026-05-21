'use client'

import { useEffect, useState } from "react"

export default function TaskFour() {

    const [count, setCount] = useState(0)

    useEffect(() => {

        let timer = setInterval(() => {
            setCount((prev) => prev + 1)
        }, 1000)

        // cleanup function
        return () => clearInterval(timer)

    }, [])

    return (
        <div>
            <h1>Timer: {count}</h1>
        </div>
    )
}