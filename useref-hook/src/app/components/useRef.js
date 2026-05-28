'use client'

import { useRef } from "react";

export default function InputFocus() {

   
    const inputRef = useRef(null);

    
    function handleFocus() {
        inputRef.current.focus();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white shadow-xl rounded-2xl p-8 w-[400px]">

                <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    useRef Input Focus
                </h1>

                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Enter your text..."
                    className="w-full border border-red-900 text-red-400 rounded-lg px-4 py-3 text-lg outline-none focus:ring-4 focus:ring-blue-300 transition"
                />

                <button
                    onClick={handleFocus}
                    className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg transition duration-300"
                >
                    Focus Input
                </button>

            </div>

        </div>
    );
}