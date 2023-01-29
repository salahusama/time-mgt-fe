import Item from './Item'

function Quad({ title, subtitle, urgent, important, tasks, edit, del }) {

    // Edit the task to be placed in this quad
    const handleDrop = (e) => {
        e.preventDefault()
        const taskId = e.dataTransfer.getData("taskId")
        edit(taskId, { urgent, important })
    }

    return (
        <div className="quad" onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
            <div className="quad-title-container">
                <h2 className="quad-title">{title}</h2>
                <i className="quad-subtitle">{subtitle}</i>
            </div>
            <div className="item-container">
                {tasks.map(task => <Item key={task.id} task={task} edit={edit} del={del} />)}
            </div>
        </div>
    )
}

export default Quad
