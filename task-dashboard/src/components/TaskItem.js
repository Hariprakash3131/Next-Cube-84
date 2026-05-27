export default function TaskItem({
    task,
    handleDelete,
    handleToggle
}){
    return(
        <div className="flex items-center justify-between border p-3 rounded">
            <div className="flex items-center gap-3">
                <input
                type="checkbox"
                checked={task.completed}
                onChange={()=>handleToggle(task.id)}
                />
                <div>
                         <p className={task.completed?"line-through text-gray-500":""}>
                  {task.title}
            </p>

            <p className="text-sm text-gray-400">
                {new Date(task.createAt).toLocaleString()}
            </p>
                </div>
            </div>
               
               <button onClick={()=>handleDelete(task.id)} className="bg-red-500 text-white px-3 py-1 rounded">

                Delete
               </button>
           
       
            </div>
      

    )
}