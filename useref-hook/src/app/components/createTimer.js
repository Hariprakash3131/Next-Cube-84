'use client'

import { useRef, useState } from "react";

export default function Timer(){

    const [count,setCount] = useState(0)

    const timerRef = useRef(null)

    function startTimer(){

        if(timerRef.current !== null) return

        timerRef.current = setInterval(() => {

            setCount((prev) => prev + 1)

        },1000)
    }

    function stopTimer(){

        clearInterval(timerRef.current)

        timerRef.current = null
    }

    return(

        <div className="flex justify-center items-center h-screen bg-gray-100">

            <div className="bg-white p-10 rounded-3xl shadow-xl text-center w-[350px]">

                <h1 className="text-4xl font-bold text-blue-700 mb-6">
                    Timer App
                </h1>

                <div className="text-6xl font-extrabold text-gray-800 mb-8">
                    {count}
                </div>

                <div className="flex justify-center gap-4">

                    <button
                        onClick={startTimer}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl text-xl font-semibold"
                    >
                        Start
                    </button>

                    <button
                        onClick={stopTimer}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl text-xl font-semibold"
                    >
                        Stop
                    </button>

                </div>

            </div>

        </div>
    )
}