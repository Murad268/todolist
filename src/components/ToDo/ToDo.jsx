import React from 'react';
import "./toDo.css";
import { useTodo } from '../../contexts/todoContext';
import trash from '../../assets/icons/fi_trash-2.png';
const ToDo = ({todo}) => {
   const doneClassName = todo.done?"todo__circle todo__circle__active":"todo__circle"
   const {setDone, deleteTodo} = useTodo()
   return (
      <li className='todo'>
         <div onClick={() => setDone(todo.id)} className={doneClassName}>

         </div>
         <div className="todo__text">
            {todo.text}
         </div>
         <img onClick={() => deleteTodo(todo.id)} className='todo__trash' src={trash} alt="" />
      </li>
   );
};

export default ToDo;