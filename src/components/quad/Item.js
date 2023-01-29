function Item({ task, edit, del }) {
    const editTask = (e) => {
        const field = e.target.getAttribute('name')
        let newVal = e.target.getAttribute('data-newValue') || e.target.value
        if (newVal === 'false') newVal = false
        if (newVal === 'true') newVal = true
        if (newVal === task[field]) return
        edit(task.id, { [field]: newVal })
    }

    return (
        <div className="item" draggable onDragStart={e => e.dataTransfer.setData("taskId", task.id)}>
            <div>
                <input type="button" name="completed" data-newvalue={!task.completed} value={task.completed ? '↩' : '✅'} onClick={editTask} />
                <input type="text" name="text" defaultValue={task.text} onBlur={editTask} className={task.completed ? 'completed-item' : ''} />
            </div>
            <div>
                <input type="button" value="❌" onClick={() => del(task.id)} />
            </div>
        </div>
    )
}

export default Item
