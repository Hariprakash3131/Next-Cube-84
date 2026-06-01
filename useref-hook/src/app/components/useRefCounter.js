'use client'

import { useRef, useState } from "react";

export default function Counter(){

    const countRef = useRef(0)

    const [count,setCount] = useState(0)

    function increaseCount(){

        countRef.current++

        setCount(countRef.current)
    }

    return(
        <div className="flex justify-center   items-center h-screen bg-gray-100">

            <div className="bg-white p-10 rounded-3xl shadow-xl text-center w-[350px]">

                <h1 className="text-4xl font-bold mb-6 text-blue-700">
                    useRef Counter
                </h1>

                <div className="text-6xl font-extrabold text-gray-800 mb-8">
                    {count}
                </div>

                <button
                    onClick={increaseCount}
                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-8 py-4 rounded-2xl text-2xl font-semibold shadow-md"
                >
                    Add +
                </button>

            </div>

        </div>
    )
}