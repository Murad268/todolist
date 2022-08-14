import React, {useState} from 'react';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { v4 } from 'uuid';
import { useTodo } from '../../contexts/todoContext';
import './addToDo.css';

const AddToDo = () => {
   const {addNewElement, trimVery} = useTodo();
   const [value, setValue] = useState({
      id: "",
      text: "",
      done: false
   })
   const onSubmit = (e) => {
      e.preventDefault();
      if(value.text !== "") {
         setValue(prev => ({...prev, id: v4()}))
         addNewElement(value)
         setValue(prev => ({...prev, text: ""}))
      } else{
         trimVery()
      }
   }
   return (
      <div onSubmit={onSubmit} className='addToDo'>
         <form className="addToDoForm">
            <input value={value.text} onChange={e=>setValue(prev => ({...prev, text: e.target.value}))} type="text" placeholder='добавить задачу'/>
            <button  className="btn btn-primary">+</button>
         </form>
         <ToastContainer
            position='top-right'
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
      </div>
   );
};

export default AddToDo;