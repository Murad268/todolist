import React, {createContext, useContext, useState} from 'react';

const TodoContext = createContext()

export const TodoContextProvider = ({children}) => {
   const [todos, setTodos] = useState([
      {
         id: 1,
         text: "ES 6 standartlarını öyrənmək",
         done: false
      },
      {
         id: 2,
         text: ".filter().find() funksiyalarının fərqinə baxmaq",
         done: false
      },
      {
         id: 3,
         text: "İngilis dilində 1000 söz əzbərləmək",
         done: false
      },
      {
         id: 4,
         text: "Yeni freymworklarla tanış olmaq",
         done: false
      },
      {
         id: 5,
         text: "Evə çörək almaq",
         done: false
      }
   ]);

   const addNewElement = (data) => {
      setTodos(prev => {
         return [...prev, data]
      })
   } 
   const deleteAll = () => {
      setTodos(prev => {
         return []
      })
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
      setTodos(prev => {
    
            return prev.filter(item => item.id !== id)
         
      })
   }
   const values = {
      todos,
      addNewElement,
      deleteAll,
      doneToDos,
      setDone,
      deleteTodo
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