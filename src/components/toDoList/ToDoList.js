import React from 'react';
import "./toDoList.css";
import ToDo from '../ToDo/ToDo';
import { useTodo } from '../../contexts/todoContext';
const ToDoList = () => {
   const {todos} = useTodo();
   return (
      <div className='toDoList'>
         <ul>
            {
               !!todos.length ? todos.map(todo => {
                  return <ToDo key={todo.id} todo={todo}/>
               }): <div className='empty'>В настоящее время нет задач в списке</div>
            }
         </ul>
      </div>
   );
};

export default ToDoList;