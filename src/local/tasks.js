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
    console.log(`Editing task (${taskId})`)
    console.log(updatedTaskDetails)
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
