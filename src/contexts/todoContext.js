import React, {createContext, useContext, useState, useEffect} from 'react';
import {toast} from 'react-toastify'
const TodoContext = createContext()

export const TodoContextProvider = ({children}) => {
   const [todos, setTodos] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);;
   const doneToDos = todos.filter(item => item.done).length;
  

  
   const setTodosWithSave = (newTodos) => {
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos))
  };
   const deleteVery = () => toast("Задача удалена");
   const addTaskVery = () => toast("Задача добавлена");
   const trimVery = () => toast("Невозможно добвать пустую задачу");
   const deleteAllVery = () => toast("Все задачи удалены");
   const doneVery = () => toast("Задача добавлена в выполненные");
   const removeFromDoneVery = () => toast("Задача удалена из выполненных");
   const addNewElement = (data) => {
      const newTodos = [data, ...todos];
      setTodosWithSave(newTodos);
      addTaskVery();
   } 
   const deleteAll = () => {
      setTodos(prev => {
         return []
      }) 
      localStorage.clear();
      deleteAllVery();
   }
   
   const setDone = (id) => {
      let updatedTodos = todos.map(todo => {
        
         if (todo.id === id) {
           todo.done === false?doneVery():removeFromDoneVery();
           todo.done = !todo.done;
         }
         return todo;
       });
         setTodosWithSave(updatedTodos);  
   }


   const deleteTodo = (id) => {
      
      const newTodos = todos.filter(item => item.id !== id);
      setTodosWithSave(newTodos);
      deleteVery();  
   }
   const values = {
      todos,
      addNewElement,
      deleteAll,
      doneToDos,
      setDone,
      deleteTodo,
      trimVery
   }
   return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>
}


export const useTodo = () => {
   const context = useContext(TodoContext)

   if(context===undefined) {
      throw new Error("useTodo hook must be call inside TodoProvider")
   }
   return context
}