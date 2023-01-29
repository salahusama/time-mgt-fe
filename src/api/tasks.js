const API_BASE = 'http://localhost:5000'

function createQueryParams(obj) {
    let queryParams = ''
    Object.keys(obj).forEach(key => {
        const value = obj[key]
        if (value !== null && value !== undefined) {
            queryParams += `${key}=${value}&`
        }
    })
    return queryParams
}

export async function getTasks() {
    const resp = await fetch(`${API_BASE}/tasks`)
    return await resp.json()
}

export async function addTask(taskDetails) {
    const resp = await fetch(`${API_BASE}/tasks/add?${createQueryParams(taskDetails)}`)
    return await resp.json()
}

export async function editTask(taskId, taskDetails) {
    const resp = await fetch(`${API_BASE}/tasks/edit/${taskId}?${createQueryParams(taskDetails)}`)
    return await resp.json()
}

export async function deleteTask(taskId) {
    const resp = await fetch(`${API_BASE}/tasks/delete/${taskId}`)
    return await resp.json()
}
