export default function StatsPanel({tasks}){
    const totalTasks=tasks.length 
    const completedTasks=tasks.filter(task=>task.completed).length
    const pendingTasks=totalTasks-completedTasks
    return(
        <div className="border rounded p-4 mt-6"> 
        <h2 className="text-2xl font-bold mb-4">
               Statistics
        </h2>
        <div className="space-y-2">
           <p>
            Total Tasks:
            <span className="font-bold ml-2">
                {totalTasks}
            </span>
           </p>

           <p>
            Completed Tasks:
            <span className="font-bold ml-2">
                {completedTasks}
            </span>
           </p>

           <p>
            Pending Tasks:
            <span className="font-bold ml-2">
                {pendingTasks}
            </span>
           </p>

        </div>
        </div>
    )

}