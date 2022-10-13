import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Task } from '.';
import { FilterButton } from './components/FilterButton';
import { Form } from './components/Form';
import { usePrevious } from './components/React/CustomHooks/usePrevious';
import Todo from './components/Todo';

const FILTER_MAP = {
  All: () => true,
  Active: (task: Task) => !task.completed,
  Completed: (task: Task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props: {tasks: Task[]}) {
  // Initialize the state when we initialize the App
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  function toggleTaskCompleted(id: string) {
    const updatedTasks = tasks.map((task) => {
      if(id === task.id){
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function editTask(id: string, newName: string){
    const updatedTasks = tasks.map((task) => {
      if(id === task.id){
        return {...task, name: newName}
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  function deleteTask(id: string){
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter as keyof typeof FILTER_MAP])
  .map((task) => 
  <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
  />
  );

  const filterList = FILTER_NAMES.map((name) => 
    (
      <FilterButton
          key={name}
          name={name}
          isPressed={name === filter}
          setFilter={setFilter}
      />
    )
  )

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

  const listHeadingRef = useRef<HTMLHeadingElement>(null);

  const prevTasksLength = usePrevious(tasks.length);

  useEffect(() => {
    if(listHeadingRef.current && prevTasksLength && tasks.length - prevTasksLength === -1){
      listHeadingRef.current.focus();
    }
  }, [prevTasksLength, tasks.length])

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex={-1} ref={listHeadingRef}>
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
