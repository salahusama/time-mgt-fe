import React, { useState, useEffect } from 'react';
import QuadContainer from './quad/QuadContainer';
import { getTasks, editTask, addTask, deleteTask, changeProjectName } from '../local/tasks'

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
    const del = (taskId) => deleteTask(taskId).then(setTasks)

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
                    editableProjectName
                    tasks={tasksPerProject[project]}
                    editTask={edit}
                    addTask={add}
                    deleteTask={del}
                    changeProjectName={(newName) => changeProjectName(project, newName).then(setTasks)}
                />
            ))}
        </div>
        </>
    );
}

export default App;
