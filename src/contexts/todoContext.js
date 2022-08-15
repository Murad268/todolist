import React, {createContext, useContext, useState, useEffect} from 'react';
import {toast} from 'react-toastify'
const TodoContext = createContext()

export const TodoContextProvider = ({children}) => {
   const [todos, setTodos] = useState([]);
   const doneToDos = todos.filter(item => item.done).length;
  

   useEffect(() => {
      Object.keys(localStorage).forEach(item => {
         setTodos(prev => {
            return [...prev, JSON.parse(localStorage.getItem(item))]
         })
      })
   }, [])
   
   const deleteVery = () => toast("Задача удалена");
   const addTaskVery = () => toast("Задача добавлена");
   const trimVery = () => toast("Невозможно добвать пустую задачу");
   const deleteAllVery = () => toast("Все задачи удалены");
   const doneVery = () => toast("Задача добавлена в выполненные");
   const removeFromDoneVery = () => toast("Задача удалена из выполненных");
   const addNewElement = (data) => {
      setTodos(prev => {
         return [...prev, data]
      })
      localStorage.setItem(data.id, JSON.stringify(data));
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