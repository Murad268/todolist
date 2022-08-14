import React, {createContext, useContext, useState, useEffect} from 'react';
import {toast} from 'react-toastify'
import Services from '../services/Services';
const TodoContext = createContext()

export const TodoContextProvider = ({children}) => {
   const [todos, setTodos] = useState([
  
   ]);
   const todoData = new Services();
  
   useEffect(() => {
      todoData.getData().then(res => setTodos(res))
   }, [])

   const deleteVery = () => toast("Задача удалена");
   const addTaskVery = () => toast("Задача добавлена");
   const trimVery = () => toast("Невозможно добвать пустую задачу");
   const deleteAllVery = () => toast("Все задачи удалены");
   const addNewElement = (data) => {
      todoData.addData(JSON.stringify(data)).then(() => {
         setTodos(prev => {
            return [...prev, data]
         })
         addTaskVery();
      });
   } 
   const deleteAll = () => {
      todoData.getData().then(res => res.forEach(item => {
         todoData.delData(item.id).then(() => {
            setTodos(prev => {
               return []
            })
         }) 
      }))   
      deleteAllVery();
   }
   const doneToDos = todos.filter(item => item.done).length;
   const setDone = (id) => {
      setTodos(prev => {
         return prev.map(item => {
            if(item.id === id) {
               return {...item, done: !item.done}
            }
            return item
         })
      })
   }
   const deleteTodo = (id) => {
      todoData.delData(id).then(() => {
         setTodos(prev => {
               return prev.filter(item => item.id !== id)
         })
         deleteVery();
      })  
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