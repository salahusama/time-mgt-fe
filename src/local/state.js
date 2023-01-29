const STATE_KEY = 'STATE_KEY'

const DEFAULT_TASKS = [{
    id: 1,
    text: 'This is an example urgent and important task',
    project: 'Example Project',
    urgent: true,
    important: true,
    completed: false,
}, {
    id: 2,
    text: 'This is an example not-urgent and not-important task',
    project: 'Example Project',
    urgent: false,
    important: false,
    completed: false,
}, {
    id: 3,
    text: 'This is an example urgent and not-important task',
    project: 'Example Project',
    urgent: true,
    important: false,
    completed: false,
}, {
    id: 4,
    text: 'This is an example not-urgent and important task',
    project: 'Example Project',
    urgent: false,
    important: true,
    completed: false,
}]

const defaultState = {
    tasks: DEFAULT_TASKS,
    lastTaskId: DEFAULT_TASKS.length,
}

export function getLocalState() {
    const value = localStorage.getItem(STATE_KEY)
    if (!value) {
        return defaultState
    }

    try {
        return JSON.parse(value)
    } catch {
        setLocalState(defaultState)
        return defaultState
    }
}

export function setLocalState(state) {
    localStorage.setItem(STATE_KEY, JSON.stringify(state))
}

export function updateLocalState({ tasks, lastTaskId }) {
    const oldState = getLocalState()
    setLocalState({
        ...oldState,
        tasks,
        lastTaskId,
    })
}
