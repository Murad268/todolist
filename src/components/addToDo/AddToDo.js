import React, {useState} from 'react';
import { v4 } from 'uuid';
import { useTodo } from '../../contexts/todoContext';
import './addToDo.css';

const AddToDo = () => {
   const {addNewElement} = useTodo();
   const [value, setValue] = useState({
      id: "",
      text: "",
      done: false
   })
   const onSubmit = (e) => {
      e.preventDefault();
      setValue(prev => ({...prev, id: v4()}))
      addNewElement(value)
      setValue(prev => ({...prev, text: ""}))
   }
   return (
      <div onSubmit={onSubmit} className='addToDo'>
         <form className="addToDoForm">
            <input value={value.text} onChange={e=>setValue(prev => ({...prev, text: e.target.value}))} type="text" placeholder='добавить задачу'/>
            <button  className="btn btn-primary">+</button>
         </form>
      </div>
   );
};

export default AddToDo;