import TaskItem from "./TaskItem"

export default function TaskList({
    tasks,
    handleDelete,
    handleToggle
}){
   
    if(tasks.length===0){
        return(
            <p className="mt-6 text-gray-500">
                No Tasks Found
            </p>
        )
    }
    return(
        <div className="mt-6 space-y-3">
            {
                tasks.map(task=>{
                    <TaskItem
                    key={task.id}
                    task={task}
                    handleDelete={handleDelete}
                    handleToggle={handleToggle}
                    />
                })
            }
        </div>
    )
}