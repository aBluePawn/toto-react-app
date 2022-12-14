import React from 'react';
import ReactDOM from 'react-dom/client';
import { v4 as uuid } from 'uuid';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export interface Task {
  id: string,
  name: string,
  completed: boolean,
}

const DATA: Task[] = [
  {id: uuid() , name: "Eat", completed: true},
  {id: uuid() , name: "Sleep", completed: false},
  {id: uuid() , name: "Repeat", completed: false}
]
root.render(
  <React.StrictMode>
    <App tasks={DATA}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
