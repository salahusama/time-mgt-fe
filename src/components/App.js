import React, { useState, useEffect } from 'react';
import QuadContainer from './quad/QuadContainer';
import { getTasks, editTask, addTask, deleteTask } from '../local/tasks'

import './App.css'

function getTasksPerProject(tasks) {
    const tasksPerProject = {}
    tasks.forEach(task => {
        const project = task.project
        if (!tasksPerProject[project]) {
            tasksPerProject[project] = [task]
        } else {
            tasksPerProject[project].push(task)
        }
    })
    return tasksPerProject
}

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks().then(setTasks)
    }, []);

    const add = (taskDetails) => addTask(taskDetails).then(setTasks)
    const edit = (taskId, taskDetails) => editTask(taskId, taskDetails).then(setTasks)
    const del = (taskId) => deleteTask(taskId).then(tasks => {
        console.log('"del" was called. New tasks:')
        console.log(tasks)
        setTasks(tasks)
    })

    const tasksPerProject = getTasksPerProject(tasks)

    return (
        <>
        <div className="main-container overview-container">
            <QuadContainer
                projectName="Overall View"
                tasks={tasks}
                editTask={edit}
                addTask={add}
                deleteTask={del}
            />
        </div>
        <hr />
        <div className="main-container">
            {Object.keys(tasksPerProject).map(project => (
                <QuadContainer
                    key={project}
                    projectName={project}
                    tasks={tasksPerProject[project]}
                    editTask={edit}
                    addTask={add}
                    deleteTask={del}
                />
            ))}
        </div>
        </>
    );
}

export default App;
