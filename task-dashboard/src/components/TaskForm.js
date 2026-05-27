export default function TaskForm({
    input,
    setInput,
    handleAddTask,
    inputRef,
    focusInput
}){
    return(
        <div className="flex gap-3 mt-6">
            <input 
            ref={inputRef}
            type="text"
            placeholder="Enter Task....."
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            className="border p-2 rounded w-full"/>

            <button className="bg-blue-500 text-white px-4 py-2 rounded" 
            onClick={handleAddTask}>
                Add
            </button>

            <button className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={focusInput}>
                Focus
            </button>
        </div>
    )

}
  