import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Task } from '.';
import { FilterButton } from './components/FilterButton';
import { Form } from './components/Form';
import Todo from './components/Todo';

function App(props: {tasks: Task[]}) {
  // Initialize the state when we initialize the App
  const [tasks, setTasks] = useState(props.tasks);

  function toggleTasksCompleted(id: string) {
    const updatedTasks = tasks.map((task) => {
      if(id === task.id){
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id: string){
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks.map((task) => 
  <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTasksCompleted={toggleTasksCompleted}
    deleteTask={deleteTask}
  />
  );

  /**
   * Callback prop
   * Pass the information from the child component to the parent component
   * @param name 
   */
  function addTask(name: string){
    const newTask: Task = {
      id: uuid(),
      name,
      completed: false,
    }
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        <FilterButton name='All'/>
        <FilterButton name='Active'/>
        <FilterButton name='Completed'/>
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
