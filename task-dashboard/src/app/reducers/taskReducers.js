export const initialState=[]

export function taskReducer(state,action){
    switch(action.type){
        case "ADD_TASK":
            return [...state,action.payload]
        
        case "DELETE_TASK":
            return state.filter(task=>task.id!==action.payload)

        case "TOGGLE_TASK":
            return state.map(task=>
                task.id===action.payload ?
                {...task, completed: !task.completed}
                :task
            )
        case "CLEAR-COMPLETED":
            return state.filter(task=>!task.completed)
        
        default:
            return state
    }
}