import React, {createContext, useContext, useState, useEffect} from 'react';
import {toast} from 'react-toastify'
const TodoContext = createContext()

export const TodoContextProvider = ({children}) => {
   const [todos, setTodos] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);;
   const doneToDos = todos.filter(item => item.done).length;
  

   // useEffect(() => {
   //    Object.keys(localStorage).forEach(item => {
   //       setTodos(prev => {
   //          return [...prev, JSON.parse(localStorage.getItem(item))]
   //       })
   //    })
   // }, [])
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
      setTodos(prev => {
         const newTodos = [data, ...prev];
         setTodosWithSave(newTodos);
         return [...prev, data]
      })
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
      setTodos(prev => {
         return prev.map(item => {
            if(item.id === id) {
               item.done === false?doneVery():removeFromDoneVery();
               
               return {...item, done: !item.done}
            }
            return item
         })
      })
      
   }


   const deleteTodo = (id) => {
      
      setTodos(prev => {
         const newTodos = prev.filter(item => item.id !== id);
         setTodosWithSave(newTodos);
         return prev.filter(item => item.id !== id)
      })
      localStorage.removeItem(id);
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