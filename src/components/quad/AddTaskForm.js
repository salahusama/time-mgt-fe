import { useState } from 'react'

function AddTaskForm({ projectName, addTask, onSubmit }) {
    const [errMsg, setErrMsg] = useState('')

    const projectId = !projectName ? '' : projectName.replaceAll(' ', '')
    const getEleId = name => `${projectId}_${name}`

    const add = () => {
        const text = document.getElementById(getEleId('new-task-text')).value
        const project = projectName || document.getElementById(getEleId('new-task-project')).value
        const urgent = document.getElementById(getEleId('new-task-urgent')).checked
        const important = document.getElementById(getEleId('new-task-important')).checked

        if (!project || !text) {
            setErrMsg('The project and task must be set to add a new task.')
            return
        }

        // Reset all
        document.getElementById(getEleId('new-task-text')).value = ''
        //document.getElementById(getEleId('new-task-project')).value = ''
        document.getElementById(getEleId('new-task-urgent')).checked = false
        document.getElementById(getEleId('new-task-important')).checked = true
        setErrMsg('')

        addTask({ text, project, urgent, important })
        onSubmit()
    }

    return (
        <>
        <h2>Task Details</h2>
        <table>
            <tbody>
                <tr>
                    <td>Project</td>
                    <td><input id={getEleId('new-task-project')} type="text" defaultValue={projectName || ''} /></td>
                </tr>
                <tr>
                    <td>Task</td>
                    <td><input id={getEleId('new-task-text')} type="text" /></td>
                </tr>
                <tr><td></td><td><input id={getEleId('new-task-urgent')} type="checkbox" /> Urgent</td></tr>
                <tr><td></td><td><input id={getEleId('new-task-important')} type="checkbox" defaultChecked /> Important</td></tr>
            </tbody>
        </table>
        <p style={{ color: 'red' }}>{errMsg}</p>
        <input type="button" value="Add" onClick={add} />
        </>
    )
}

export default AddTaskForm
