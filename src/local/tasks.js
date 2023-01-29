import { getLocalState, updateLocalState } from "./state"

export async function getTasks() {
    const { tasks } = getLocalState()
    return [...tasks]
}

export async function addTask(taskDetails) {
    const { tasks, lastTaskId } = getLocalState()
    const newTaskId = lastTaskId + 1
    tasks.push({ id: newTaskId, ...taskDetails })
    updateLocalState({ tasks, lastTaskId: newTaskId })
    return [...tasks]
}

export async function deleteTask(taskId) {
    const { tasks } = getLocalState()
    const taskIndex = tasks.findIndex(task => task.id === taskId)
    tasks.splice(taskIndex, 1)
    updateLocalState({ tasks })
    return [...tasks]
}

export async function editTask(taskId, updatedTaskDetails) {
    const { tasks } = getLocalState()
    const taskIndex = tasks.findIndex(task => task.id === taskId)
    if (taskIndex === -1) {
        return [...tasks]
    }
    const task = tasks[taskIndex]
    tasks[taskIndex] = {
        ...task,
        ...updatedTaskDetails
    }
    updateLocalState({ tasks })
    return [...tasks]
}

export async function changeProjectName(oldName, newName) {
    console.log(`Changing project name from ${oldName} to ${newName}...`)
    const { tasks } = getLocalState()
    const updatedTasks = tasks.map(task => {
        if (task.project === oldName) {
            task.project = newName
        }
        return task
    })
    updateLocalState({ tasks: updatedTasks })
    return [...updatedTasks]
}
