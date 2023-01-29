import { useState } from 'react'
import Modal from '../modal/Modal'
import Quad from './Quad'
import AddTaskForm from './AddTaskForm'
import './Quadrant.css'

function QuadContainer({ projectName, editableProjectName, tasks, editTask, addTask, deleteTask, changeProjectName }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleNameChange = (e) => {
        const newName = e.target.value
        if (!newName || newName === projectName) return
        changeProjectName(newName)
    }

    return (
        <div className="project-container">
            <div className="project-title-container">
                <input className="project-title" type="text" defaultValue={projectName} onBlur={handleNameChange} disabled={!editableProjectName} />
                <button onClick={() => setIsModalOpen(true)}>Add Task</button>
                <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                    <AddTaskForm addTask={addTask} projectName={projectName !== 'Overall View' && projectName} onSubmit={() => setIsModalOpen(false)} />
                </Modal>
            </div>
            <div className="quad-container">
                <Quad
                    title="Do"
                    subtitle="Urgent & Important"
                    tasks={tasks.filter(task => task.urgent && task.important)}
                    urgent={true}
                    important={true}
                    edit={editTask}
                    add={addTask}
                    del={deleteTask} />
                <Quad
                    title="Plan"
                    subtitle="Not-Urgent & Important"
                    tasks={tasks.filter(task => !task.urgent && task.important)}
                    urgent={false}
                    important={true}
                    edit={editTask}
                    add={addTask}
                    del={deleteTask} />
                <Quad
                    title="Delegate"
                    subtitle="Urgent & Not-Important"
                    tasks={tasks.filter(task => task.urgent && !task.important)}
                    urgent={true}
                    important={false}
                    edit={editTask}
                    add={addTask}
                    del={deleteTask} />
                <Quad
                    title="Eliminate"
                    subtitle="Not-Urgent & Not-Important"
                    tasks={tasks.filter(task => !task.urgent && !task.important)}
                    urgent={false}
                    important={false}
                    edit={editTask}
                    add={addTask}
                    del={deleteTask} />
            </div>
        </div>
    )
}

export default QuadContainer