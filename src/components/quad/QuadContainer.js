import { useState } from 'react'
import Modal from '../modal/Modal'
import Quad from './Quad'
import AddTaskForm from './AddTaskForm'
import './Quadrant.css'

function QuadContainer({ projectName, tasks, editTask, addTask, deleteTask }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="project-container">
            <div className="project-title-container">
                <h1 className="project-title">{projectName}</h1>
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