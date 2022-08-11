import React from 'react';
import './footer.css'
import { useTodo } from '../../contexts/todoContext';
const Footer = () => {
   const {todos, deleteAll, doneToDos} = useTodo();
   return (
      <div className='footer'>
         <div className="footer__all">Всего: {todos.length} заданий</div>
         <div className="footer__done">Выполнено: {doneToDos} задание</div>
         <div onClick={() => deleteAll()} className="delete__all">Удалить все</div>
      </div>
   );
};

export default Footer;